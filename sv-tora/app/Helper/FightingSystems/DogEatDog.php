<?php

namespace App\Helper\FightingSystems;

use App\Helper\GeneralHelper;
use App\Models\Category;
use App\Models\Fighter;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DogEatDog implements FightingSystem {

    private array $fights;

    public function __construct(protected Category $category)
    {
        if ($this->category->fighting_system_configuration === null) {
            $this->initialize();
            $this->category->fighting_system_configuration = $this->serialize();
            $this->category->save();
        }
        $this->deserialize();
    }

    function build()
    {
        // TODO: Implement build() method.
    }

    function initialize()
    {
        $fighters = $this->category->fighters->map(function ($fighter, $key) {
            return $fighter->fighter;
        });

        $fights = array();
        for ($i = 0; $i < count($fighters) - 1; $i++) {
            for ($j = $i + 1; $j < count($fighters); $j++) {
                $newFight = new Fight($fighters[$i], $fighters[$j]);
                array_push($fights, $newFight);
            }
        }

        $shuffledFights = array();

        $count = count($fights);
        for ($i = 0; $i < $count; $i++) {
            $fight = ($i % 2 == 0) ? array_shift($fights) : array_pop($fights);
            $fight->fightNumber = $i + 1;
            $shuffledFights[] = $fight;
        }

        $this->fights = $shuffledFights;

    }

    function editConfig()
    {
        return view("FightingSystem.edit-dog-eat-dog", ["fights" => $this->fights])->render();
    }

    function updateConfig(Request $request)
    {

        $this->fights = array();

        $arrayFights = $request["config"]["fightingOrder"];

        $fightNumber = 1;
        foreach ($arrayFights as $arrayFight) {
            $fighter1 = Fighter::find($arrayFight["fighter1"]);
            $fighter2 = Fighter::find($arrayFight["fighter2"]);
            $this->fights[] = new Fight($fighter1, $fighter2, $fightNumber++);
        }

        $this->category->fighting_system_configuration = $this->serialize();
        $this->category->save();
    }

    function print()
    {
        $pdf = Pdf::loadView("FightingSystem.dog-eat-dog", ["category" => $this->category, "fights" => $this->fights]);
        $pdfPath = "tournaments/" . $this->category->tournament->id . "/categories/" . $this->category->id . "/Kampfsystem Kategorie " . $this->category->name . ".pdf";;
        if (!is_dir(storage_path("app/public/" . dirname($pdfPath)))) {
            mkdir(storage_path("app/public/" . dirname($pdfPath)), recursive: true);
        }
        $pdf->save(storage_path("app/public/" . $pdfPath));
        return $pdfPath;
    }

    function serialize()
    {
        $serializedFightingSystem = [
            "fights" => $this->fights,
        ];
        return $serializedFightingSystem;
    }

    function deserialize()
    {
        $serializedFightingSystem = $this->category->fighting_system_configuration;
        $arrayFights = $serializedFightingSystem["fights"];
        $this->fights = array();
        foreach ($arrayFights as $arrayFight) {
            $this->fights[] = Fight::deserialize($arrayFight);
        }
    }
}
