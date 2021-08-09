<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Helper\PersonTypes;
use App\Models\Club;
use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class PersonController extends Controller
{

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Person::class, 'person');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($type, $editUrl, $deleteUrl, $addUrl, $entities, $entity)
    {
        $user = Auth::user();
        $persons = null;
        if (Gate::allows("admin")) {
            $persons = Person::where("type", "=", $type)->get();
        } else {
            $persons = Person::where("type", "=", $type)->where("club_id", "=", $user->club->id)->get();
        }

        $rows = [];
        $counter = 1;

        foreach ($persons as $person) {
            $row = [
                "data" => $person->tableProperties($counter++),
                "editUrl" => url($editUrl . $person->id),
                "deleteUrl" => url($deleteUrl . $person->id),
            ];
            array_push($rows, $row);
        }

        return view("Entities.entity-overview", ["entities" => $entities, "entity" => $entity, "columns" => Person::tableHeadings(), "rows" => $rows, "addEntityUrl" => url($addUrl)]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return json_encode(Person::editableProperties());
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param String $type
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, String $type)
    {
        $club = Club::getClub($request->input("Verein", null));
        $first_name = $request->input("first_name");
        $last_name = $request->input("last_name");
        if (Person::where("type", "=", $type)
                ->where("first_name", "=", $first_name)
                ->where("last_name", "=", $last_name)
                ->where("club_id", "=", $club->id)
                ->first() !== null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Die Person \"" . $first_name . " " . $last_name . "\" existiert in dem Verein als \"" . $type . "\" schon!");
        }
        $newPerson = Person::create([
            "type" => $type,
            "first_name" => $first_name,
            "last_name" => $last_name,
            "club_id" => $club->id
        ]);
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Die Person \"" . $first_name . " " . $last_name . "\" wurde erfolgreich angelegt.");
    }

    /**
     * Return the editable data of the specified resource.
     *
     * @param  \App\Models\Person $person
     * @return \Illuminate\Http\Response
     */
    public function edit(Person $person)
    {
        return json_encode(Person::editableProperties($person));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Person $person)
    {
        $club = Club::getClub($request->input("Verein", null));
        if ($person === null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Leider konnte keine Person mit dem Namen \"" . $request->input("Vorname") . " " . $request->input("Nachname") . "\" in diesem Verein zum Bearbeiten gefunden werden.");
        }
        if ($person->club->name !== $club->name && !Auth::user()->isAdmin()) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Nur Admins können Personen einem anderen Verein zuordnen!");
        }
        $person->first_name = $request->input("Vorname");
        $person->last_name = $request->input("Nachname");
        $person->club_id = $club->id;
        $person->save();

        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Die Person \"" . $request->input("Vorname") . " " . $request->input("Nachname") . "\" wurde erfolgreich bearbeitet.");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Person $person)
    {
        if ($person === null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Leider konnte diese Person nicht gefunden werden.");
        }
        $personName = $person->first_name . " " . $person->last_name;
        if ($person->delete()) {
            return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der Kämpfer mit dem Namen \"" . $personName . "\" wurde erfolgreich gelöscht.");
        } else {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Leider konnte der Kämpfer mit dem Namen \"" . $personName . "\" nicht gelöscht werden.");
        }
    }

}
