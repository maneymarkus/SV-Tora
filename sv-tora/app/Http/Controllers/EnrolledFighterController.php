<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Models\Category;
use App\Models\Club;
use App\Models\EnrolledFighter;
use App\Models\Fighter;
use App\Models\Tournament;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class EnrolledFighterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Tournament $tournament)
    {
        session()->forget("configurableFighters");
        $user = Auth::user();
        $enrolledFighters = EnrolledFighter::join("fighters", "fighters.id", "=", "enrolled_fighters.fighter_id")
            ->select("enrolled_fighters.*", "fighters.*", "fighters.id as fighter_id")
            ->where("tournament_id", "=", $tournament->id);
        if (Gate::allows("admin")) {
            $enrolledFighters = $enrolledFighters->get();
        } else {
            $enrolledFighters = $enrolledFighters->join("people", "people.id", "=", "fighter_id")
                ->select("people.club_id as club_id")
                ->where("club_id", "=", $user->club->id)
                ->get();
        }

        $columns = [
            ["heading" => "Nr.", "sortable" => true],
            ["heading" => "Vorname", "sortable" => true],
            ["heading" => "Nachname", "sortable" => true],
            ["heading" => "Alter", "sortable" => true],
            ["heading" => "Geschlecht", "sortable" => true],
            ["heading" => "Graduierung", "sortable" => true],
            ["heading" => "Kategorie(n)", "sortable" => true],
            ["heading" => "Verein", "sortable" => true],
        ];

        $rows = [];
        $counter = 1;

        foreach ($enrolledFighters as $enrolledFighter) {
            foreach ($enrolledFighter->categories as $category) {
                $row = [
                    "data" => [
                        $counter++,
                        $enrolledFighter->fighter->person->first_name,
                        $enrolledFighter->fighter->person->last_name,
                        $enrolledFighter->fighter->age(),
                        $enrolledFighter->fighter->sex,
                        $enrolledFighter->fighter->graduation,
                        $category->name,
                        $enrolledFighter->fighter->person->club->name,
                    ],
                    "deleteUrl" => url("/tournaments/" . $tournament->id . "/enrolled/fighters/" . $enrolledFighter->id . "/category/" . $category->id),
                ];
                array_push($rows, $row);
            }
        }
        return response()->view("Tournament.enrolled-fighters", ["tournament" => $tournament, "addUrl" => url("/tournaments/" . $tournament->id . "/enrolled/fighters/add"), "entities" => "Kämpfer", "entity" => "Kämpfer", "columns" => $columns, "rows" => $rows]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function add(Tournament $tournament)
    {
        $allEnrolledFighterIds = EnrolledFighter::all()->pluck("fighter_id");
        if (Gate::allows("admin")) {
            $selectableFighters = Fighter::all();
        } else {
            $user = Auth::user();
            $selectableFighters = Fighter::all()->reject(function ($fighter) use ($user) {
                return $fighter->person->club->id !== $user->club->id;
            });
        }
        $selectableFighters = $selectableFighters->reject(function ($fighter) use ($allEnrolledFighterIds, $tournament) {
            $graduationMin = array_search($tournament->tournamentTemplate->graduation_min, config("global.graduations"));
            $graduationMax = array_search($tournament->tournamentTemplate->graduation_max, config("global.graduations"));
            return $allEnrolledFighterIds->contains($fighter->id)
                || $fighter->age() > $tournament->tournamentTemplate->age_max
                || $fighter->age() < $tournament->tournamentTemplate->age_min
                || array_search($fighter->graduation, config("global.graduations")) > $graduationMax
                || array_search($fighter->graduation, config("global.graduations")) < $graduationMin;
        });
        $rows = [];
        $counter = 1;

        foreach ($selectableFighters as $selectableFighter) {
            $row = [
                "data" => $selectableFighter->tableProperties($counter++),
            ];
            array_push($rows, $row);
        }
        $enrollUrl = url("/tournaments/" . $tournament->id . "/enrolled/fighters/prepare");
        $addEntityUrl = url("/entities/fighters/");
        return response()->view("Tournament.enroll-entities", ["tournament" => $tournament, "enrollUrl" => $enrollUrl, "addEntityUrl" => $addEntityUrl, "entities" => "Kämpfer", "entity" => "Kämpfer", "columns" => Fighter::tableHeadings(), "rows" => $rows]);
    }


    /**
     *
     *
     * @param Request $request
     * @param Tournament $tournament
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|void
     */
    public function prepare(Request $request, Tournament $tournament) {
        $fighters = [];
        foreach ($request["selected_entities"] as $selectedEntity) {
            $club = Club::firstWhere("name", "=", $selectedEntity["Verein"]);
            if (!Gate::allows("admin") && $club !== Auth::user()->club) {
                return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Eine oder mehrere der ausgewählten Kämpfer kannst du aufgrund von fehlenden Berechtigungen nicht hinzufügen.");
            }
            $first_name = $selectedEntity["Vorname"];
            $last_name = $selectedEntity["Nachname"];
            $sex = $selectedEntity["Geschlecht"];
            $graduation = $selectedEntity["Graduierung"];
            $age = $selectedEntity["Alter"];
            $fighter = Fighter::join("people", "people.id", "=", "fighters.person_id")
                ->select("fighters.*", "people.first_name", "people.last_name", "people.club_id", "people.id as person_id")
                ->where("first_name", "=", $first_name)
                ->where("last_name", "=", $last_name)
                ->where("sex", "=", $sex)
                ->where("graduation", "=", $graduation)
                ->where("club_id", "=", $club->id)
                ->first();
            if ($fighter === null || $fighter->age() !== intval($age)) {
                return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Der Kämpfer \"" . $fighter->person->fullName() . "\" existiert nicht und kann daher nicht angemeldet werden.");
            }
            array_push($fighters, $fighter);
        }
        session(["configurableFighters" => $fighters]);
        return json_encode(["redirectUrl" => url("/tournaments/" . $tournament->id . "/enrolled/fighters/configure")]);
    }


    public function configure(Request $request, Tournament $tournament) {
        $fighters = session("configurableFighters");
        return response()->view("Tournament.fighter-tournament-configuration", ["tournament" => $tournament,"fighters" => $fighters]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Tournament $tournament
     * @param Fighter $fighter
     * @return \Illuminate\Http\Response
     */
    public function enroll(Request $request, Tournament $tournament, Fighter $fighter)
    {
        $enrolledFighter = $fighter->enrolledConfigurations()->where("tournament_id", "=", $tournament->id)->first();
        if ($enrolledFighter === null) {
            $enrolledFighter = EnrolledFighter::create([
                "fighter_id" => $fighter->id,
                "tournament_id" => $tournament->id,
            ]);
        }
        $atLeastOneParticipation = false;
        foreach($request["Disziplin"] as $examinationType => $enrollmentChoice) {
            if ($enrollmentChoice == "1") {
                $atLeastOneParticipation = true;
                $categories = GeneralHelper::determineCategoryOfFighter($fighter, $examinationType);
                if (is_array($categories)) {
                    $category = $categories[$request["Kategorie"][$examinationType . " Kategorie"]];
                } else {
                    $category = $categories;
                }
                $categoryModel = Category::where("name", "=", $category)->first();
                if ($categoryModel === null) {
                    $categoryModel = Category::create([
                        "name" => $category
                    ]);
                }
                $categoryModel->fighters()->attach($enrolledFighter->id);
            }
        }
        if (!$atLeastOneParticipation) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "In mindestens einer Disziplin muss der Kämpfer teilnehmen!");
        }
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der Kämpfer \"" . $fighter->person->fullName() . "\" wurde erfolgreich zum Wettkampf angemeldet.");
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Tournament $tournament
     * @param \App\Models\EnrolledFighter $enrolledFighter
     * @return \Illuminate\Http\Response
     */
    public function edit(Tournament $tournament, EnrolledFighter $enrolledFighter)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Tournament $tournament
     * @param \App\Models\EnrolledFighter $enrolledFighter
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tournament $tournament, EnrolledFighter $enrolledFighter)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\EnrolledFighter  $enrolledFighter
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tournament $tournament, EnrolledFighter $enrolledFighter, Category $category)
    {
        if ($enrolledFighter === null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Der gegebene Kämpfer existiert nicht und kann daher nicht vom Wettkampf entfernt werden.");
        }
        if (!$enrolledFighter->categories->contains($category)) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Der Kämpfer ist in dieser Kategorie gar nicht angemeldet und kann daher von dieser gar nicht abgemeldet werden.");
        }
        $personName = $enrolledFighter->fighter->person->fullName();
        if ($enrolledFighter->categories->count() > 1) {
            $enrolledFighter->categories()->detach($category->id);
            return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der Kämpfer wurde erfolgreich von der Kategorie \"" . $category->name . "\" abgemeldet.");
        } else {
            if ($enrolledFighter->delete()) {
                return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der Kämpfer mit dem Namen \"" . $personName . "\" wurde erfolgreich vom Wettkampf abgemeldet.");
            } else {
                return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Leider konnte der Kämpfer mit dem Namen \"" . $personName . "\" nicht vom Wettkampf abgemeldet werden.");
            }
        }
    }
}
