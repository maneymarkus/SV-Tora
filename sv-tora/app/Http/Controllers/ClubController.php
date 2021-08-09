<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Models\Club;
use App\Models\Fighter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Response;

class ClubController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        if (!Gate::allows("admin")) {
            return abort(403);
        }

        $clubs = Club::all();

        $rows = [];
        $counter = 1;

        foreach ($clubs as $club) {
            $row = [
                "data" => $club->tableProperties($counter++),
                "editUrl" => url("/entities/clubs/" . $club->id),
                "deleteUrl" => url("/entities/clubs/" . $club->id),
            ];
            array_push($rows, $row);
        }

        return view("Entities.entity-overview", ["entities" => "Vereine", "entity" => "Verein", "columns" => Club::tableHeadings(), "rows" => $rows, "addEntityUrl" => url("/entities/clubs")]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return json_encode(Club::editableProperties());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newClubName = $request->input("Name");
        if (Club::where("name", "=", $newClubName)->first() !== null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Der Verein \"" . $newClubName . "\" existiert schon.");
        }
        Club::create([
            "name" => $request->input("Name"),
        ]);
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der neue Verein \"" . $newClubName . "\" wurde erfolgreich erstellt. Die Seite lädt in 5 Sekunden neu, um den neuen Verein in dieser Übersicht anzuzeigen.");
    }

    /**
     * Display the specified resource.
     *
     * @param Club $club
     * @return \Illuminate\Http\Response
     */
    public function show(Club $club)
    {
        //
    }

    /**
     * Return the editable data of the specified resource.
     *
     * @param  \App\Models\Club $club
     * @return \Illuminate\Http\Response
     */
    public function edit(Club $club)
    {
        return json_encode(Club::editableProperties($club));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Club $club)
    {
        if ($club === null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Leider ist etwas schief gelaufen. Bitte versuch es später erneut.");
        }
        $newClubName = $request->input("Name");
        $club->name = $newClubName;
        $club->save();
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der Verein \"" . $newClubName . "\" wurde erfolgreich bearbeitet.");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Club $club)
    {
        if ($club === null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Dieser Verein existiert nicht in der Datenbank.");
        }
        $clubName = $club->name;
        $club->delete();
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der Verein \"" . $clubName . "\" wurde erfolgreich gelöscht.");
    }

    /**
     * Show the fighters of the given club
     * @param Club $club
     */
    public function showFighters(Club $club) {
        $view = app(FighterController::class)->index();
        if (Gate::allows("admin")) {
            $filters = [
                "Verein" => $club->name,
            ];
            setcookie("tableFilters", json_encode($filters), time() + 300);
        }
        return $view;
    }

    /**
     * Show all the teams registered for this club
     * @param Club $club
     */
    public function showTeams(Club $club) {
        $view = app(TeamController::class)->index();
        if (Gate::allows("admin")) {
            $filters = [
                "Verein" => $club->name,
            ];
            setcookie("tableFilters", json_encode($filters), time() + 60);
        }
        return $view;
    }

}
