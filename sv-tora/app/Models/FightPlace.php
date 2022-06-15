<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FightPlace extends Model
{
    use HasFactory;

    protected $table = "fight_places";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "tournament_id",
        "name",
        "breaks",
    ];

    protected $casts = [
        "breaks" => "array",
    ];

    public function tournament() {
        return $this->belongsTo(Tournament::class);
    }

    public function categories() {
        return $this->hasMany(Category::class);
    }

    public static function editableProperties(FightPlace $fightPlace = null) {
        $editableProperties = [
            "Name" => $fightPlace?->name,
        ];

        return $editableProperties;
    }

    public function calculateTimeInSeconds(): int
    {
        $time = 0;
        foreach ($this->categories as $category) {
            $time += $category->estimated_required_time_in_seconds;
        }
        if ($this->breaks !== null) {
            foreach ($this->breaks as $break) {
                $time += $break["duration"] * 60;
            }
        }
        return $time;
    }

}
