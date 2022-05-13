<?php

namespace App\Models;

use App\Helper\Categories;
use App\Helper\FightingSystems\BrazilianKOSystem;
use App\Helper\FightingSystems\DogEatDog;
use App\Helper\FightingSystems\DoubleKOSystem;
use App\Helper\FightingSystems\DoubleKOSystemWithFinalTables;
use App\Helper\FightingSystems\KOSystem;
use App\Helper\FightingSystems\KOSystemWithFinalTables;
use App\Helper\FightingSystems\Tables;
use App\Helper\GeneralHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = "categories";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "name",
        "tournament_id",
        "examination_type",
        "graduation_min",
        "graduation_max",
        "age_min",
        "age_max",
        "sex",
        "prepared",
        "fighting_system_id",
        "estimated_required_time_in_seconds",
        "fight_place_id",
        "rank",
        "fighting_system_configuration",
    ];

    protected $casts = [
        "fighting_system_configuration" => "array",
    ];

    public function tournament() {
        return $this->belongsTo(Tournament::class);
    }

    public function fighters() {
        return $this->belongsToMany(EnrolledFighter::class, "enrolled_fighter_category", "category_id", "enrolled_fighter_id");
    }

    public function teams() {
        return $this->belongsToMany(EnrolledTeam::class, "enrolled_team_category", "category_id", "enrolled_team_id");
    }

    public function fightingSystem() {
        return $this->belongsTo(FightingSystem::class);
    }

    public function entities() {
        if ($this->fighters->count() > 0) {
            return $this->fighters();
        }
        if ($this->teams->count() > 0) {
            return $this->teams();
        }
        return null;
    }

    public static function editableProperties(Category $category = null) {
        $editableProperties = [
            "Name" => $category?->name,
            "Prüfungsform" => GeneralHelper::addOtherChoosableOptions("examination_type", $category?->examination_type),
            "Mindest-Graduierung" => GeneralHelper::addOtherChoosableOptions("graduations", $category?->gratudation_min),
            "Maximal-Graduierung" => GeneralHelper::addOtherChoosableOptions("graduations", $category?->gratudation_max),
            "Mindestalter" => GeneralHelper::addOtherChoosableOptions("age", $category?->age_min),
            "Maximalalter" => GeneralHelper::addOtherChoosableOptions("age", $category?->age_max),
            "Geschlecht" => GeneralHelper::addOtherChoosableOptions("sex", $category?->sex),
        ];

        return $editableProperties;
    }

    /**
     * @throws \Exception
     */
    public static function createCategoryByName(string $categoryName, Tournament $tournament) {
        if (!array_key_exists($categoryName, Categories::CATEGORIES)) {
            throw new \Exception("Diese Kategorie \"" . $categoryName . "\" ist nicht definiert.");
        }
        $categoryConfig = Categories::CATEGORIES[$categoryName];
        $category = Category::create([
            "name" => $categoryName,
            "tournament_id" => $tournament->id,
            "examination_type" => $categoryConfig["examination_type"],
            "graduation_min" => $categoryConfig["graduation_min"],
            "graduation_max" => $categoryConfig["graduation_max"],
            "age_min" => $categoryConfig["age_min"],
            "age_max" => $categoryConfig["age_max"],
            "sex" => $categoryConfig["sex"],
        ]);
        return $category;
    }

    /**
     * Calculates the estimated required time to execute this category on the basis of the currently assigned fighters
     *
     * @throws \Exception
     */
    public function calculateEstimatedTime() {
        $countFighters = $this->fighters->count();
        $countFights = 0;
        $timePerFightInSeconds = GlobalSetting::find(1)->fight_time_in_seconds;

        # add padding before actual fight:
        $estimatedTimeInSeconds = 150;
        switch ($this->fightingSystem->name) {
            case "Jeder-Gegen-Jeden":
                for ($i = $countFighters - 1; $i > 0; $i--) {
                    $countFights += $i;
                }
                break;
            case "KO-System":
                # fighting tree contains $countFighters - 1 fights but there is an extra fight about 3. place
                $countFights = $countFighters;
                break;
            case "Doppel-KO-System":
                # regular fighting tree
                $countFights = $countFighters - 1;
                # consolation round is another fighting tree with only the losers (except the loser of the finale) of the regular fighting tree
                $countFights += $countFighters - 2 - 1;
                # extra fight about 2. place
                $countFights += 1;
                break;
            case "Tafelsystem":
                $countFights = $countFighters > 12 ? 3 : 2;
                break;
            case "KO-System mit finalen Tafeln":
                # reduce fighters to 4 remaining fighters with regular fighting tree
                $countFights = $countFighters - 1 - 3;
                # add one round of tables
                $countFights++;
                break;
            case "Doppel-KO-System mit finalen Tafeln":
                # reduce to two remaining fighters with regular remaining tree -> all losers in consolation round
                $countFights = $countFighters - 1 - 1;
                # reduce to two remaining fighters in consolation round
                $countFights += $countFighters - 2 - 1 - 1;
                # add one round of tables
                $countFights++;
                break;
            case "Brasilianisches KO-System":
                # regular fighting tree
                $countFights = $countFighters - 1;
                # every fighter that lost to one of the final fighters will participate in the consolation round
                $countConsolationFights = log($countFighters) / log(2);
                $countFights += ceil($countConsolationFights);
                break;
            default:
                throw new \Exception("Unbekanntes Kampfsystem: " . $this->fightingSystem->name);
        }
        # add padding after actual fight:
        $estimatedTimeInSeconds += 150;

        $estimatedTimeInSeconds += $countFights * $timePerFightInSeconds;
        $this->estimated_required_time_in_seconds = $estimatedTimeInSeconds;
        $this->save();
    }

    public function calculateDisplayHeight() {
        if ($this->estimated_required_time_in_seconds === null) {
            $this->calculateEstimatedTime();
        }

        $timeInMinutes = ceil($this->estimated_required_time_in_seconds / 60);
        $heightInEm = $timeInMinutes * config("global.ONE_MINUTE_LENGTH");

        return $heightInEm;

    }

    public function getFightingSystem(): ?\App\Helper\FightingSystems\FightingSystem {
        if (!$this->prepared) {
            return null;
        }
        $fightingSystem = match ($this->fightingSystem->name) {
            "Jeder-Gegen-Jeden" => new DogEatDog($this),
            "Tafelsystem" => new Tables($this),
            "KO-System" => new KOSystem($this),
            "Doppel-KO-System" => new DoubleKOSystem($this),
            "KO-System mit finalen Tafeln" => new KOSystemWithFinalTables($this),
            "Doppel-KO-System mit finalen Tafeln" => new DoubleKOSystemWithFinalTables($this),
            "Brasilianisches KO-System" => new BrazilianKOSystem($this),
            default => null,
        };
        return $fightingSystem;
    }

}
