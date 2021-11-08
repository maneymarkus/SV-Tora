<?php

namespace App\Models;

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
        "graduation",
        "age_start",
        "age_end",
        "sex",
    ];

    public function tournament() {
        return $this->belongsTo(Tournament::class);
    }

    public function fighters() {
        return $this->belongsToMany(EnrolledFighter::class, "enrolled_fighter_category");
    }

    public static function editableProperties(Category $category = null) {
        $editableProperties = [
            "Name" => $category?->name,
            "Prüfungsform" => GeneralHelper::addOtherChoosableOptions("examination_type", $category?->examination_type),
            "Graduierung" => GeneralHelper::addOtherChoosableOptions("graduations", $category?->gratudation),
            "Mindestalter" => GeneralHelper::addOtherChoosableOptions("age", $category?->age),
            "Maximalalter" => GeneralHelper::addOtherChoosableOptions("age", $category?->age),
            "Geschlecht" => GeneralHelper::addOtherChoosableOptions("sex", $category?->sex),
        ];

        return $editableProperties;
    }

}
