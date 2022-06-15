<?php

namespace App\Helper\FightingSystems;

use App\Helper\GeneralHelper;
use App\Models\Category;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class Tables implements FightingSystem {

    private int $numberReferees;

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
        $this->numberReferees = 5;
    }

    function editConfig()
    {
        return view("FightingSystem.edit-tables", ["numberReferees" => $this->numberReferees, "id" => GeneralHelper::uniqueRandomIdentifier()])->render();
    }

    function updateConfig(Request $request)
    {
        $this->numberReferees = $request["config"]["numberReferees"];

        $this->category->fighting_system_configuration = $this->serialize();
        $this->category->save();
    }

    function print()
    {
        $isTeams = $this->category->teams->count() > 0;
        $pdf = Pdf::loadView("FightingSystem.tables", ["category" => $this->category, "numberReferees" => $this->numberReferees, "id" => GeneralHelper::uniqueRandomIdentifier(), "isTeams" => $isTeams]);
        $pdfPath = "tournaments/" . $this->category->tournament->id . "/categories/" . $this->category->id . "/Kampfsystem Kategorie " . $this->category->name . ".pdf";;
        if (!is_dir(storage_path("app/public/" . dirname($pdfPath)))) {
            mkdir(storage_path("app/public/" . dirname($pdfPath)), recursive: true);
        }
        $pdf->save(storage_path("app/public/" . $pdfPath));
        return $pdfPath;
    }

    function serialize()
    {
        $config = [
            "numberReferees" => $this->numberReferees,
        ];
        return $config;
    }

    function deserialize()
    {
        $config = $this->category->fighting_system_configuration;
        $this->numberReferees = $config["numberReferees"];
    }
}
