<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FightingSystem extends Model
{
    use HasFactory;

    protected $table = "fighting_systems";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "name",
        "min_fighters",
        "max_fighters",
    ];

    public function categories() {
        return $this->hasMany(Category::class);
    }

}
