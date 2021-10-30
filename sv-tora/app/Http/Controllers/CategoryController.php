<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Models\Category;
use App\Models\EnrolledFighter;
use App\Models\Fighter;
use App\Models\Tournament;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Tournament $tournament)
    {
        return response()->view("Tournament.category-administration", ["tournament" => $tournament]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create()
    {
        return response()->json(Category::editableProperties());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Tournament $tournament)
    {
        $newCategoryName = $request->input("Name");
        if (Category::where("tournament_id", "=", $tournament->id)->where("name", "=", $newCategoryName)->first() != null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Eine Kategorie mit dem Namen \"" . $newCategoryName . "\" existiert schon!");
        }
        $examinationType = $request->input("Prüfungsform");
        $possibleExaminationTypes = explode(";", $tournament->tournamentTemplate->examination_types);
        if (!in_array($examinationType, $possibleExaminationTypes)) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Diese Prüfungsform ist im betroffenen Wettkampf nicht zulässig!");
        }
        Category::create([
            "name" => $newCategoryName,
            "tournament_id" => $tournament->id,
            "examination_type" => $request->input("Prüfungsform"),
            "graduation" => $request->input("Graduierung"),
            "age_start" => $request->input("Mindestalter"),
            "age_end" => $request->input("Maximalalter"),
            "sex" => $request->input("Geschlecht"),
        ]);
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Die neue Kategorie \"" . $newCategoryName . "\" wurde erfolgreich angelegt. Die Seite lädt in 5 Sekunden neu, um die neue Kategorie anzuzeigen.");
    }


    /**
     * This function updates the name of the given category
     *
     * @param Request $request
     * @param Tournament $tournament
     * @param Category $category
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|void
     */
    public function updateName(Request $request, Tournament $tournament, Category $category) {
        $newCategoryName = $request->input("Name");
        if (Category::where("tournament_id", "=", $tournament->id)->where("name", "=", $newCategoryName)->first() != null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Eine Kategorie mit dem Namen \"" . $newCategoryName . "\" existiert schon!");
        }
        $category->name = $newCategoryName;
        $category->save();
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Die Kategorie \"" . $newCategoryName . "\" wurde erfolgreich umbenannt.");
    }


    /**
     * This function generates a printable PDF containing the category metadata and members
     *
     * @param Category $category
     */
    public function printCategory(Category $category) {
        # TODO
    }


    /**
     * This function returns the view to split a given $category into two new categories
     *
     * @param Tournament $tournament
     * @param Category $category
     * @return \Illuminate\Http\Response
     */
    public function prepareSplittingCategory(Tournament $tournament, Category $category) {
        return response()->view("Tournament.split-category", ["tournament" => $tournament, "category" => $category]);
    }


    public function splitCategory(Request $request, Tournament $tournament, Category $category) {
        $categories = $request->input("categories");
        foreach($categories as $categoryName => $fighters) {
            if (Category::where("tournament_id", "=", $tournament->id)->where("name", "=", $categoryName)->first() != null) {
                return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Eine Kategorie mit dem Namen \"" . $categoryName . "\" existiert schon. Bitte wähle also einen anderen Namen.");
            }
            $newCategory = Category::create([
                "name" => $categoryName,
                "tournament_id" => $tournament->id,
                "examination_type" => $category->examination_type,
                "graduation" => $category->graduation,
                "age_start" => $category->age_start,
                "age_end" => $category->age_end,
                "sex" => $category->sex,
            ]);
            foreach($fighters as $f) {
                $fighter = Fighter::find($f->id);
                $newCategory->fighters()->save($fighter);
            }
        }
        $oldCategoryName = $category->name;
        $category->delete();
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Die Kategorie \"" . $oldCategoryName . "\" wurde erfolgreich geteilt!");
    }


    public function mergeCategories(Request $request, Tournament $tournament, Category $category) {
        $mergeCategory = Category::firstWhere("name", "=", $request->input("merge_target"));
        if ($mergeCategory === null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Die Kategorie, in welche die aktuell ausgewählte Kategorie integriert werden soll, exisistiert nicht.");
        }
        $mergeCategory->fighters()->saveMany($category->fighters);
        $oldCategoryName = $category->name;
        $category->delete();
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Die Kategorie \"" . $oldCategoryName . "\" wurde erfolgreich mit der Kategorie \"" . $mergeCategory->name . "\" zusammen geführt. Die Seite läd in 5 Sekunden neu, um die Änderung anzuzeigen.");
    }


    public function selectFighters(Tournament $tournament, Category $category) {
        $rows = [];
        $counter = 1;

        foreach (Fighter::all() as $fighter) {
            $enrolledConfiguration = $fighter->enrolledConfigurations()->where("category_id", "=", $category->id)->first();
            if (!$category->fighters->contains($enrolledConfiguration)) {
                $row = [
                    "data" => $fighter->tableProperties($counter++),
                ];
                array_push($rows, $row);
            }
        }
        return view("Entities.select-entities", ["entities" => "Kämpfer", "addTo" => "Kategorie " . $category->name, "columns" => Fighter::tableHeadings(), "rows" => $rows, "addUrl" => url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/fighters"), "backUrl" => url()->previous("/tournaments/" . $tournament->id . "/categories")]);
    }


    /**
     * This function adds selected fighters to the given category
     *
     * @param Request $request
     * @param Tournament $tournament
     * @param Category $category
     */
    public function addFighters(Request $request, Tournament $tournament, Category $category) {
        $fighters = Fighter::join("people", "fighters.person_id", "=", "people.id")->join("clubs", "people.club_id", "=", "clubs.id")->select("fighters.*", "people.first_name", "people.last_name", "clubs.name as club_name")->get();
        foreach ($request["selected_entities"] as $fighterData) {
            $fighter = $fighters->where("first_name", "=", $fighterData["Vorname"])->where("last_name", "=", $fighterData["Nachname"])->where("sex", "=", $fighterData["Geschlecht"])->where("club_name", "=", $fighterData["Verein"])->where("graduation", "=", $fighterData["Graduierung"])->first();
            if ($category->fighters->contains($fighter)) {
                return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Der/die Kämpfer*in \"" . $fighter->first_name . " " . $fighter->last_name . "\" existiert schon in dieser Kategorie und kann daher nicht hinzugefügt werden.");
            }

            EnrolledFighter::create([
                "fighter_id" => $fighter->id,
                "category_id" => $category->id,
            ]);
        }
        return json_encode(["redirectUrl" => url("/tournaments/" . $tournament->id . "/categories")]);
    }


    /**
     * This function removes a selected fighter from a given category
     *
     * @param Tournament $tournament
     * @param Category $category
     * @param EnrolledFighter $enrolledFighter
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function removeFighter(Tournament $tournament, Category $category, EnrolledFighter $enrolledFighter) {
        Log::info($enrolledFighter->fighter->id);
        if (!$category->fighters->contains($enrolledFighter)) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Der ausgewählte Kämpfer kann nicht entfernt werden, da er nicht in dieser Kategorie vorhanden ist.");
        }
        $fighterName = $enrolledFighter->fighter->person->fullName();
        $enrolledFighter->delete();
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der Kämpfer \"" . $fighterName . "\" wurde aus der Kategorie entfernt.");
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tournament $tournament, Category $category)
    {
        $categoryName = $category->name;
        $category->delete();
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Die Kategorie \"" . $categoryName . "\" wurde erfolgreich gelöscht.");
    }
}
