<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Models\Club;
use App\Models\Tournament;
use App\Models\TournamentTemplate;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class TournamentController extends Controller
{

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Tournament::class, 'tournament');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tournament  $tournament
     * @return \Illuminate\Http\Response
     */
    public function dashboard()
    {
        if (Tournament::latest()->first()?->active) {
            $tournament = Tournament::latest()->first();
            $progressStep = $tournament->status;
            $enrollment = "disabled";
            if (Carbon::today() >= Carbon::parse($tournament->enrollment_start) && Carbon::today() <= Carbon::parse($tournament->enrollment_end)) {
                $enrollment = null;
            }
            if (Gate::allows("admin")) {
                // TODO: urls
                return response()->view("Tournament.tournament-admin-dashboard", [
                    "tournament" => $tournament,
                    "progressStep" => $progressStep,
                    "changeTournamentStatusUrl" => url("/tournaments/" . $tournament->id . "/status"),
                    "deleteTournamentUrl" => url("/tournaments/" . $tournament->id),
                    "changeTournamentUrl" => url("/tournaments/" . $tournament->id),
                    "changeCategoriesUrl" => url("/tournaments/" . $tournament->id . "/categories"),
                    "changeFightingSystemsUrl" => url("/tournaments/" . $tournament->id . "/edit"),
                    "changeFightingPlacesUrl" => url("/tournaments/" . $tournament->id . "/fight-places"),
                    "changeScheduleUrl" => url("/tournaments/" . $tournament->id . "/edit"),
                    "completeTournamentUrl" => url("/tournaments/" . $tournament->id . "/finish"),
                    "excludeClubsUrl" => url("/tournaments/" . $tournament->id),
                    "enrollment" => $enrollment,
                ]);
            } else {
                return response()->view("Tournament.tournament-dashboard", ["tournament" => $tournament, "progressStep" => $progressStep, "enrollment" => $enrollment]);
            }
        } else {
            if (Gate::allows("admin")) {
                return response()->view("Tournament.no-tournament");
            } else {
                return redirect()->route("dashboard");
            }
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create()
    {
        return response()->json(
            Tournament::editableProperties(),
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $tournamentTemplate = TournamentTemplate::where("tournament_name", "=", $request->input("Wettkampf-Vorlage"))->first();
        $tournamentDate = Carbon::parse($request->input("Datum"));
        $tournamentTime = Carbon::parse($request->input("Uhrzeit"));
        $place = $request->input("Ort");
        $enrollmentStart = Carbon::parse($request->input("Anmeldezeitraum Start"));
        $enrollmentEnd = Carbon::parse($request->input("Anmeldezeitraum Ende"));
        $today = Carbon::today();

        if ($tournamentTemplate === null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Diese Wettkampf-Vorlage: " . $request->input("Wettkampf-Vorlage") . " existiert nicht.");
        }

        if ($tournamentDate <= $today) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Der Wettkampf muss in der Zukunft stattfinden!");
        }

        if ($enrollmentStart >= $enrollmentEnd) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Der Anmeldezeitraum muss ein valides Zeitintervall ergeben. Der Start muss also mindestens 1 Tag vor dem Ende des Anmeldezeitraums liegen.");
        }

        if ($enrollmentEnd >= $tournamentDate) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Der Anmeldezeitraum muss vor dem eigentlichen Wettkampf-Tag beendet sein.");
        }

        $mins = intval($tournamentTime->format("i"));

        if ($mins !== 0 && $mins !== 15 && $mins !== 30 && $mins !== 45) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Bitte wähle eine andere Startzeit. Gültige Uhrzeiten sind glatte Stunden oder viertelstündliche Intervalle (also zum Beispiel 12:00, 12:15, 12:30 und 12:45).");
        }

        $newTournament = Tournament::create([
            "tournament_template_id" => $tournamentTemplate->id,
            "date" => $tournamentDate->format("Y-m-d"),
            "time" => $tournamentTime->format("H:i:s"),
            "place" => $place,
            "enrollment_start" => $enrollmentStart->format("Y-m-d"),
            "enrollment_end" => $enrollmentEnd->format("Y-m-d"),
            "additional_information" => $request->input("Zusätzliche Informationen"),
        ]);

        $fightPlace = $newTournament->fightPlaces()->create([
            "name" => "1",
        ]);

        if ($enrollmentStart <= $today) {
            $newTournament->status = 1;
            $newTournament->save();
        }

        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der Wettkampf wurde erfolgreich angelegt.");

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tournament  $tournament
     * @return \Illuminate\Http\Response
     */
    public function show(Tournament $tournament)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tournament  $tournament
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Tournament $tournament)
    {
        if ($tournament->active) {
            if ($tournament->status == 4) {
                return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Du kannst den aktuellen Wettkampfes nicht mehr ändern, da dieser Wettkampf bereits durchgeführt wurde. Schließe den Wettkampf ab und erstelle einen neuen.");
            }

            $editableProperties = Tournament::editableProperties($tournament);
            unset($editableProperties["Wettkampf-Vorlage"]);
            return response()->json(
                $editableProperties,
            );
        } else {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Durchgeführte Wettkämpfe dürfen/können nicht mehr verändert werden.");
        }
    }

    public function editTournamentStatus(Tournament $tournament) {
        $this->authorize("onlyAdmin", Tournament::class);

        if ($tournament->status == 4) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Du kannst den Status des aktuellen Wettkampfes nicht mehr ändern, da dieser Wettkampf bereits durchgeführt wurde. Schließe den Wettkampf ab und erstelle einen neuen.");
        }

        $statusCode = $tournament->status;
        $status = config("tournament.tournament_statuus")[$statusCode];
        return [
            "Wettkampf-Status" => GeneralHelper::addOtherChoosableOptions("tournament_status", $status),
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tournament  $tournament
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tournament $tournament)
    {
        $tournamentTemplate = TournamentTemplate::where("tournament_name", "=", $request->input("Wettkampf-Vorlage"))->first();
        $tournamentDate = Carbon::parse($request->input("Datum"));
        $tournamentTime = Carbon::parse($request->input("Uhrzeit"));
        $place = $request->input("Ort");
        $enrollmentStart = Carbon::parse($request->input("Anmeldezeitraum Start"));
        $enrollmentEnd = Carbon::parse($request->input("Anmeldezeitraum Ende"));
        $today = Carbon::today();

        if ($tournamentTemplate !== null && $tournamentTemplate !== $tournamentTemplate->tournamentTemplate) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Die Wettkampf-Vorlage kann nach dem Erstellen eines Wettkampfes nicht mehr geändert werden. Wenn du einen anderen Wettkampf veranstalten möchtest, dann lösche bitte diesen Wettkampf und erstelle danach einen neuen.");
        }

        if ($tournamentDate <= $today) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Der Wettkampf muss weiterhin in der Zukunft stattfinden!");
        }

        if ($enrollmentStart >= $enrollmentEnd) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Der Anmeldezeitraum muss ein valides Zeitintervall ergeben. Der Start muss also mindestens 1 Tag vor dem Ende des Anmeldezeitraums liegen.");
        }

        if ($enrollmentEnd >= $tournamentDate) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Der Anmeldezeitraum muss vor dem eigentlichen Wettkampf-Tag beendet sein.");
        }

        $mins = intval($tournamentTime->format("i"));

        if ($mins !== 0 && $mins !== 15 && $mins !== 30 && $mins !== 45) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Bitte wähle eine andere Startzeit. Gültige Uhrzeiten sind glatte Stunden oder viertelstündliche Intervalle (also zum Beispiel 12:00, 12:15, 12:30 und 12:45).");
        }

        $tournament->date = $tournamentDate->format("Y-m-d");
        $tournament->time = $tournamentTime->format("H:i:s");
        $tournament->place = $place;
        $tournament->enrollment_start = $enrollmentStart->format("Y-m-d");
        $tournament->enrollment_end = $enrollmentEnd->format("Y-m-d");
        $tournament->additional_information = $request->input("Zusätzliche Informationen");
        $tournament->save();

        // update tournament status
        if ($enrollmentStart == $today) {
            $tournament->status = 1;
            $tournament->save();
        }

        if ($enrollmentEnd < $today) {
            $tournament->status = 2;
            $tournament->save();
        }

        return response()->json([
            "url" => url("/mail/tournament-change-information/" . $tournament->id),
        ]);
    }

    public function updateTournamentStatus(Request $request, Tournament $tournament) {
        $this->authorize("onlyAdmin", Tournament::class);

        $status = $request->input("Wettkampf-Status");
        $statusCode = array_search($status, config("tournament.tournament_statuus"));
        $tournament->status = $statusCode;

        if ($statusCode >= 1) {
            // enrollment is open so the enrollment date should be set to this date if not
            if (Carbon::parse($tournament->enrollment_start) > Carbon::today()) {
                $tournament->enrollment_start = Carbon::today()->format("Y-m-d");
            }
        }
        if ($statusCode >= 2) {
            if (Carbon::parse($tournament->enrollment_end) > Carbon::today()) {
                $tournament->enrollment_end = Carbon::today()->subDay()->format("Y-m-d");
            }
        }

        $tournament->save();

        // update tournament properties
        if ($tournament->status === 1) {
            $today = Carbon::today();
            $tournament->enrollment_start = $today->format("Y-m-d");
        }

        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der Wettkampf Status wurde erfolgreich geändert. Die Seite lädt gleich neu, um den neuen Status anzuzeigen.");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tournament  $tournament
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tournament $tournament)
    {
        $tournamentName = $tournament->tournamentTemplate->tournament_name;
        $tournamentDate = Carbon::parse($tournament->date);
        if ($tournament->active) {
            $tournament->delete();
            return response()->json([
                "url" => url("/mail/tournament-cancellation-information"),
            ]);
        } else {
            $tournament->delete();
            return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der \"" . $tournamentName . "\" Wettkampf vom \"" . $tournamentDate->format("d.m.Y") . "\" wurde erfolgreich gelöscht.");
        }
    }


    /**
     * This function finishes a given tournament. This means, the active status of the tournament will be set to false.
     * This can obviously only be done when the status of the tournament is 4 (see config)
     *
     * @param Tournament $tournament
     */
    public function finishTournament(Tournament $tournament) {
        if ($tournament->active) {
            if ($tournament->status == 4) {
                $tournament->active = false;
                $tournament->save();
                return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der Wettkampf wurde erfolgreich beendet.");
            } else {
                return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Der Wettkampf kann noch nicht abgeschlossen werden.");
            }
        } else {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Dieser Wettkampf kann nicht nochmal beendet werden.");
        }
    }


    /**
     * This function excludes a given $club from the given $tournament
     *
     * @param Request $request
     * @param Tournament $tournament
     */
    public function excludeClub(Request $request, Tournament $tournament) {
        if (Gate::allows("admin")) {
            if ($tournament->active) {
                // TODO: if club to be excluded already enrolled
                $club = Club::where("name", "=", $request->input("club"))->first();
                if (!$tournament->excludedClubs->contains($club)) {
                    $tournament->excludedClubs()->attach($club->id);
                    return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der Verein \"" . $club->name . "\" wurde erfolgreich vom aktuellen Wettkampf ausgeschlossen.");
                } else {
                    return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Dieser Verein ist schon ausgeschlossen.");
                }
            } else {
                return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Durchgeführte Wettkämpfe dürfen nicht mehr verändert werden!");
            }
        } else {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Du darfst Vereine von Wettkämpfen nicht ausschließen.");
        }
    }


    /**
     * This function includes a formerly excluded $club again
     *
     * @param Request $request
     * @param Tournament $tournament
     */
    public function includeClub(Request $request, Tournament $tournament) {
        if (Gate::allows("admin")) {
            if ($tournament->active) {
                $club = Club::where("name", "=", $request->input("club"))->first();
                if ($tournament->excludedClubs->contains($club)) {
                    $tournament->excludedClubs()->detach($club->id);
                    return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der Verein \"" . $club->name . "\" wurde erfolgreich wieder eingeschlossen und kann Personen zum aktuellen Wettkampf anmelden.");
                } else {
                    return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Dieser Verein ist nicht ausgeschlossen und kann demnach auch nicht wieder eingeschlossen werden.");
                }
            } else {
                return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Durchgeführte Wettkämpfe dürfen nicht mehr verändert werden!");
            }
        } else {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Du darfst von Wettkämpfen ausgeschlossene Vereine nicht wieder einschließen.");
        }
    }


    /**
     * This function returns all the currently excluded clubs from the given $tournament
     *
     * @param Tournament $tournament
     * @return \Illuminate\Http\JsonResponse
     */
    public function getExcludedClubs(Tournament $tournament) {
        if (Gate::allows("admin")) {
            return response()->json($tournament->excludedClubs->pluck("name"));
        }
    }


    /**
     * This function returns all the currently enrolled clubs at the given $tournament
     *
     * @param Tournament $tournament
     */
    public function getEnrolledClubs(Tournament $tournament) {
        if (Gate::allows("admin")) {
            // TODO
            return [];
        }
    }

}
