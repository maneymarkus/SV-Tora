<?php


namespace App\Helper;


use League\CommonMark\Reference\Reference;

abstract class PersonTypes
{
    const FIGHTER = "fighter";
    const COACH = "coach";
    const REFEREE = "referee";
    const DESK_SUPPORTER = "desk supporter";

    const PERSONS = [
        self::FIGHTER,
        self::COACH,
        self::REFEREE,
        self::DESK_SUPPORTER,
    ];
}
