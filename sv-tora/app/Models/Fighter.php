<?php

namespace App\Models;

use App\Helper\GeneralHelper;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

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

    public static function editableProperties(Fighter $fighter = null) {
        $editableProperties = Person::editableProperties($fighter?->person);

        $editableProperties = array_merge($editableProperties, [
            "Alter" => $fighter?->birthdate,
            "Geschlecht" => GeneralHelper::addOtherChoosableOptions("sex", $fighter?->sex),
            "Graduierung" => GeneralHelper::addOtherChoosableOptions("graduations", $fighter?->graduation),
        ]);

        if (Auth::user()->isAdmin()) {
            unset($editableProperties["Verein"]);
            $editableProperties = array_merge($editableProperties, ["Verein" => GeneralHelper::addOtherChoosableOptions("clubs", $fighter?->club->name)]);
        }

        return $editableProperties;
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
