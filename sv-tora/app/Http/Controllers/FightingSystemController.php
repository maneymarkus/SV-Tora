<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Models\Category;
use App\Models\FightingSystem;
use App\Models\Tournament;
use Illuminate\Http\Request;

class FightingSystemController extends Controller
{

    public function index(Tournament $tournament)
    {
        return response()->view("Tournament.category-fighting-systems", ["tournament" => $tournament]);
    }

    public function assignFightingSystem(Request $request, Tournament $tournament, Category $category) {
        $fightingSystemName = $request->input("fighting_system");
        $fightingSystem = FightingSystem::firstWhere("name", "=", $fightingSystemName);

        if ($fightingSystem === null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Das gewünschte Kampfsystem ($fightingSystemName) existiert nicht.");
        }

        $category->fightingSystem()->associate($fightingSystem);
        $category->prepared = true;
        $category->save();

        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Das Kampfsystem ($fightingSystemName) wurde der Kategorie \"" . $category->name . "\"zugeordnet.");

    }

    public function printCategoryFightingSystem(Tournament $tournament, Category $category) {

    }

}
