<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnrolledTeam extends Model
{

    protected $table = "enrolled_teams";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "team_id",
        "tournament_id",
    ];

    public function team() {
        return $this->belongsTo(Team::class);
    }

    public function tournament() {
        return $this->belongsTo(Tournament::class);
    }

    public function categories() {
        return $this->belongsToMany(Category::class, "enrolled_team_category", "enrolled_team_id", "category_id");
    }

}
