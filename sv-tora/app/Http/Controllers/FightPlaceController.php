<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Models\FightPlace;
use App\Models\Tournament;
use Illuminate\Http\Request;

class FightPlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Tournament $tournament)
    {
        $fightPlaces = FightPlace::where("tournament_id", "=", $tournament->id)->get();
        return response()->view("Tournament.fight-places", ["tournament" => $tournament, "fightPlaces" => $fightPlaces, "addPoolUrl" => url("/tournaments/" . $tournament->id . "/fight-places")]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Tournament $tournament)
    {
        if ($tournament->active) {
            return response()->json(FightPlace::editableProperties());
        } else {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Durchgeführte Wettkämpfe dürfen nicht mehr verändert werden!");
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Tournament $tournament, Request $request)
    {
        $name = $request->input("Name");
        if ($tournament->active) {
            FightPlace::create([
                "name" => $name,
                "tournament_id" => $tournament->id,
            ]);
            return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der neue Pool \"" . $name . "\" wurde erfolgreich erstellt.");
        } else {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Durchgeführte Wettkämpfe dürfen nicht mehr verändert werden!");
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\FightPlace  $fightPlace
     * @return \Illuminate\Http\Response
     */
    public function show(FightPlace $fightPlace)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\FightPlace  $fightPlace
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Tournament $tournament, FightPlace $fightPlace)
    {
        if ($tournament->active) {
            return response()->json(FightPlace::editableProperties($fightPlace));
        } else {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Durchgeführte Wettkämpfe dürfen nicht mehr verändert werden!");
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\FightPlace  $fightPlace
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tournament $tournament, FightPlace $fightPlace)
    {
        $newName = $request->input("Name");
        if ($tournament->active) {
            $fightPlace->name = $newName;
            $fightPlace->save();
            return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der Pool \"" . $newName . "\" wurde erfolgreich aktualisiert.");
        } else {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Durchgeführte Wettkämpfe dürfen nicht mehr verändert werden (Dazu zählen natürlich alle Eigenschaften)!");
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\FightPlace  $fightPlace
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tournament $tournament, FightPlace $fightPlace)
    {
        if ($tournament->active) {
            if ($tournament->fightPlaces->count() > 1) {
                $fightPlaceName = $fightPlace->name;
                $fightPlace->delete();
                return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Pool \"" . $fightPlaceName . "\" wurde erfolgreich gelöscht.");
            } else {
                return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Mindestens ein Pool muss existieren, damit der Wettkampf ausgetragen werden kann. Um diesen konkreten Pool zu löschen, erstelle bitte einen neuen Pool und lösche dann diesen alten.");
            }
        } else {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Durchgeführte Wettkämpfe dürfen nicht mehr verändert werden!");
        }
    }
}
