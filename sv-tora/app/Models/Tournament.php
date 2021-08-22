<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tournament extends Model
{
    use HasFactory;

    protected $table = "tournaments";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "tournament_template_id",
        "date",
        "enrollment_start",
        "enrollment_end",
    ];

    public static function editableProperties(Tournament $tournament = null) {
        $date = $tournament !== null ? Carbon::parse($tournament->date)->format("d.m.Y") : null;
        $enrollmentStart = $tournament !== null ? Carbon::parse($tournament->enrollment_start)->format("d.m.Y") : null;
        $enrollmentEnd = $tournament !== null ? Carbon::parse($tournament->enrollment_end)->format("d.m.Y") : null;

        $editableProperties = [
            "Wettkampf-Vorlage" => $tournament?->tournament_template->name,
            "Datum" => $date,
            "Anmeldezeitraum Start" => $enrollmentStart,
            "Anmeldezeitraum Ende" => $enrollmentEnd,
        ];

        return $editableProperties;
    }

}
