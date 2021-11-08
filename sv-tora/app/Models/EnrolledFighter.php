<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EnrolledFighter extends Model
{
    use HasFactory;

    protected $table = "enrolled_fighters";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "fighter_id",
        "tournament_id",
    ];

    public function fighter() {
        return $this->belongsTo(Fighter::class);
    }

    public function tournament() {
        return $this->belongsTo(Tournament::class);
    }

    public function categories() {
        return $this->belongsToMany(Category::class, "enrolled_fighter_category");
    }

}
