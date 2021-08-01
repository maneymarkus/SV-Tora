<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Helper\PersonTypes;
use App\Models\Club;
use App\Models\Fighter;
use App\Models\Person;
use App\Models\Team;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class FighterController extends Controller
{

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Fighter::class, 'fighter');
    }

    /**
     * This function returns all the available fighters in table format (either all fighters or just the fighters of the club the user belongs to)
     * @return array
     */
    public function getFighters() {
        $user = Auth::user();
        $fighters = [];
        if (Gate::allows("admin")) {
            $fighters = Fighter::all();
        } else {
            $fighters = Fighter::all()->reject(function ($fighter) use ($user) {
                return $fighter->person->club->id !== $user->club->id;
            });
        }

        $rows = [];
        $counter = 1;

        foreach ($fighters as $fighter) {
            $row = [
                "data" => $fighter->tableProperties($counter++),
                "editUrl" => url("/entities/fighters/" . $fighter->id),
                "deleteUrl" => url("/entities/fighters/" . $fighter->id),
            ];
            array_push($rows, $row);
        }
        return $rows;
    }

    /**
     * This function returns all fighters from a given club
     *
     * @param Club $club
     * @return Fighter[]|\Illuminate\Database\Eloquent\Collection|null
     */
    public function getFightersFromClub(Club $club) {
        if (Auth::user()->club->id === $club->id || Auth::user()->isAdmin()) {
            $fighters = Fighter::all()->reject(function ($fighter) use ($club) {
                return $fighter->person->club->id !== $club->id;
            });
            return $fighters;
        } else {
            return null;
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rows = $this->getFighters();
        return view("Entities.entity-overview", ["entities" => "Kämpfer", "entity" => "Kämpfer", "columns" => Fighter::tableHeadings(), "rows" => $rows, "addEntityUrl" => url("/entities/fighters")]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $club = Club::getClub($request->input("Verein", null));
        $fighters = Fighter::join("people", "fighters.person_id", "=", "people.id")->join("clubs", "people.club_id", "=", "clubs.id")->select("fighters.*", "people.*","clubs.name as club_name")->get();
        if ($fighters->where("first_name", "=", $request->input("Vorname"))->where("last_name", "=", $request->input("Nachname"))->where("type", "=", PersonTypes::FIGHTER)->where("club_name", "=", $club->name)->first() !== null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Der Kämpfer \"" . $request->input("Vorname") . " " . $request->input("Nachname") . "\" existiert in diesem Verein schon.");
        }
        $newPerson = Person::create([
            "type" => PersonTypes::FIGHTER,
            "first_name" => $request->input("Vorname"),
            "last_name" => $request->input("Nachname"),
            "club_id" => $club->id,
        ]);
        $newFighter = Fighter::create([
            "person_id" => $newPerson->id,
            "birthdate" => $request->input("Alter"),
            "sex" => $request->input("Geschlecht"),
            "graduation" => $request->input("Graduierung"),
        ]);
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der neue Kämpfer \"" . $newPerson->first_name . " " . $newPerson->last_name . "\" wurde erfolgreich erstellt. Die Seite lädt in 5 Sekunden neu, um den neuen Kämpfer in dieser Übersicht anzuzeigen.");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Fighter  $fighter
     * @return \Illuminate\Http\Response
     */
    public function show(Fighter $fighter)
    {
        //
    }

    /**
     * Return the editable data of the specified resource.
     *
     * @param  \App\Models\Fighter  $fighter
     * @return \Illuminate\Http\Response
     */
    public function edit(Fighter $fighter)
    {
        $birthdate = Carbon::parse($fighter->birthdate);
        $editableProperties = [
            "Vorname" => $fighter->person->first_name,
            "Nachname" => $fighter->person->last_name,
            "Geburtsdatum" => $birthdate->day . "." . $birthdate->month . "." . $birthdate->year,
            "Geschlecht" => GeneralHelper::addOtherChoosableOptions("sex", $fighter->sex),
            "Graduierung" => GeneralHelper::addOtherChoosableOptions("graduations", $fighter->graduation),
        ];
        if (Auth::user()->isAdmin()) {
            $editableProperties = array_merge($editableProperties, ["Verein" => GeneralHelper::addOtherChoosableOptions("clubs", $fighter->person->club->name)]);
        }
        return json_encode($editableProperties);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param Fighter $fighter
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Fighter $fighter)
    {
        $club = Club::getClub($request->input("Verein", null));
        if ($fighter === null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Leider konnte kein Kämpfer mit dem Namen \"" . $request->input("Vorname") . " " . $request->input("Nachname") . "\" in diesem Verein zum Bearbeiten gefunden werden.");
        }
        if ($fighter->person->club->name !== $club->name && !Auth::user()->isAdmin()) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Nur Admins können Personen einem anderen Verein zuordnen!");
        }
        $person = $fighter->person;
        $person->first_name = $request->input("Vorname");
        $person->last_name = $request->input("Nachname");
        $person->club_id = $club->id;
        $person->save();

        $birthdate = Carbon::parse($request->input("Geburtsdatum"));
        $birthdate = $birthdate->year . "-" . $birthdate->month . "-" . $birthdate->day;
        $fighter->birthdate = $birthdate;
        $fighter->sex = $request->input("Geschlecht");
        $fighter->graduation = $request->input("Graduierung");
        $fighter->save();
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der Kämpfer \"" . $request->input("Vorname") . " " . $request->input("Nachname") . "\" wurde erfolgreich bearbeitet.");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Fighter $fighter
     * @return \Illuminate\Http\Response
     */
    public function destroy(Fighter $fighter)
    {
        if ($fighter === null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Leider konnte dieser Kämpfer nicht gefunden werden.");
        }
        $fighterName = $fighter->person->first_name . " " . $fighter->person->last_name;
        if ($fighter->delete()) {
            return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der Kämpfer mit dem Namen \"" . $fighterName . "\" wurde erfolgreich gelöscht.");
        } else {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Leider konnte der Kämpfer mit dem Namen \"" . $fighterName . "\" nicht gelöscht werden.");
        }
    }
}
