<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Models\TournamentTemplate;
use Illuminate\Http\Request;

class TournamentTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tournamentTemplates = TournamentTemplate::orderBy("tournament_name")->get();
        return view("Settings.tournament-templates", ["tournamentTemplates" => $tournamentTemplates, "addTournamentTemplateUrl" => url("/settings/tournament-templates")]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return json_encode(TournamentTemplate::editableProperties());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $tournamentName = $request->input("Wettkampf-Name");
        $minAge = intval($request->input("Mindestalter"));
        $maxAge = intval($request->input("Maximalalter"));
        $minGraduation = $request->input("Mindest-Graduierung");
        $maxGraduation = $request->input("Maximal-Graduierung");
        $teams = $request->input("Teams");
        $kihon = $request->input("Kihon");

        if ($tournamentName === null || $tournamentName === "") {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Du musst einen Namen für den Wettkampf angeben.");
        }
        if ($minAge === null || $minAge === 0) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Du musst ein Mindestalter für den Wettkampf angeben.");
        }
        if ($maxAge === null || $maxAge === 0) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Du musst ein Maximalalter für den Wettkampf angeben.");
        }
        if ($minAge >= $maxAge) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Das Mindestalter muss echt kleiner als das Maximalalter sein.");
        }
        if ($minGraduation === null || $minGraduation === "") {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Du musst eine kleinste Graduierung angeben.");
        }
        if ($maxGraduation === null || $maxGraduation === "") {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Du musst eine höchste Graduierung angeben.");
        }

        $examinationTypes = array("Kata", "Kumite");

        if ($kihon) {
            array_push($examinationTypes, "Kihon");
        }

        if ($teams) {
            array_push($examinationTypes, "Teams");
        }

        TournamentTemplate::create([
            "tournament_name" => $tournamentName,
            "age_min" => $minAge,
            "age_max" => $maxAge,
            "graduation_min" => $minGraduation,
            "graduation_max" => $maxGraduation,
            "team" => $teams,
            "kihon" => $kihon,
            "examination_types" => $examinationTypes,
        ]);

        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Die neue Wettkampf-Vorlage \"" . $tournamentName . "\" wurde erfolgreich erstellt. Die Seite lädt in 5 Sekunden neu, um die neue Wettkampf-Vorlage in dieser Übersicht anzuzeigen.");
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TournamentTemplate  $tournamentTemplate
     * @return \Illuminate\Http\Response
     */
    public function edit(TournamentTemplate $tournamentTemplate)
    {
        return json_encode(TournamentTemplate::editableProperties($tournamentTemplate));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TournamentTemplate  $tournamentTemplate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TournamentTemplate $tournamentTemplate)
    {
        $tournamentName = $request->input("Wettkampf-Name");
        $minAge = intval($request->input("Mindestalter"));
        $maxAge = intval($request->input("Maximalalter"));
        $minGraduation = $request->input("Mindest-Graduierung");
        $maxGraduation = $request->input("Maximal-Graduierung");
        $teams = $request->input("Teams");
        $kihon = $request->input("Kihon");

        if ($tournamentName === null || $tournamentName === "") {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Du musst einen Namen für den Wettkampf angeben.");
        }
        if ($minAge === null || $minAge === 0) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Du musst ein Mindestalter für den Wettkampf angeben.");
        }
        if ($maxAge === null || $maxAge === 0) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Du musst ein Maximalalter für den Wettkampf angeben.");
        }
        if ($minAge >= $maxAge) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Das Mindestalter muss echt kleiner als das Maximalalter sein.");
        }
        if ($minGraduation === null || $minGraduation === "") {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Du musst eine kleinste Graduierung angeben.");
        }
        if ($maxGraduation === null || $maxGraduation === "") {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Du musst eine höchste Graduierung angeben.");
        }

        $examinationTypes = array("Kata", "Kumite");

        if ($kihon) {
            array_push($examinationTypes, "Kihon");
        }

        if ($teams) {
            array_push($examinationTypes, "Teams");
        }

        $tournamentTemplate->tournament_name = $tournamentName;
        $tournamentTemplate->age_min = $minAge;
        $tournamentTemplate->age_max = $maxAge;
        $tournamentTemplate->graduation_min = $minGraduation;
        $tournamentTemplate->graduation_max = $maxGraduation;
        $tournamentTemplate->team = $teams;
        $tournamentTemplate->kihon = $kihon;
        $tournamentTemplate->examination_types = $examinationTypes;
        $tournamentTemplate->save();

        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Die Wettkampf-Vorlage \"" . $tournamentTemplate->tournament_name . "\" wurde erfolgreich geändert!");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TournamentTemplate  $tournamentTemplate
     * @return \Illuminate\Http\Response
     */
    public function destroy(TournamentTemplate $tournamentTemplate)
    {
        if ($tournamentTemplate === null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Diese Wettkampf-Vorlage existiert nicht in der Datenbank.");
        }
        $tournamentTemplateName = $tournamentTemplate->tournament_name;
        $tournamentTemplate->delete();
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Die Wettkampf-Vorlage \"" . $tournamentTemplateName . "\" wurde erfolgreich gelöscht.");
    }
}
