<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class Club extends Model
{
    use HasFactory;

    protected $table = "clubs";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "name"
    ];

    public function users() {
        return $this->hasMany(User::class);
    }

    public function members() {
        return $this->hasMany(Person::class);
    }

    public function teams() {
        return $this->hasMany(Team::class);
    }

    public function fighters() {
        return $this->hasManyThrough(Fighter::class, Person::class);
    }

    public static function tableHeadings() {
        return [
            ["heading" => "Nr.", "sortable" => true],
            ["heading" => "Name", "sortable" => true],
            ["heading" => "Mitglieder", "sortable" => false],
            ["heading" => "Teams", "sortable" => false],
        ];
    }

    public function tableProperties($counter) {
        return [
            $counter,
            $this->name,
            "<a class='link' href='" . url("/entities/clubs/" . $this->id . "/fighters") . "'>Mitglieder</a>",
            "<a class='link' href='" . url("/entities/clubs/" . $this->id . "/teams") . "'>Teams</a>",
        ];
    }

    public static function getClub($clubName = null) {
        if (!Gate::allows("admin") || $clubName === null) {
            $club = Auth::user()->club;
        } else {

            $club = Club::where("name", "=", $clubName)->first();
        }
        return $club;
    }

}
