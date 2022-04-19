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
        $pdf = Pdf::loadView("FightingSystem.tables", ["category" => $this->category, "numberReferees" => $this->numberReferees, "id" => GeneralHelper::uniqueRandomIdentifier()]);
        return $pdf->download("Kampfsystem Kategorie " . $this->category->name . ".pdf");
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
