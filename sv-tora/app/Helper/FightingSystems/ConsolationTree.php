<?php

namespace App\Helper\FightingSystems;

use App\Models\Fighter;
use Illuminate\Database\Eloquent\Collection;

class ConsolationTree
{

    # this is the number of the fighters on the first level including all the fighters on the prefight level
    public int $numberInitialFighters;

    public int $numberFights;

    # a level is basically the progress of a fight in a fight tree (quarter-finals, half finals, finals, etc.) (except "pre fight" level)
    public int $numberLevels;

    # additional levels are extra to the regular consolation tree adding fighters on higher levels of the tree
    public int $numberAdditionalLevels;

    # a symmetric fight tree can only be build with an amount of fighters that is a result of 2 to the power of x where x is a natural number (e.g. 2^3, 2^4, ...)
    # but when we don't have such an amount of fighters, we have to do so-called "pre fights", so before actually having the base level there is another level with the "pre fights"
    public int $numberPreFights;

    # additional fighters get added to the fighting (/consolation) tree on higher levels
    public int $numberAdditionalFighters;

    # a 2-dimensional array that has a shape of: [$numberLevels][$numberFightsOfLevel]
    public array $fights = array();

    public function __construct(public int $totalNumberFighters, public int $startFightNumber = 1)
    {

        $this->numberFights = $this->totalNumberFighters - 1;

        # auxiliary (which power of 2 is completely contained in the totalNumberFighters plus 2)
        $powerForInitialFighters = (int) floor(log($this->totalNumberFighters + 2) / log(2)) - 1;
        $this->numberInitialFighters = $this->totalNumberFighters + 2 - pow(2, $powerForInitialFighters);

        $this->numberAdditionalFighters = $this->totalNumberFighters - $this->numberInitialFighters;

        $this->numberAdditionalLevels = $powerForInitialFighters - 1;
        $this->numberLevels = (int) floor(log($this->numberInitialFighters) / log(2));
        $this->numberLevels += $this->numberAdditionalLevels;

        $powerForPreFights = (int) floor(log($this->numberInitialFighters) / log(2));
        $this->numberPreFights = $this->numberInitialFighters % pow(2, $powerForPreFights);

        for ($i = 0; $i < $this->numberLevels; $i++) {
            $this->fights[] = array();
        }
        if ($this->numberPreFights > 0) {
            $this->fights[] = array();
        }
    }

    function initializeFightingTree() {
        $loserFromFight = 1;
        $fightNumber = $this->startFightNumber;
        $hasPreFights = 0;
        if ($this->numberPreFights > 0) {
            $hasPreFights++;
            for ($i = 0; $i < $this->numberPreFights; $i++) {
                $fight = new Fight(null, null, $fightNumber++, "Verlierer aus Kampf " . $loserFromFight++, "Verlierer aus Kampf " . $loserFromFight++);
                $this->fights[0][] = $fight;
            }
        }

        for ($l = 0; $l < $this->numberLevels; $l++) {
            $maxNumberFightsOnLevel = pow(2, floor(($this->numberLevels - $l) / 2));
            for ($f = 0; $f < $maxNumberFightsOnLevel; $f++) {
                $fighter1Description = null;
                $fighter2Description = null;
                if ($l === 0) {
                    if (($maxNumberFightsOnLevel * 2) - ($f * 2) > $this->numberPreFights) {
                        $fighter1Description = "Verlierer aus Kampf " . $loserFromFight++;
                    }
                    if (($maxNumberFightsOnLevel * 2) - ($f * 2 + 1) > $this->numberPreFights) {
                        $fighter2Description = "Verlierer aus Kampf " . $loserFromFight++;
                    }
                }
                if ($l !== 0 && ($this->numberLevels - $l) % 2 === 0) {
                    $fighter2Description = "Verlierer aus Kampf " . $loserFromFight++;
                }
                $fight = new Fight(null, null, $fightNumber++, $fighter1Description, $fighter2Description);
                $this->fights[$l + $hasPreFights][] = $fight;
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
            array_pop($printFights);
        }
        // heading
        $heading = "Trostrunde";
        $preFightOffset = WriteSpreadsheet::calculateOffsetOfPrefights($this->fights, true);
        $spreadsheet = WriteSpreadsheet::writeTree($printFights, $heading, $preFightOffset);

        $fileName = "consolationTree.pdf";
        $path = storage_path("app/public/tournaments/" . $tournamentId . "/categories/" . $categoryId . "/" . $fileName);

        WriteSpreadsheet::saveSpreadsheet($spreadsheet, $path);
        return $path;
    }

    function serialize(): array {
        $serializedTree = array();
        $serializedTree["tree"] = $this->fights;
        return $serializedTree;
    }

    static function deserialize(int $numberFighters, array $config): ConsolationTree {
        $consolationTree = new ConsolationTree($numberFighters);
        $cCount = 0;
        // loop over columns
        foreach ($config["tree"] as $column) {
            // loop over fights in column
            foreach ($column as $fight) {
                $consolationTree->fights[$cCount][] = Fight::deserialize($fight);
            }
            $cCount++;
        }
        return $consolationTree;
    }

}
