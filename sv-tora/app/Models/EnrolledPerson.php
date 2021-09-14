<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EnrolledPerson extends Model
{
    use HasFactory;

    protected $table = "enrolled_people";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "tournament_id",
        "person_id",
    ];

    public function tournament() {
        return $this->belongsTo(Tournament::class);
    }

    public function person() {
        return $this->belongsTo(Person::class);
    }

}
