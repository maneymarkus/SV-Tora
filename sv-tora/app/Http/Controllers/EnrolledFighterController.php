<?php

namespace App\Http\Controllers;

use App\Helper\Categories;
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
        $this->authorize("viewAny", [EnrolledFighter::class, $tournament]);

        session()->forget("configurableFighters");
        $user = Auth::user();
        $enrolledFighters = EnrolledFighter::with("fighter.person")
            ->where("tournament_id", "=", $tournament->id)
            ->get();
        if (!Gate::allows("admin")) {
            $enrolledFighters = $enrolledFighters->where("fighter.person.club_id", "=", $user->club->id);
        }

        $columns = [
            ["heading" => "Nr.", "sortable" => true],
            ["heading" => "Vorname", "sortable" => true],
            ["heading" => "Nachname", "sortable" => true],
            ["heading" => "Alter", "sortable" => true],
            ["heading" => "Geschlecht", "sortable" => true],
            ["heading" => "Graduierung", "sortable" => true],
            ["heading" => "Kategorie(n)", "sortable" => true],
        ];

        if (Gate::allows("admin")) {
            $columns = array_merge($columns, [["heading" => "Verein", "sortable" => true]]);
        }

        $rows = [];
        $counter = 1;

        foreach ($enrolledFighters as $enrolledFighter) {
            $row = [
                "data" => [
                    $counter++,
                    $enrolledFighter->fighter->person->first_name,
                    $enrolledFighter->fighter->person->last_name,
                    $enrolledFighter->fighter->age(),
                    $enrolledFighter->fighter->sex,
                    $enrolledFighter->fighter->graduation,
                    implode(", ", $enrolledFighter->categories->pluck("name")->toArray()),
                ],
                "editUrl" => url("/tournaments/" . $tournament->id . "/enrolled/fighters/" . $enrolledFighter->id),
                "deleteUrl" => url("/tournaments/" . $tournament->id . "/enrolled/fighters/" . $enrolledFighter->id),
            ];
            if (Gate::allows("admin")) {
                array_push($row["data"], $enrolledFighter->fighter->person->club->name);
            }
            array_push($rows, $row);
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
        $this->authorize("add", [EnrolledFighter::class, $tournament]);

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
        $this->authorize("prepare", [EnrolledFighter::class, $tournament]);

        $fighters = [];
        foreach ($request["selected_entities"] as $selectedEntity) {
            $club = Club::firstWhere("name", "=", $selectedEntity["Verein"]);
            if (!Gate::allows("admin") && $club != Auth::user()->club) {
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


    public function configure(Tournament $tournament) {
        $this->authorize("configure", [EnrolledFighter::class, $tournament]);

        $configurableFighters = session("configurableFighters");
        if ($configurableFighters === null) {
            return redirect("/tournaments/" . $tournament->id . "/enrolled/fighters/add");
        }
        $fighters = array();
        foreach ($configurableFighters as $configurableFighter) {
            $fighter = $configurableFighter;
            $fighter->properties = [
                "Alter" => $fighter->age(),
                "Geschlecht" => $fighter->sex,
                "Graduierung" => $fighter->graduation,
                "Verein" => $fighter->person->club->name,
            ];
            $fighter->enrollUrl = url("/tournaments/" . $tournament->id . "/enrolled/fighters/" . $fighter->id . "/enroll");
            $examinationTypes = [];
            foreach(explode(";", $tournament->tournamentTemplate->examination_types) as $examinationType) {
                if ($examinationType === "Team") {
                    continue;
                }
                $examinationTypes[$examinationType] = [];
                try {
                    $categories = GeneralHelper::determineCategoryOfFighter($fighter, $examinationType);
                } catch (\Exception $e) {
                    $error = $e->getMessage();
                    $examinationTypes[$examinationType]["error"] = $error;
                    continue;
                }
                $participationRadioOptions = [
                    ["text" => "Teilnehmen", "value" => "1", "checked" => false, "disabled" => false],
                    ["text" => "Nicht Teilnehmen", "value" => "0", "checked" => false, "disabled" => false],
                ];
                $examinationTypes[$examinationType]["participationRadioOptions"] = $participationRadioOptions;
                if (is_array($categories)) {
                    $configurationSelectOptions = array_keys($categories);
                    $examinationTypes[$examinationType]["configurationSelectOptions"] = $configurationSelectOptions;
                }
            }
            $fighter->examinationTypes = $examinationTypes;
            array_push($fighters, $fighter);
        }
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
        $this->authorize("enroll", [EnrolledFighter::class, $tournament, $fighter]);

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
                    $categoryName = $categories[$request["Kategorie"][$examinationType . " Kategorie"]];
                } else {
                    $categoryName = $categories;
                }
                $category = Category::where("name", "=", $categoryName)->first();
                if ($category === null) {
                    $category = Category::createCategoryByName($categoryName, $tournament);
                }
                $category->fighters()->attach($enrolledFighter->id);
            }
        }
        if (!$atLeastOneParticipation) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "In mindestens einer Disziplin muss der Kämpfer teilnehmen!");
        }
        $configurableFighters = session("configurableFighters");
        array_splice($configurableFighters, array_search(collect($configurableFighters)->where("id", "=", $fighter->id)->first(), $configurableFighters), 1);
        session(["configurableFighters" => $configurableFighters]);
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der Kämpfer \"" . $fighter->person->fullName() . "\" wurde erfolgreich zum Wettkampf angemeldet.");
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Tournament $tournament
     * @param \App\Models\EnrolledFighter $enrolledFighter
     * @return \Illuminate\Http\Response
     */
    public function prepareEdit(Tournament $tournament, EnrolledFighter $enrolledFighter)
    {
        $this->authorize("configure", [EnrolledFighter::class, $tournament, $enrolledFighter]);

        return json_encode(["redirectUrl" => url("/tournaments/" . $tournament->id . "/enrolled/fighters/" . $enrolledFighter->id . "/configure")]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Tournament $tournament
     * @param \App\Models\EnrolledFighter $enrolledFighter
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Tournament $tournament, EnrolledFighter $enrolledFighter)
    {
        $this->authorize("edit", [EnrolledFighter::class, $tournament, $enrolledFighter]);

        $fighter = $enrolledFighter->fighter;
        $fighter->first_name = $fighter->person->first_name;
        $fighter->last_name = $fighter->person->last_name;
        $fighter->properties = [
            "Alter" => $fighter->age(),
            "Geschlecht" => $fighter->sex,
            "Graduierung" => $fighter->graduation,
            "Verein" => $fighter->person->club->name,
        ];
        $fighter->enrollUrl = url("/tournaments/" . $tournament->id . "/enrolled/fighters/" . $enrolledFighter->id);
        $fighter->unenrollUrl = url("/tournaments/" . $tournament->id . "/enrolled/fighters/" . $enrolledFighter->id);
        $examinationTypes = [];
        foreach(explode(";", $tournament->tournamentTemplate->examination_types) as $examinationType) {
            if ($examinationType === "Team") {
                continue;
            }
            $examinationTypes[$examinationType] = [];
            try {
                $categories = GeneralHelper::determineCategoryOfFighter($fighter, $examinationType);
            } catch (\Exception $e) {
                $error = $e->getMessage();
                $examinationTypes[$examinationType]["error"] = $error;
                continue;
            }
            $participate = false;
            foreach ($enrolledFighter->categories as $category) {
                if (array_key_exists($category->name, Categories::CATEGORIES) && Categories::CATEGORIES[$category->name]["examination_type"] === $examinationType) {
                    $participate = true;
                    $examinationTypes[$examinationType]["enabled"] = true;
                }
            }
            $participationRadioOptions = [
                ["text" => "Teilnehmen", "value" => "1", "checked" => $participate, "disabled" => false],
                ["text" => "Nicht Teilnehmen", "value" => "0", "checked" => !$participate, "disabled" => false],
            ];
            $examinationTypes[$examinationType]["participationRadioOptions"] = $participationRadioOptions;
            if (is_array($categories)) {
                $configurationSelectOptions = array_keys($categories);
                $examinationTypes[$examinationType]["configurationSelectOptions"] = $configurationSelectOptions;
            }
        }
        $fighter->examinationTypes = $examinationTypes;
        return response()->view("Tournament.fighter-tournament-configuration", ["tournament" => $tournament,"fighters" => [$fighter]]);
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
        $this->authorize("update", [EnrolledFighter::class, $tournament, $enrolledFighter]);

        $atLeastOneParticipation = false;
        $enrolledFighter->categories()->sync([]);
        foreach($request["Disziplin"] as $examinationType => $enrollmentChoice) {
            if ($enrollmentChoice == "1") {
                $atLeastOneParticipation = true;
                $categories = GeneralHelper::determineCategoryOfFighter($enrolledFighter->fighter, $examinationType);
                if (is_array($categories)) {
                    $categoryName = $categories[$request["Kategorie"][$examinationType . " Kategorie"]];
                } else {
                    $categoryName = $categories;
                }
                $category = Category::where("name", "=", $categoryName)->first();
                if ($category === null) {
                    $category = Category::createCategoryByName($categoryName, $tournament);
                }
                $category->fighters()->attach($enrolledFighter->id);
            }
        }
        if (!$atLeastOneParticipation) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "In mindestens einer Disziplin muss der Kämpfer teilnehmen!");
        }
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Die Teilnahme des Kämpfers \"" . $enrolledFighter->fighter->person->fullName() . "\" wurde erfolgreich geändert.");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Tournament $tournament
     * @param \App\Models\EnrolledFighter $enrolledFighter
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tournament $tournament, EnrolledFighter $enrolledFighter)
    {
        $this->authorize("delete", [EnrolledFighter::class, $tournament, $enrolledFighter]);

        if ($enrolledFighter === null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Der gegebene Kämpfer existiert nicht und kann daher nicht vom Wettkampf entfernt werden.");
        }
        $personName = $enrolledFighter->fighter->person->fullName();
        if ($enrolledFighter->delete()) {
            return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der Kämpfer mit dem Namen \"" . $personName . "\" wurde erfolgreich vom Wettkampf abgemeldet.");
        } else {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Leider konnte der Kämpfer mit dem Namen \"" . $personName . "\" nicht vom Wettkampf abgemeldet werden.");
        }
    }
}
