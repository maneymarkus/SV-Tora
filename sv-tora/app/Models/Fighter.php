<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fighter extends Model
{
    use HasFactory;

    protected $table = "fighters";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "birthdate",
        "sex",
        "graduation",
        "person_id",
    ];

    public function person() {
        return $this->belongsTo(Person::class);
    }

    public function teams() {
        return $this->belongsToMany(Team::class);
    }

    public static function tableHeadings() {
        return [
            ["heading" => "Nr.", "sortable" => true],
            ["heading" => "Vorname", "sortable" => true],
            ["heading" => "Nachname", "sortable" => true],
            ["heading" => "Alter", "sortable" => true],
            ["heading" => "Geschlecht", "sortable" => true],
            ["heading" => "Graduierung", "sortable" => true],
            ["heading" => "Verein", "sortable" => true],
        ];
    }

    public function tableProperties($counter) {
        $age = Carbon::parse($this->birthdate)->age;
        return [
            $counter,
            $this->person->first_name,
            $this->person->last_name,
            $age,
            $this->sex,
            $this->graduation,
            $this->person->club->name,
        ];
    }

}
