<?php

namespace App\Helper\FightingSystems;

use App\Models\Category;
use Barryvdh\DomPDF\Facade\Pdf;
use Clegginabox\PDFMerger\PDFMerger;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;

class KOSystem implements FightingSystem {

    public FightingTree $fightingTree;
    public Fight $fightForThird;
    private Collection $fighters;

    public function __construct(protected Category $category)
    {
        $this->fighters = $this->category->fighters->map(function ($fighter, $key) {
            return $fighter->fighter;
        });
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
        $this->fightingTree = new FightingTree(clone $this->fighters);
        $this->fightingTree->initializeFightingTree();
        $this->fightingTree->fights[count($this->fightingTree->fights) - 1][0]->fightNumber++;
    }

    function editConfig()
    {
        return $this->fightingTree->editFightingTreeConfig();
    }

    function updateConfig(Request $request)
    {
        $this->fightingTree->updateFightingTreeConfig($request["config"]["fightingTree"]);

        $this->category->fighting_system_configuration = $this->serialize();
        $this->category->save();
    }

    /**
     * @throws \Exception
     */
    function print()
    {
        $pdf = new PDFMerger();

        $metaInfoPath = "tournaments/" . $this->category->tournament->id . "/category/" . $this->category->id . "/metaInfo.pdf";
        $metaInfoPdf = PDF::loadView("FightingSystem.ko-system", ["category" => $this->category])->output();
        Storage::disk("public")->put($metaInfoPath, $metaInfoPdf);
        $pdf->addPDF(storage_path("app/public/" . $metaInfoPath), orientation: "P");

        $fightingTreePath = $this->fightingTree->print($this->category->tournament->id, $this->category->id);
        $pdf->addPDF($fightingTreePath, orientation: "L");

        if ($this->fighters->count() > 3) {
            $extraFights = new Spreadsheet();
            WriteSpreadsheet::setHeading($extraFights, "Kampf um Platz 3");
            $loserFromFirstFight = $this->fightingTree->fights[count($this->fightingTree->fights) - 2][0]->fightNumber;
            $fightForThird = new Fight(fightNumber: $this->fightingTree->numberFights, fighter1Description: "Verlierer aus Kampf " . $loserFromFirstFight, fighter2Description: "Verlierer aus Kampf " . $loserFromFirstFight + 1);
            WriteSpreadsheet::writeFight($extraFights, 1, 3, $fightForThird, 5);
            $extraFightsPath = storage_path("app/public/tournaments/" . $this->category->tournament->id . "/categories/" . $this->category->id . "/" . "extraFights.pdf");
            WriteSpreadsheet::saveSpreadsheet($extraFights, $extraFightsPath);
            $pdf->addPDF($extraFightsPath, orientation: "L");
        }

        $totalPdfPath = "tournaments/" . $this->category->tournament->id . "/categories/" . $this->category->id . "/Kampfsystem Kategorie " . $this->category->name . ".pdf";
        $pdf->merge("file", storage_path("app/public/" . $totalPdfPath));
        return $totalPdfPath;
    }

    function serialize()
    {
        $serializedFightingSystem = [
            "fightingTree" => $this->fightingTree->serialize(),
        ];
        return $serializedFightingSystem;
    }

    function deserialize()
    {
        $serializedFightingSystem = $this->category->fighting_system_configuration;
        $this->fightingTree = FightingTree::deserialize(clone $this->fighters, $serializedFightingSystem["fightingTree"]);
    }

}
