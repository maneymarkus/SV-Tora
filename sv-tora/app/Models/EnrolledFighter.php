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
        "enrolled_person_id",
        "kumite",
        "kata",
        "kumite_category",
    ];

    public function enrolledPerson() {
        return $this->belongsTo(Person::class);
    }

    public function categories() {
        return $this->belongsToMany(Category::class, "categories_enrolled_fighters");
    }

}
