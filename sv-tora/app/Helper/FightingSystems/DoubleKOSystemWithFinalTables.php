<?php

namespace App\Helper\FightingSystems;

use App\Helper\GeneralHelper;
use App\Models\Category;
use Barryvdh\DomPDF\Facade\Pdf;
use Clegginabox\PDFMerger\PDFMerger;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DoubleKOSystemWithFinalTables implements FightingSystem {

    public FightingTree $fightingTree;
    public FightingTree $consolationTree;
    private Collection $fighters;
    private int $numberReferees;

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
        $this->fightingTree = new FightingTree($this->fighters, false);
        $this->fightingTree->initializeFightingTree();
        $this->consolationTree = new FightingTree(count($this->fighters) - 4, true, $this->fightingTree->numberFights);
        $this->consolationTree->initializeFightingTree();
        $this->numberReferees = 5;
    }

    function editConfig()
    {
        return $this->fightingTree->editFightingTreeConfig() . view("FightingSystem.edit-tables", ["numberReferees" => $this->numberReferees, "id" => GeneralHelper::uniqueRandomIdentifier()])->render();
    }

    function updateConfig(Request $request)
    {
        $this->fightingTree->updateFightingTreeConfig($request["config"]["fightingTree"]);
        $this->numberReferees = $request["config"]["numberReferees"];

        $this->category->fighting_system_configuration = $this->serialize();
        $this->category->save();
    }

    function print()
    {
        $pdf = new PDFMerger();

        $metaInfoPath = "tournaments/" . $this->category->tournament->id . "/categories/" . $this->category->id . "/metaInfo.pdf";
        $metaInfoPdf = PDF::loadView("FightingSystem.ko-system", ["category" => $this->category])->output();
        Storage::disk("public")->put($metaInfoPath, $metaInfoPdf);
        $pdf->addPDF(storage_path("app/public/" . $metaInfoPath), orientation: "P");

        $fightingTreePath = $this->fightingTree->print($this->category->tournament->id, $this->category->id, false, true);
        $pdf->addPDF($fightingTreePath, orientation: "L");

        $consolationTreePath = $this->consolationTree->print($this->category->tournament->id, $this->category->id, false, true);
        $pdf->addPDF($consolationTreePath, orientation: "L");

        $tablesPath = "tournaments/" . $this->category->tournament->id . "/categories/" . $this->category->id . "/table.pdf";
        $tablesPdf = PDF::loadView("FightingSystem.final-round-tables", ["category" => $this->category, "numberReferees" => $this->numberReferees, "onlyFightingSystem" => true])->output();
        Storage::disk("public")->put($tablesPath, $tablesPdf);
        $pdf->addPDF(storage_path("app/public/" . $tablesPath), orientation: "P");

        $totalPdfPath = "tournaments/" . $this->category->tournament->id . "/categories/" . $this->category->id . "/Kampfsystem Kategorie " . $this->category->name . ".pdf";
        $pdf->merge("file", storage_path("app/public/" . $totalPdfPath));
        return $totalPdfPath;
    }

    function serialize()
    {
        $serializedFightingSystem = [
            "fightingTree" => $this->fightingTree->serialize(),
            "consolationTree" => $this->consolationTree->serialize(),
            "numberReferees" => $this->numberReferees,
        ];
        return $serializedFightingSystem;
    }

    function deserialize()
    {
        $serializedFightingSystem = $this->category->fighting_system_configuration;
        $this->fightingTree = FightingTree::deserialize(clone $this->fighters, $serializedFightingSystem["fightingTree"]);
        $this->consolationTree = FightingTree::deserialize(new Collection(), $serializedFightingSystem["consolationTree"]);
        $this->numberReferees = $serializedFightingSystem["numberReferees"];
    }
}
