<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Models\Category;
use App\Models\EnrolledFighter;
use App\Models\EnrolledTeam;
use App\Models\Fighter;
use App\Models\FightingSystem;
use App\Models\Team;
use App\Models\Tournament;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Pdf\Mpdf;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Tournament $tournament)
    {
        $enrollmentActive = false;
        if (Carbon::today() >= Carbon::parse($tournament->enrollment_start) && Carbon::today() <= Carbon::parse($tournament->enrollment_end)) {
            $enrollmentActive = true;
        }
        return response()->view("Tournament.category-administration", ["tournament" => $tournament, "enrollmentActive" => $enrollmentActive]);
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
        $newCategory = Category::create([
            "name" => $newCategoryName,
            "tournament_id" => $tournament->id,
            "examination_type" => $request->input("Prüfungsform"),
            "graduation_min" => $request->input("Mindest-Graduierung"),
            "graduation_max" => $request->input("Maximal-Graduierung"),
            "age_min" => $request->input("Mindestalter"),
            "age_max" => $request->input("Maximalalter"),
            "sex" => $request->input("Geschlecht"),
        ]);
        if ($newCategory->examination_type === "Team") {
            $fightingSystem = FightingSystem::firstWhere("name", "=", "Tafelsystem");
            $newCategory->fightingSystem()->associate($fightingSystem);
            $newCategory->prepared = true;
            $newCategory->save();
            app(FightingSystemController::class)->reinitializeFightingSystem($newCategory);
        }
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
     * @throws \PhpOffice\PhpSpreadsheet\Writer\Exception
     */
    public function printCategory(Tournament $tournament, Category $category) {
        if ($category->fighters->count() > 0) {
            $spreadsheetPath = base_path() . "/storage/app/public/categories/Kategorie_Teilnehmer_Kämpfer.xlsx";
        } else {
            $spreadsheetPath = base_path() . "/storage/app/public/categories/Kategorie_Teilnehmer_Teams.xlsx";
        }
        $reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
        $spreadsheet = $reader->load($spreadsheetPath);
        $sheet = $spreadsheet->getActiveSheet();

        # insert category data
        $sheet->setCellValue("E1", $category->name);
        $sheet->setCellValue("B3", $category->examination_type);
        $sheet->setCellValue("D3", $category->age_min . " - " . $category->age_max);
        $sheet->setCellValue("G3", $category->sex);
        if ($category->graduation_min === $category->graduation_max) {
            $sheet->setCellValue("I3", $category->graduation_min);
        } else {
            $sheet->setCellValue("I3", $category->graduation_min . " - " . $category->graduation_max);
        }

        # insert members
        $counter = 0;
        $row = 9;
        if ($category->fighters->count() > 0) {
            foreach ($category->fighters as $enrolledFighter) {
                $sheet->setCellValueExplicit("A" . $row, ++$counter, DataType::TYPE_STRING);
                $sheet->setCellValue("B" . $row, $enrolledFighter->fighter->person->first_name);
                $sheet->setCellValue("D" . $row, $enrolledFighter->fighter->person->last_name);
                $sheet->setCellValueExplicit("E" . $row, $enrolledFighter->fighter->age(), DataType::TYPE_STRING);
                $sheet->setCellValue("F" . $row, $enrolledFighter->fighter->sex);
                $sheet->setCellValue("G" . $row, $enrolledFighter->fighter->graduation);
                $sheet->setCellValue("I" . $row, $enrolledFighter->fighter->person->club->name);

                $row++;
            }
        } else {
            foreach ($category->teams as $enrolledTeam) {
                $sheet->setCellValueExplicit("A" . $row, ++$counter, DataType::TYPE_STRING);
                $sheet->setCellValue("B" . $row, $enrolledTeam->team->name);
                $sheet->setCellValueExplicit("D" . $row, $enrolledTeam->team->getHighestAge(), DataType::TYPE_STRING);
                $sheet->setCellValue("E" . $row, implode(", ", $enrolledTeam->team->fighters()->get()->map(function ($fighter) {
                    return $fighter->person->first_name . " " . $fighter->person->last_name;
                })->toArray()));
                $sheet->setCellValue("I" . $row, $enrolledTeam->team->club->name);

                $row++;
            }
        }

        # set amount of participants of category
        $sheet->setCellValue("J6", $counter);

        # create directories and set save path
        $fileName = "Kategorie -" . $category->name . "- Teilnehmer.pdf";
        $savePath = base_path() . "/storage/app/public/tournaments/" . $tournament->id . "/categories/" . $category->id . "/". $fileName;
        if (!is_dir(pathinfo($savePath, PATHINFO_DIRNAME))) {
            mkdir(pathinfo($savePath, PATHINFO_DIRNAME), 0777, true);
        }

        $writer = new Mpdf($spreadsheet);
        $writer->save($savePath);
        return Storage::download("/public/tournaments/" . $tournament->id . "/categories/" . $category->id . $fileName);
    }


    /**
     * This function returns the view to split a given $category into two new categories
     *
     * @param Tournament $tournament
     * @param Category $category
     * @return \Illuminate\Http\Response
     */
    public function prepareSplittingCategory(Tournament $tournament, Category $category) {
        if ($category->teams->count() > 0) {
            return response()->view("Tournament.split-team-category", ["tournament" => $tournament, "category" => $category]);
        }
        return response()->view("Tournament.split-fighter-category", ["tournament" => $tournament, "category" => $category]);
    }


    public function splitCategory(Request $request, Tournament $tournament, Category $category) {
        $categories = $request->input("categories");
        foreach($categories as $categoryName => $members) {
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
            foreach($members as $m) {
                if ($category->teams->count() > 0) {
                    $team = Team::find($m->id);
                    $newCategory->teams()->save($team);
                } else {
                    $fighter = Fighter::find($m->id);
                    $newCategory->fighters()->save($fighter);
                }
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
        if ($mergeCategory->examination_type !== $category->examination_type) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Die beiden Kategorien, die zusammengeführt werden sollen, haben unterschiedliche Disziplinen!");
        }
        $mergeCategory->fighters()->saveMany($category->fighters);
        $oldCategoryName = $category->name;
        $category->delete();
        app(FightingSystemController::class)->reinitializeFightingSystem($mergeCategory);
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Die Kategorie \"" . $oldCategoryName . "\" wurde erfolgreich mit der Kategorie \"" . $mergeCategory->name . "\" zusammen geführt. Die Seite läd in 5 Sekunden neu, um die Änderung anzuzeigen.");
    }


    public function selectFighters(Tournament $tournament, Category $category) {
        $rows = [];
        $counter = 1;

        foreach (Fighter::all() as $fighter) {
            $enrolledConfiguration = $fighter->enrolledConfigurations()->where("tournament_id", "=", $tournament->id)->first();
            if (!$category->fighters->contains($enrolledConfiguration)) {
                $row = [
                    "data" => $fighter->tableProperties($counter++),
                ];
                array_push($rows, $row);
            }
        }
        return view("Entities.select-entities", ["entities" => "Kämpfer", "addTo" => "Kategorie " . $category->name, "columns" => Fighter::tableHeadings(), "rows" => $rows, "addUrl" => url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/fighters"), "backUrl" => url()->previous("/tournaments/" . $tournament->id . "/categories")]);
    }

    public function selectTeams(Tournament $tournament, Category $category) {
        $rows = [];
        $counter = 1;

        foreach (Team::all() as $team) {
            $enrolledConfiguration = $team->enrolledTeams()->where("tournament_id", "=", $tournament->id)->first();
            if (!$category->teams->contains($enrolledConfiguration)) {
                $row = [
                    "data" => $team->tableProperties($counter++),
                ];
                array_push($rows, $row);
            }
        }
        return view("Entities.select-entities", ["entities" => "Teams", "addTo" => "Kategorie " . $category->name, "columns" => Team::tableHeadings(), "rows" => $rows, "addUrl" => url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/teams"), "backUrl" => url()->previous("/tournaments/" . $tournament->id . "/categories")]);
    }


    /**
     * This function adds selected fighters to the given category
     *
     * @param Request $request
     * @param Tournament $tournament
     * @param Category $category
     * @return false|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function addFighters(Request $request, Tournament $tournament, Category $category) {
        if ($category->teams->count() > 0) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Diese Kategorie enthält Teams. Kämpfer können demnach nicht hinzugefügt werden.");
        }
        $fighters = Fighter::join("people", "fighters.person_id", "=", "people.id")->join("clubs", "people.club_id", "=", "clubs.id")->select("fighters.*", "people.first_name", "people.last_name", "clubs.name as club_name")->get();
        foreach ($request["selected_entities"] as $fighterData) {
            $fighter = $fighters->where("first_name", "=", $fighterData["Vorname"])->where("last_name", "=", $fighterData["Nachname"])->where("sex", "=", $fighterData["Geschlecht"])->where("club_name", "=", $fighterData["Verein"])->where("graduation", "=", $fighterData["Graduierung"])->first();
            $enrolledConfiguration = $fighter->enrolledConfigurations()->where("tournament_id", "=", $tournament->id)->first();
            if ($category->fighters->contains($enrolledConfiguration)) {
                return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Der Kämpfer \"" . $fighter->person->fullName() . "\" existiert schon in dieser Kategorie und kann daher nicht hinzugefügt werden.");
            }

            $enrolledFighter = $fighter->enrolledConfigurations()->where("tournament_id", "=", $tournament->id)->first();
            if ($enrolledFighter === null) {
                $enrolledFighter = EnrolledFighter::create([
                    "fighter_id" => $fighter->id,
                    "tournament_id" => $tournament->id,
                ]);
            }
            $category->fighters()->attach($enrolledFighter->id);
        }
        app(FightingSystemController::class)->reinitializeFightingSystem($category);
        return json_encode(["redirectUrl" => url("/tournaments/" . $tournament->id . "/categories")]);
    }

    /**
     * This function adds selected teams to the given category
     *
     * @param Request $request
     * @param Tournament $tournament
     * @param Category $category
     * @return false|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function addTeams(Request $request, Tournament $tournament, Category $category) {
        if ($category->fighters->count() > 0) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Diese Kategorie enthält Kämpfer. Teams können demnach nicht hinzugefügt werden.");
        }
        $teams = Team::with("club")->get();
        foreach ($request["selected_entities"] as $teamData) {
            $team = $teams->where("name", "=", $teamData["Name"])->where("club.name", "=", $teamData["Verein"])->first();
            $enrolledTeam = $team->enrolledTeams()->where("tournament_id", "=", $tournament->id)->first();
            if ($category->teams->contains($enrolledTeam)) {
                return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Das Team \"" . $team->name . "\" existiert schon in dieser Kategorie und kann daher nicht hinzugefügt werden.");
            }

            $enrolledTeam = $team->enrolledTeams()->where("tournament_id", "=", $tournament->id)->first();
            if ($enrolledTeam === null) {
                $enrolledTeam = EnrolledTeam::create([
                    "team_id" => $team->id,
                    "tournament_id" => $tournament->id,
                ]);
            }

            $category->teams()->attach($enrolledTeam->id);
        }
        app(FightingSystemController::class)->reinitializeFightingSystem($category);
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
        if (!$category->fighters->contains($enrolledFighter)) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Der ausgewählte Kämpfer kann nicht entfernt werden, da er nicht in dieser Kategorie vorhanden ist.");
        }
        $fighterName = $enrolledFighter->fighter->person->fullName();
        $enrolledFighter->delete();
        app(FightingSystemController::class)->reinitializeFightingSystem($category);
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der Kämpfer \"" . $fighterName . "\" wurde aus der Kategorie entfernt.");
    }

    /**
     * This function removes a selected fighter from a given category
     *
     * @param Tournament $tournament
     * @param Category $category
     * @param EnrolledTeam $enrolledTeam
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function removeTeam(Tournament $tournament, Category $category, EnrolledTeam $enrolledTeam) {
        if (!$category->teams->contains($enrolledTeam)) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Das ausgewählte Team kann nicht entfernt werden, da es nicht in dieser Kategorie vorhanden ist.");
        }
        $teamName = $enrolledTeam->team->name;
        $enrolledTeam->delete();
        app(FightingSystemController::class)->reinitializeFightingSystem($category);
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Das Team \"" . $teamName . "\" wurde aus der Kategorie entfernt.");
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param Tournament $tournament
     * @param \App\Models\Category $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tournament $tournament, Category $category)
    {
        $categoryName = $category->name;
        $category->delete();
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Die Kategorie \"" . $categoryName . "\" wurde erfolgreich gelöscht.");
    }

    public function destroyAllEmptyCategories()
    {
        foreach (Category::all() as $category) {
            if ($category->fighters->count() === 0 && $category->teams->count() === 0) {
                $category->delete();
            }
        }
    }

}
