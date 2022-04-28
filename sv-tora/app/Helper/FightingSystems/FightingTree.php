<?php

namespace App\Helper\FightingSystems;

use App\Models\Fighter;
use Illuminate\Database\Eloquent\Collection;

class FightingTree
{

    public Collection $fighters;
    public int $numberFighters;
    public int $numberFights;
    // a level is basically the progress of a fight in a fight tree (quarter-finals, half finals, finals, etc.) (except "pre fight" level)
    public int $numberLevels;
    // a symmetric fight tree can only be build with an amount of fighters that is a result of 2 to the power of x where x is a natural number (e.g. 2^3, 2^4, ...)
    // but when we don't have such an amount of fighters, we have to do so-called "pre fights", so before actually having the base level there is another level with the "pre fights"
    public int $numberPreFights;

    // a 2-dimensional array that has a shape of: [$numberLevels][$numberFightsOfLevel]
    public array $fights;

    public function __construct(Collection|int $fighters)
    {
        if ($fighters instanceof Collection) {
            $this->fighters = $fighters;
            $this->numberFighters = $this->fighters->count();
        } else {
            $this->numberFighters = $fighters;
            $this->fighters = new Collection();
        }

        $this->numberFights = $this->numberFighters - 1;
        $this->numberLevels = (int) floor(log($this->numberFighters) / log(2));
        $this->numberPreFights = $this->numberFighters % pow(2, $this->numberLevels);
        for ($i = 0; $i < $this->numberLevels; $i++) {
            $this->fights[] = array();
        }
        if ($this->numberPreFights > 0) {
            $this->fights[] = array();
        }
    }

    function initializeFightingTree() {
        $fights = array();
        $nodeNumber = $this->numberFights;
        $fighters = clone $this->fighters;
        $currentLevel = floor(log($nodeNumber) / log(2));
        for ($i = 0; $i < $this->numberFights; $i++) {
            $fighter1 = null;
            $fighter2 = null;
            if (count($fighters) > 0) {
                $fighter1 = $fighters->shift();
            }
            if (count($fighters) > 0) {
                $fighter2 = $fighters->shift();
            }
            $fightNumber = $i + 1;
            $fight = new Fight($fighter1, $fighter2, $fightNumber);
            $fights[$currentLevel][] = $fight;
            $nodeNumber--;
            $currentLevel = floor(log($nodeNumber) / log(2));
        }
        $this->fights = array_values($fights);
    }

    function editFightingTreeConfig() {
        $fights = $this->fights;
        $displayedColumns = array(array_shift($fights));
        if ($this->numberPreFights > 0) {
            $displayedColumns[] = array_shift($fights);
        }
        $marginTopForFirstPreFight = $this->getMarginTopPrefight();
        return view("FightingSystem.edit-fighting-tree", ["fights" => $displayedColumns, "marginTopForFirstPreFight" => $marginTopForFirstPreFight])->render();
    }

    function updateFightingTreeConfig(array $newTree) {
        for ($i = 0; $i < count($newTree); $i++) {
            for ($j = 0; $j < count($newTree[$i]); $j++) {
                $fighter1 = $fighter2 = null;
                if ($newTree[$i][$j]["fighter1"] !== null) {
                    $fighter1 = Fighter::find($newTree[$i][$j]["fighter1"]);
                }
                if ($newTree[$i][$j]["fighter2"] !== null) {
                    $fighter2 = Fighter::find($newTree[$i][$j]["fighter2"]);
                }
                $fightNumber = $newTree[$i][$j]["fightNumber"];
                $newFight = new Fight($fighter1, $fighter2, $fightNumber);
                $this->fights[$i][$j] = $newFight;
            }
        }
    }

    function getMarginTopPrefight() {
        return $this->numberPreFights > 0 ? (count($this->fighters) - $this->numberPreFights * 2) * 4 : 0;
    }

    /**
     * @throws \PhpOffice\PhpSpreadsheet\Exception
     */
    function print(int $tournamentId, int $categoryId, bool $isFinal = true, bool $doubleKo = false) {
        $printFights = $this->fights;
        if (!$isFinal) {
            if ($doubleKo) {
                array_pop($printFights);
            }
            if (!$doubleKo) {
                array_pop($printFights);
                array_pop($printFights);
            }
        }
        // heading
        $heading = "Kampfbaum";
        $preFightOffset = WriteSpreadsheet::calculateOffsetOfPrefights($this->fights);
        $spreadsheet = WriteSpreadsheet::writeTree($printFights, $heading, $preFightOffset);

        $fileName = "fightingTree.pdf";
        $path = storage_path("app/public/tournaments/" . $tournamentId . "/categories/" . $categoryId . "/" . $fileName);

        WriteSpreadsheet::saveSpreadsheet($spreadsheet, $path);
        return $path;
    }

    function serialize(): array {
        $serializedTree = array();
        $serializedTree["tree"] = $this->fights;
        return $serializedTree;
    }

    static function deserialize(Collection $fighters, array $config): FightingTree {
        $fightingTree = new FightingTree($fighters);
        $cCount = 0;
        // loop over columns
        foreach ($config["tree"] as $column) {
            // loop over fights in column
            foreach ($column as $fight) {
                $fightingTree->fights[$cCount][] = Fight::deserialize($fight);
            }
            $cCount++;
        }
        return $fightingTree;
    }

}
