<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Models\Category;
use App\Models\Club;
use App\Models\EnrolledPerson;
use App\Models\EnrolledTeam;
use App\Models\FightingSystem;
use App\Models\Person;
use App\Models\Team;
use App\Models\Tournament;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class EnrolledTeamController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function index(Tournament $tournament)
    {
        $this->authorize("viewAny", [EnrolledTeam::class, $tournament]);

        $enrollmentActive = true;
        if (!Auth::user()->isAdmin()) {
            if (Carbon::today() <= Carbon::parse($tournament->enrollment_start) || Carbon::today() >= Carbon::parse($tournament->enrollment_end)) {
                $enrollmentActive = false;
            }
        }

        $user = Auth::user();
        $enrolledTeams = EnrolledTeam::with("team")
            ->where("tournament_id", "=", $tournament->id)
            ->get();
        if (!Gate::allows("admin")) {
            $enrolledTeams = $enrolledTeams->where("team.club_id", "=", $user->club->id);
        }

        $columns = [
            ["heading" => "Nr.", "sortable" => true],
            ["heading" => "Name", "sortable" => true],
            ["heading" => "Kategorie", "sortable" => true],
        ];

        if (Gate::allows("admin")) {
            $columns = array_merge($columns, [["heading" => "Verein", "sortable" => true]]);
        }

        $rows = [];
        $counter = 1;

        foreach ($enrolledTeams as $enrolledTeam) {
            $row = [
                "data" => [
                    $counter++,
                    $enrolledTeam->team->name,
                    implode(", ", $enrolledTeam->categories->pluck("name")->toArray()),
                ],
                "editUrl" => url("/entities/teams/" . $enrolledTeam->team->id),
                "deleteUrl" => url("/tournaments/" . $tournament->id . "/enrolled/teams/" . $enrolledTeam->id),
            ];
            if (Gate::allows("admin")) {
                $row["data"][] = $enrolledTeam->team->club->name;
            }
            $rows[] = $row;
        }
        return response()->view("Tournament.enrolled-fighters", ["tournament" => $tournament, "addUrl" => url("/tournaments/" . $tournament->id . "/enrolled/teams/add"), "entities" => "Teams", "entity" => "Team", "columns" => $columns, "rows" => $rows, "enrollmentActive" => $enrollmentActive]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function add(Tournament $tournament)
    {
        $this->authorize("add", [EnrolledTeam::class, $tournament]);

        $allEnrolledTeamIds = EnrolledTeam::all()->pluck("team_id");
        if (Gate::allows("admin")) {
            $selectableTeams = Team::all();
        } else {
            $selectableTeams = Team::where("club_id", "=", Auth::user()->club->id)->get();
        }
        $selectableTeams = $selectableTeams->reject(function ($team) use ($tournament, $allEnrolledTeamIds) {
            if ($team->getHighestAge(Carbon::parse($tournament->date)) < 8) {
                return true;
            }
            if ($team->getHighestAge(Carbon::parse($tournament->date)) > 17) {
                return true;
            }
            if ($allEnrolledTeamIds->contains($team->id)) {
                return true;
            }
            return false;
        });
        $rows = [];
        $counter = 1;

        foreach ($selectableTeams as $selectableTeam) {
            $row = [
                "data" => $selectableTeam->tableProperties($counter++),
            ];
            $rows[] = $row;
        }
        return response()->view("Tournament.enroll-entities", ["tournament" => $tournament, "enrollUrl" => url("/tournaments/" . $tournament->id . "/enrolled/teams"), "addEntityUrl" => url("/entities/teams"), "entities" => "Teams", "entity" => "Team", "columns" => Team::tableHeadings(), "rows" => $rows]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Tournament $tournament
     * @return \Illuminate\Http\Response
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function enroll(Request $request, Tournament $tournament)
    {
        $this->authorize("enroll", [EnrolledTeam::class, $tournament]);

        foreach ($request["selected_entities"] as $selectedEntity) {
            $club = Club::firstWhere("name", "=", $selectedEntity["Verein"]);
            if (!Gate::allows("admin") && $club != Auth::user()->club) {
                return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Eine oder mehrere der ausgewählten Teams kannst du nicht hinzufügen.");
            }
            $name = $selectedEntity["Name"];
            $team = Team::where("name", "=", $name)
                ->where("club_id", "=", $club->id)
                ->first();
            if ($team === null) {
                return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Das Team \"" . $name . "\" existiert nicht und kann daher nicht angemeldet werden.");
            }
            $enrolledTeam = EnrolledTeam::create([
                "tournament_id" => $tournament->id,
                "team_id" => $team->id,
            ]);
            $categoryName = GeneralHelper::determineCategoryOfTeam($team);
            $category = Category::firstWhere("name", "=", $categoryName);
            if ($category === null) {
                $category = Category::createCategoryByName($categoryName, $tournament);
            }
            $category->teams()->attach($enrolledTeam->id);

            if (!$category->prepared) {
                $fightingSystem = FightingSystem::firstWhere("name", "=", "Tafelsystem");
                $category->fightingSystem()->associate($fightingSystem);

                $category->prepared = true;
                $category->save();
            }

            app(FightingSystemController::class)->reinitializeFightingSystem($category);

        }
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Alle ausgewählten Teams wurden zum Wettkampf angemeldet.");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function destroy(Tournament $tournament, EnrolledTeam $enrolledTeam)
    {
        $this->authorize("delete", [EnrolledTeam::class, $tournament, $enrolledTeam]);

        if ($enrolledTeam === null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Das gegebene Team existiert nicht und kann daher nicht vom Wettkampf entfernt werden.");
        }
        $teamName = $enrolledTeam->team->name;
        $affectedCategories = $enrolledTeam->categories;
        if ($enrolledTeam->delete()) {
            foreach ($affectedCategories as $affectedCategory) {
                app(FightingSystemController::class)->reinitializeFightingSystem($affectedCategory);
            }
            return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Das Team mit dem Namen \"" . $teamName . "\" wurde erfolgreich vom Wettkampf abgemeldet.");
        } else {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Leider konnte das Team mit dem Namen \"" . $teamName . "\" nicht vom Wettkampf abgemeldet werden.");
        }
    }

}
