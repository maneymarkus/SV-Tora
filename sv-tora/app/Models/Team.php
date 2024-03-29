<?php

namespace App\Models;

use App\Helper\GeneralHelper;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class Team extends Model
{
    use HasFactory;

    protected $table = "teams";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "name",
        "club_id"
    ];

    public function club() {
        return $this->belongsTo(Club::class);
    }

    public function fighters() {
        return $this->belongsToMany(Fighter::class);
    }

    public function enrolledTeams() {
        return $this->hasMany(EnrolledTeam::class);
    }

    public function getHighestAge(Carbon $date = null) {
        if ($date === null) {
            $date = Carbon::today();
        }
        $maxAge = 0;
        foreach ($this->fighters as $fighter) {
            if ($fighter->age($date) > $maxAge) {
                $maxAge = $fighter->age($date);
            }
        }
        return $maxAge;
    }

    public static function editableProperties(Team $team = null) {
        $editableProperties = [
            "Name" => $team?->name,
        ];

        if (Gate::allows("admin")) {
            $editableProperties = array_merge($editableProperties, ["Verein" => GeneralHelper::addOtherChoosableOptions("clubs", $team?->club->name)]);
        }

        return $editableProperties;
    }

    public static function tableHeadings() {
        $tableHeadings = [
            ["heading" => "Nr.", "sortable" => true],
            ["heading" => "Name", "sortable" => true],
            ["heading" => "Mitglieder", "sortable" => true],
        ];
        if (Gate::allows("admin")) {
            array_push($tableHeadings, ["heading" => "Verein", "sortable" => true]);
        }
        return $tableHeadings;
    }

    public function tableProperties($counter) {
        $tableProperties = [
            $counter,
            $this->name,
            "<a class='link' href='" . url("/entities/teams/" . $this->id . "/fighters") . "'>Mitglieder</a>",
        ];
        if (Gate::allows("admin")) {
            array_push($tableProperties, $this->club->name);
        }
        return $tableProperties;
    }

}
