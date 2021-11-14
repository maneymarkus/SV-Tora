<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Models\Club;
use App\Models\EnrolledPerson;
use App\Models\Person;
use App\Models\Tournament;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class EnrolledPersonController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function index(Tournament $tournament, $type, $addUrl, $deleteUrl, $entities, $entity)
    {
        $this->authorize("viewAny", [EnrolledPerson::class, $tournament]);

        $user = Auth::user();
        $enrolledPersons = EnrolledPerson::join("people", "people.id", "=", "enrolled_people.person_id")->select("enrolled_people.*", "people.type as type", "people.id as person_id")->where("tournament_id", "=", $tournament->id)->where("type", "=", $type);
        if (Gate::allows("admin")) {
            $enrolledPersons = $enrolledPersons->get();
        } else {
            $enrolledPersons = $enrolledPersons->where("club_id", "=", $user->club->id)->get();
        }

        $rows = [];
        $counter = 1;

        foreach ($enrolledPersons as $enrolledPerson) {
            $row = [
                "data" => $enrolledPerson->person->tableProperties($counter++),
                "deleteUrl" => url($deleteUrl . "/" . $enrolledPerson->id),
            ];
            array_push($rows, $row);
        }

        return response()->view("Tournament.enrolled-entities", ["tournament" => $tournament, "addUrl" => $addUrl, "entities" => $entities, "entity" => $entity, "columns" => Person::tableHeadings(), "rows" => $rows]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function add(Tournament $tournament, $type, $enrollUrl, $addEntityUrl, $entities, $entity)
    {
        $this->authorize("add", [EnrolledPerson::class, $tournament]);

        $allEnrolledPersonIds = EnrolledPerson::all()->pluck("person_id");
        $selectablePersons = Person::where("type", "=", $type);
        if (Gate::allows("admin")) {
            $selectablePersons = $selectablePersons->get();
        } else {
            $selectablePersons = $selectablePersons->where("club_id", "=", Auth::user()->club->id)->get();
        }
        $selectablePersons = $selectablePersons->reject(function ($person) use ($allEnrolledPersonIds) {
            return $allEnrolledPersonIds->contains($person->id);
        });
        $rows = [];
        $counter = 1;

        foreach ($selectablePersons as $selectablePerson) {
            $row = [
                "data" => $selectablePerson->tableProperties($counter++),
            ];
            array_push($rows, $row);
        }
        return response()->view("Tournament.enroll-entities", ["tournament" => $tournament, "enrollUrl" => $enrollUrl, "addEntityUrl" => $addEntityUrl, "entities" => $entities, "entity" => $entity, "columns" => Person::tableHeadings(), "rows" => $rows]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Tournament $tournament
     * @param String $type
     * @return \Illuminate\Http\Response
     */
    public function enroll(Request $request, Tournament $tournament, string $type)
    {
        $this->authorize("enroll", [EnrolledPerson::class, $tournament]);

        foreach ($request["selected_entities"] as $selectedEntity) {
            $club = Club::firstWhere("name", "=", $selectedEntity["Verein"]);
            if (!Gate::allows("admin") && $club != Auth::user()->club) {
                return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Eine oder mehrere der ausgewählten Personen kannst du nicht hinzufügen.");
            }
            $first_name = $selectedEntity["Vorname"];
            $last_name = $selectedEntity["Nachname"];
            $person = Person::where("type", "=", $type)
                        ->where("first_name", "=", $first_name)
                        ->where("last_name", "=", $last_name)
                        ->where("club_id", "=", $club->id)
                        ->first();
            if ($person === null) {
                return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Die Person \"" . $first_name . " " . $last_name . "\" existiert nicht und kann daher nicht angemeldet werden.");
            }
            $enrolledPerson = EnrolledPerson::create([
                "tournament_id" => $tournament->id,
                "person_id" => $person->id,
            ]);
        }
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Alle ausgewählten Personen wurden zum Wettkampf angemeldet.");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tournament $tournament, EnrolledPerson $enrolledPerson)
    {
        $this->authorize("delete", [EnrolledPerson::class, $tournament, $enrolledPerson]);

        if ($enrolledPerson === null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Die gegebene Person existiert nicht und kann daher nicht vom Wettkampf entfernt werden.");
        }
        $person = $enrolledPerson->person;
        $personName = $person->fullName();
        if ($enrolledPerson->delete()) {
            return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Die Person mit dem Namen \"" . $personName . "\" wurde erfolgreich vom Wettkampf entfernt.");
        } else {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Leider konnte die Person mit dem Namen \"" . $personName . "\" nicht vom Wettkampf entfernt werden.");
        }
    }
}
