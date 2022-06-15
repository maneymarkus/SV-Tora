<?php

namespace App\Helper\FightingSystems;

use App\Models\Fighter;

class Fight
{
    public function __construct(public ?Fighter $fighter1 = null, public ?Fighter $fighter2 = null, public ?int $fightNumber = null, public ?string $fighter1Description = null, public ?string $fighter2Description = null)
    {
    }

    public function setFighter1(Fighter $fighter) {
        $this->fighter1 = $fighter;
    }

    public function setFighter2(Fighter $fighter) {
        $this->fighter2 = $fighter;
    }

    public function addFighter(Fighter $fighter): bool
    {
        if ($this->fighter1 === null) {
            $this->setFighter1($fighter);
            return true;
        }
        if ($this->fighter2 === null) {
            $this->setFighter2($fighter);
            return true;
        }
        return false;
    }

    public function serialize(): string {
        $serializedFight = [
            "fighter1" => $this->fighter1,
            "fighter2" => $this->fighter2,
        ];
        if (isset($this->fightNumber)) {
            $serializedFight["fightNumber"] = $this->fightNumber;
        }
        if (isset($this->fighter1Description)) {
            $serializedFight["fighter1Description"] = $this->fighter1Description;
        }
        if (isset($this->fighter2Description)) {
            $serializedFight["fighter2Description"] = $this->fighter2Description;
        }
        return json_encode($serializedFight);
    }


    public static function deserialize(array $arrayFight): Fight
    {
        $fighter1 = $arrayFight["fighter1"] ? Fighter::find($arrayFight["fighter1"]["id"]) : null;
        $fighter2 = $arrayFight["fighter2"] ? Fighter::find($arrayFight["fighter2"]["id"]) : null;
        return new Fight($fighter1, $fighter2, $arrayFight["fightNumber"] ?? null, $arrayFight["fighter1Description"] ?? null, $arrayFight["fighter2Description"] ?? null);
    }
}
