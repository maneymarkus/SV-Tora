<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Models\Club;
use App\Models\Fighter;
use App\Models\Person;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

class TeamController extends Controller
{

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Team::class, 'team');
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $teams = [];
        if (Gate::allows("admin")) {
            $teams = Team::all();
        } else {
            $teams = Team::all()->reject(function ($team) use ($user) {
                return $team->club->id !== $user->club->id;
            });
        }

        $rows = [];
        $counter = 1;

        foreach ($teams as $team) {
            $row = [
                "data" => $team->tableProperties($counter++),
                "editUrl" => url("/entities/teams/" . $team->id),
                "deleteUrl" => url("/entities/teams/" . $team->id),
            ];
            array_push($rows, $row);
        }

        return view("Entities.entity-overview", ["entities" => "Teams", "entity" => "Team", "columns" => Team::tableHeadings(), "rows" => $rows, "addEntityUrl" => url("/entities/teams")]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newTeamName = $request->input("Name");
        $club = Club::getClub($request->input("Verein", null));
        if (Team::where("name", "=", $newTeamName)->where("club_id", "=", $club->id)->first() !== null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Das Team \"" . $newTeamName . "\" existiert schon in Verein \"" . $club->name . "\".");
        }
        $newTeam = Team::create([
            "name" => $newTeamName,
            "club_id" => $club->id,
        ]);

        return json_encode(["redirectUrl" => url("/entities/teams/" . $newTeam->id . "/fighters/add")]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Team  $team
     * @return \Illuminate\Http\Response
     */
    public function show(Team $team)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Team  $team
     * @return \Illuminate\Http\Response
     */
    public function edit(Team $team)
    {
        $editableProperties = [
            "Name" => $team->name,
        ];
        if (Auth::user()->isAdmin()) {
            $editableProperties = array_merge($editableProperties, ["Verein" => GeneralHelper::addOtherChoosableOptions("clubs", $team->club->name)]);
        }
        return json_encode($editableProperties);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Team  $team
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Team $team)
    {
        $club = Club::getClub($request->input("Verein", null));
        if ($team === null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Leider konnte kein Team mit dem Namen \"" . $request->input("Name") . "\" in diesem Verein zum Bearbeiten gefunden werden.");
        }
        if ($team->club->name !== $club->name && !Auth::user()->isAdmin()) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Nur Admins können Teams einem anderen Verein zuordnen!");
        }
        $team->name = $request->input("Name");
        $team->club_id = $club->id;
        $team->save();

        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Das Team \"" . $request->input("Name") . "\" wurde erfolgreich bearbeitet.");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Team  $team
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Team $team)
    {
        if ($team === null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Dieses Team konnte leider nicht gefunden werden.");
        }
        $teamName = $team->name;
        $team->delete();
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Das Team \"" . $teamName . "\" wurde erfolgreich gelöscht.");
    }

    public function showFighters(Team $team) {
        $user = Auth::user();
        if (!Gate::allows("admin") && $team->club->id !== $user->club->id) {
            return abort(403);
        }
        $fighters = $team->fighters;

        $rows = [];
        $counter = 1;

        foreach ($fighters as $fighter) {
            $row = [
                "data" => $fighter->tableProperties($counter++),
                "editUrl" => url("/entities/fighters/" . $fighter->id),
                "deleteUrl" => url("/entities/teams/" . $team->id . "/fighters/" . $fighter->id),
            ];
            array_push($rows, $row);
        }

        return view("Entities.team-members", ["teamName" => $team->name, "columns" => Fighter::tableHeadings(), "rows" => $rows, "addEntityUrl" => url("/entities/teams/" . $team->id . "/fighters/add")]);
    }

    /**
     * Show the selectable fighter table so that user can select which fighters he want to add to team
     *
     * @param Team $newTeam
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function selectFighters(Team $team) {

        if (sizeof($team->fighters) >= config("global.MAX_TEAM_MEMBERS")) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Das Team besteht schon aus der maximalen Anzahl an Teammitgliedern. Bitte entferne erst Teammitglieder, um neue hinzuzufügen.");
        }

        $club = Club::where("id", "=", $team->club->id)->first();
        $fighters = app(FighterController::class)->getFightersFromClub($club);
        $selectLimit = config("global.MAX_TEAM_MEMBERS") - sizeof($team->fighters);
        $rows = [];
        $counter = 1;

        foreach ($fighters as $fighter) {
            $row = [
                "data" => $fighter->tableProperties($counter++),
            ];
            array_push($rows, $row);
        }
        return view("Entities.select-entities", ["entities" => "Kämpfer", "addTo" => $team->name, "columns" => Fighter::tableHeadings(), "rows" => $rows, "addUrl" => url("/entities/teams/" . $team->id . "/fighters"), "backUrl" => url("/entities/teams/" . $team->id . "/fighters"), "selectLimit" => $selectLimit]);
    }

    public function addFighters(Request $request, Team $team) {
        $fighters = Fighter::join("people", "fighters.person_id", "=", "people.id")->join("clubs", "people.club_id", "=", "clubs.id")->select("fighters.*", "people.*","clubs.name as club_name")->get();
        foreach ($request["fighters"] as $fighterData) {
            $fighter = $fighters->where("first_name", "=", $fighterData["Vorname"])->where("last_name", "=", $fighterData["Nachname"])->where("sex", "=", $fighterData["Geschlecht"])->where("club_name", "=", $fighterData["Verein"])->where("graduation", "=", $fighterData["Graduierung"])->first();
            $fighter->team_id = $team->id;
            $team->fighters()->attach($fighter);
        }
        return json_encode(["redirectUrl" => url("/entities/teams/" . $team->id)]);
    }

    public function removeFighter(Team $team, Fighter $fighter) {
        $team->fighters()->detach($fighter);
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der Kämpfer \"" . $fighter->first_name . " " . $fighter->last_name . "\" wurde erfolgreich aus dem Team \"" . $team->name . "\" entfernt.");
    }

}
