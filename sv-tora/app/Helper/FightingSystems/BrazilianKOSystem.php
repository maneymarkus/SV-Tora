<?php

namespace App\Helper\FightingSystems;

use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class BrazilianKOSystem implements FightingSystem {

    public FightingTree $fightingTree;
    public FightingTree $consolationTree;
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
        $this->fightingTree = new FightingTree($this->fighters, false);
        $this->fightingTree->initializeFightingTree();
        $numberFighterConsolationTree = ($this->fightingTree->numberLevels + $this->fightingTree->numberPreFights) * 2;
        $this->consolationTree = new FightingTree($numberFighterConsolationTree, true);
        $this->consolationTree->initializeFightingTree();
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

    function print()
    {
        // TODO: Implement print() method.
    }

    function serialize()
    {
        $serializedFightingSystem = [
            "fightingTree" => $this->fightingTree->serialize(),
            "consolationTree" => $this->consolationTree->serialize(),
        ];
        return $serializedFightingSystem;
    }

    function deserialize()
    {
        $serializedFightingSystem = $this->category->fighting_system_configuration;
        $this->fightingTree = FightingTree::deserialize(clone $this->fighters, $serializedFightingSystem["fightingTree"]);
        $this->consolationTree = FightingTree::deserialize(clone $this->fighters, $serializedFightingSystem["consolationTree"]);
    }
}
