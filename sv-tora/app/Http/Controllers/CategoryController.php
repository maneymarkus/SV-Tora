<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Models\Category;
use App\Models\Tournament;
use Illuminate\Http\Request;

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
        if (Category::where("tournament_id", "=", $tournament->id)->where("")->first() != null) {
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
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        $categoryName = $category->name;
        $category->delete();
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Die Kategorie \"" . $categoryName . "\" wurde erfolgreich gelöscht.");
    }
}
