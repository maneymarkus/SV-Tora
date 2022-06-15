<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Models\Category;
use App\Models\FightPlace;
use App\Models\Tournament;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Str;

class ScheduleController extends Controller
{

    public function show(Tournament $tournament) {
        $fightPlaces = $tournament->fightPlaces;
        $unrankedCategories = $tournament->categories()->where("fighting_system_id", "!=", null)->where("rank", "=", null)->get();
        $timeline = new HtmlString(GeneralHelper::createTimeline($tournament));

        foreach ($fightPlaces as $fightPlace) {
            $timeBlocks = $fightPlace->categories()->orderBy("rank")->get()->map(function ($category, $key) {
                $category->height = round($category->calculateDisplayHeight(), 2);
                return $category;
            })->toArray();

            if ($fightPlace->breaks !== null) {
                foreach ($fightPlace->breaks as $break) {
                    $break["height"] = $break["duration"] * config("global.ONE_MINUTE_LENGTH");
                    if ($break["afterCategory"] === null) {
                        array_unshift($timeBlocks, $break);
                        continue;
                    }

                    $index = 0;
                    foreach ($timeBlocks as $timeBlock) {
                        if (isset($timeBlock["id"]) && $timeBlock["id"] === $break["afterCategory"]) {
                            array_splice($timeBlocks, $index + 1, 0, array($break));
                        }
                        $index++;
                    }
                }
            }

            $fightPlace->timeBlocks = $timeBlocks;
        }

        return response()->view("Tournament.time-schedule", ["tournament" => $tournament, "fightPlaces" => $fightPlaces, "unrankedCategories" => $unrankedCategories, "timeline" => $timeline]);
    }

    public function store(Request $request, Tournament $tournament) {
        $schedules = $request->input("schedule");
        foreach ($schedules as $fightPlaceId => $schedule) {
            $fightPlace = FightPlace::find($fightPlaceId);
            if ($fightPlace === null) {
                return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Einer der bearbeiteten Pools existiert nicht.");
            }
            $fightPlace->categories()->update(["fight_place_id" => null, "rank" => null]);
            $fightPlace->breaks = null;
            $fightPlace->save();

            $lastCategory = null;
            foreach ($schedule as $timeBlock) {
                if (Str::of($timeBlock)->contains("break:")) {
                    $breakDuration = intval((string) Str::of($timeBlock)->remove("break:"));
                    $breaks = $fightPlace->breaks;
                    $breaks[] = ["duration" => $breakDuration, "afterCategory" => $lastCategory?->id];
                    $fightPlace->breaks = $breaks;
                    $fightPlace->save();
                } else {
                    $category = Category::find(intval($timeBlock));
                    $fightPlace->categories()->save($category);
                    $rank = $fightPlace->categories->count();
                    $category->rank = $rank;
                    $category->save();
                    $lastCategory = $category;
                }
            }
        }
        return json_encode(["true"]);
    }

    public function reset(Tournament $tournament) {
        foreach ($tournament->fightPlaces as $fightPlace) {
            $fightPlace->categories()->update(["fight_place_id" => null, "rank" => null]);
        }
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der Zeitplan wurde erfolgreich zurückgesetzt.");
    }

}
