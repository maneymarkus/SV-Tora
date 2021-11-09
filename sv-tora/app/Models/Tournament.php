<?php

namespace App\Models;

use App\Helper\GeneralHelper;
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
        "time",
        "place",
        "enrollment_start",
        "enrollment_end",
        "active",
        "status",
        "additional_info",
    ];

    public function tournamentTemplate() {
        return $this->belongsTo(TournamentTemplate::class);
    }

    public function enrolledPeople() {
        return $this->hasMany(EnrolledPerson::class);
    }

    public function categories() {
        return $this->hasMany(Category::class);
    }

    public function fightPlaces() {
        return $this->hasMany(FightPlace::class);
    }

    public function excludedClubs() {
        return $this->belongsToMany(Club::class, "excluded_clubs");
    }

    public static function editableProperties(Tournament $tournament = null) {
        $date = $tournament !== null ? Carbon::parse($tournament->date)->format("d.m.Y") : null;
        $time = $tournament !== null ? Carbon::parse($tournament->time)->format("H:i") : null;
        $enrollmentStart = $tournament !== null ? Carbon::parse($tournament->enrollment_start)->format("d.m.Y") : null;
        $enrollmentEnd = $tournament !== null ? Carbon::parse($tournament->enrollment_end)->format("d.m.Y") : null;

        $editableProperties = [
            "Wettkampf-Vorlage" => GeneralHelper::addOtherChoosableOptions("tournament_templates", $tournament?->tournamentTemplate->tournament_name),
            "Datum" => $date,
            "Uhrzeit" => $time,
            "Ort" => $tournament?->place,
            "Anmeldezeitraum Start" => $enrollmentStart,
            "Anmeldezeitraum Ende" => $enrollmentEnd,
            "Zusätzliche Informationen" => $tournament?->additional_information,
        ];

        return $editableProperties;
    }

}
