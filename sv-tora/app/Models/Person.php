<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    use HasFactory;

    protected $table = "people";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "type",
        "first_name",
        "last_name",
        "club_id"
    ];

    public function club() {
        return $this->belongsTo(Club::class);
    }

    public static function tableHeadings() {
        return [
            ["heading" => "Nr.", "sortable" => true],
            ["heading" => "Vorname", "sortable" => true],
            ["heading" => "Nachname", "sortable" => true],
            ["heading" => "Verein", "sortable" => true],
        ];
    }

    public function tableProperties($counter) {
        return [
            $counter,
            $this->first_name,
            $this->last_name,
            $this->club->name,
        ];
    }

}
