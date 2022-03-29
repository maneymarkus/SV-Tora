<?php

namespace App\Helper\FightingSystems;

use App\Helper\GeneralHelper;
use App\Models\Category;
use Illuminate\Http\Request;

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
        $this->numberReferees = 7;
    }

    function editConfig()
    {
        return view("FightingSystem.tables", ["numberReferees" => $this->numberReferees, "id" => GeneralHelper::uniqueRandomIdentifier()])->render();
    }

    function updateConfig(Request $request)
    {
        $this->numberReferees = $request["config"]["numberReferees"];

        $this->category->fighting_system_configuration = $this->serialize();
        $this->category->save();
    }

    function print()
    {
        // TODO: Implement print() method.
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
