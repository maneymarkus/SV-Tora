<?php

namespace App\Models;

use App\Helper\GeneralHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TournamentTemplate extends Model
{
    use HasFactory;

    protected $table = "tournament_templates";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "tournament_name",
        "age_min",
        "age_max",
        "graduation_min",
        "graduation_max",
        "teams",
        "kihon",
        "examination_types",
    ];

    public static function editableProperties(TournamentTemplate $tournamentTemplate = null) {
        $editableProperties = [
            "Wettkampf-Name" => $tournamentTemplate?->tournament_name,
            "Mindestalter" => GeneralHelper::addOtherChoosableOptions("age", $tournamentTemplate?->age_min),
            "Maximalalter" => GeneralHelper::addOtherChoosableOptions("age", $tournamentTemplate?->age_max),
            "Mindest-Graduierung" => GeneralHelper::addOtherChoosableOptions("graduations", $tournamentTemplate?->graduation_min),
            "Maximal-Graduierung" => GeneralHelper::addOtherChoosableOptions("graduations", $tournamentTemplate?->graduation_max),
            "Teams" => $tournamentTemplate?->teams,
            "Kihon" => $tournamentTemplate?->kihon,
        ];

        return $editableProperties;
    }

}
