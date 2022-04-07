<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Models\Category;
use App\Models\FightingSystem;
use App\Models\Tournament;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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

        if ($category->examination_type === "Team" && $fightingSystem->name !== "Tafelsystem") {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Einer Teams-Kategorie kannst du nur das Tafelsystem zuordnen.");
        }

        $category->fightingSystem()->associate($fightingSystem);
        $category->prepared = true;
        $category->save();
        $this->reinitializeFightingSystem($category);

        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Das Kampfsystem ($fightingSystemName) wurde der Kategorie \"" . $category->name . "\" zugeordnet.");

    }

    public function editCategoryFightingSystem(Tournament $tournament, Category $category) {
        if (!$category->prepared) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Das Kampfsystem dieser Kategorie (" . $category->name  . ") kann nicht angepasst werden, da noch gar kein Kampfsystem zugewiesen wurde.");
        }
        $fightingSystem = $category->getFightingSystem();
        $html = $fightingSystem->editConfig();
        return response()->json([
            "heading" => "Kampfsystem der Kategorie " . $category->name . " anpassen",
            "html" => $html,
            "updateUrl" => url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/fighting-system/edit"),
        ]);
    }

    public function updateCategoryFightingSystem(Request $request, Tournament $tournament, Category $category) {
        if (!$category->prepared) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Das Kampfsystem dieser Kategorie (" . $category->name  . ") kann nicht angepasst werden, da noch gar kein Kampfsystem zugewiesen wurde.");
        }
        $fightingSystem = $category->getFightingSystem();
        $fightingSystem->updateConfig($request);
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Das Kampfsystem der Kategorie " . $category->name . " wurde erfolgreich angepasst.");
    }

    public function printCategoryFightingSystem(Tournament $tournament, Category $category) {
        if (!$category->prepared) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Das Kampfsystem dieser Kategorie (" . $category->name  . ") kann nicht angepasst werden, da noch gar kein Kampfsystem zugewiesen wurde.");
        }
        $fightingSystem = $category->getFightingSystem();
        return $fightingSystem->print();
    }

    /**
     * Should be called after doing operations on categories that could have potentially messed up the fighting system (e.g. changing the fighters)
     *
     * @param Category $category
     */
    public function reinitializeFightingSystem(Category $category) {
        $category->refresh();
        $category->fighting_system_configuration = null;
        $category->save();

        // trigger initialization
        $category->calculateEstimatedTime();
        $fightingSystem = $category->getFightingSystem();
        return $fightingSystem;
    }

}
