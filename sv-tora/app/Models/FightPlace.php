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
    ];

    public function tournament() {
        return $this->belongsTo(Tournament::class);
    }

    public static function editableProperties(FightPlace $fightPlace = null) {
        $editableProperties = [
            "Name" => $fightPlace?->name,
        ];

        return $editableProperties;
    }

}
