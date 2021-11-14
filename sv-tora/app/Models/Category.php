<?php

namespace App\Models;

use App\Helper\Categories;
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
    ];

    public function tournament() {
        return $this->belongsTo(Tournament::class);
    }

    public function fighters() {
        return $this->belongsToMany(EnrolledFighter::class, "enrolled_fighter_category");
    }

    public function teams() {
        return $this->belongsToMany(EnrolledTeam::class, "enrolled_team_category");
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

}
