<?php

namespace App\Models;

use App\Helper\GeneralHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

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

    public function fighter() {
        return $this->hasOne(Fighter::class);
    }

    public function enrolledPerson() {
        return $this->hasOne(EnrolledPerson::class);
    }

    public static function editableProperties(Person $person = null) {
        $editableProperties = [
            "Vorname" => $person?->first_name,
            "Nachname" => $person?->last_name,
        ];

        if (Auth::user()->isAdmin()) {
            $editableProperties = array_merge($editableProperties, ["Verein" => GeneralHelper::addOtherChoosableOptions("clubs", $person?->club->name)]);
        }

        return $editableProperties;
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
