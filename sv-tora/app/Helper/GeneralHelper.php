<?php

namespace App\Helper;

use App\Models\Club;
use App\Models\Fighter;
use App\Models\Role;
use App\Models\Team;
use App\Models\TournamentTemplate;
use Exception;
use Illuminate\Support\Facades\Log;
use phpDocumentor\Reflection\Types\Boolean;

/**
 * Class GeneralHelper
 * Provides helpful global methods
 * @package App\Helper
 */
class GeneralHelper
{

    private static array $uniqueRandomIdentifiers = array();

    /**
     * This function creates a unique random identifier for frontend use (e.g. inputs (and their labels))
     * @param int $length
     * @return string
     * @throws Exception
     */
    public static function uniqueRandomIdentifier(int $length = 10): string
    {

        do {
            $uniqueRandomIdentifier = "id-" . self::generateRandomString($length);
        } while (in_array($uniqueRandomIdentifier, self::$uniqueRandomIdentifiers));

        array_push(self::$uniqueRandomIdentifiers, $uniqueRandomIdentifier);

        return $uniqueRandomIdentifier;

    }

    /**
     * This function generates a random string
     * @param int $length
     * @return string
     * @throws Exception
     */
    private static function generateRandomString(int $length, bool $useBigChars = true, bool $useSmallChars = true, bool $useNumbers = true, bool $useSpecialChars = false): string
    {
        if (!$useBigChars && !$useSmallChars && !$useNumbers && !$useSpecialChars) {
            throw new Exception("At least one set of symbols has to be used!");
        }
        $bigChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $smallChars = "abcdefghijklmnopqrstuvwxyz";
        $numbers = "0123456789";
        $specialChars = "~!@#\$%^&*+-/.,{}[]();:";


        $symbols = "";
        if ($useSmallChars) {
            $symbols .= $smallChars;
        }
        if ($useBigChars) {
            $symbols .= $bigChars;
        }
        if ($useNumbers) {
            $symbols .= $numbers;
        }
        if ($useSpecialChars) {
            $symbols .= $specialChars;
        }

        $charsArray = str_split($symbols);

        $randomString = "";
        for ($i = 0; $i < $length; $i++) {
            $randKey = array_rand($charsArray);
            $randomString .= $charsArray[$randKey];
        }
        return $randomString;
    }

    /**
     * This function sends a standardized notification to the frontend
     * @param string $type The type of the message (success or error)
     * @param string $message The content of the message
     * @param string $sender The sender of the message
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public static function sendNotification($type, $message, $sender = "System") {
        $timestamp = date("d.m.Y H:i");
        $response_code = 200;
        if ($type === NotificationTypes::ERROR) {
            $response_code = 422;
        }
        return response(json_encode(["type" => $type, "message" => $message, "timestamp" => $timestamp, "sender" => $sender]), $response_code);
    }


    /**
     * This functions generates a token
     * @param int $length The length of the token (default is 25)
     * @param string[] $otherTokens An optional array of other tokens that should differ from the token generated in this function
     * @throws Exception
     */
    public static function generateUniqueRandomToken(int $length = 25, array $otherTokens = []): string {
        do {
            $randomToken = self::generateRandomString($length, false);
        } while (in_array($randomToken, $otherTokens));
        return $randomToken;
    }

    /**
     * This function creates an array with the different options a checkbox or radio-button group or a select could have.
     * The array is a Frontend specific way of encoding these different options
     *
     * @param string $key
     * @param string|null $selectedValue
     * @return array
     */
    public static function addOtherChoosableOptions(string $key, string $selectedValue = null) {
        $encodedOptions = [];
        $allOptions = match ($key) {
            "clubs" => Club::all()->pluck("name"),
            "role" => Role::all()->pluck("name"),
            "age" => range(3, 70),
            "tournament_templates" => TournamentTemplate::all()->pluck("tournament_name"),
            "tournament_status" => array_map(function($statusCode) {
                return config("tournament.tournament_statuus")[$statusCode];
            }, config("tournament.tournament_alterable_statuus")),
            "examination_type" => config("tournament.examination_types"),
            default => config("global." . $key),
        };
        foreach ($allOptions as $option) {
            $encodedOption = [
                "value" => $option,
                "text" => $option,
                "checked" => $option == $selectedValue,
                "disabled" => false,
            ];
            array_push($encodedOptions, $encodedOption);
        }
        return $encodedOptions;
    }


    /**
     * This function determines the category for the given fighter and discipline (/examination type) on the basis of the category reference in the tournament config
     * This function then returns the matching category or categories if the fighter might have a choice
     *
     * @param Fighter $fighter
     * @param string $discipline
     * @return string|array
     * @throws Exception
     */
    public static function determineCategoryOfFighter(Fighter $fighter, string $discipline) {
        if (!in_array($discipline, config("tournament.examination_types"))) {
            throw new Exception("Diese Disziplin \"" . $discipline . "\" existiert nicht.");
        }
        $categoryReference = config("tournament.category_reference");
        $graduation = str_replace(" ", "", $fighter->graduation);
        $age = $fighter->age();
        $sex = $fighter->sex;
        if ($sex === "m/w") {
            $sex = "m";
        }

        # find matching graduationKey
        $requiredGraduations = array_keys($categoryReference[$discipline]);
        $graduationKey = null;
        foreach ($requiredGraduations as $requiredGraduation) {
            $graduationList = str_replace(" ", "", config("global.graduations"));
            if (strpos($requiredGraduation, "-")) {
                $graduationLimits = explode("-", str_replace(" ", "", $requiredGraduation));
                $graduationNumber = array_search($graduation, $graduationList);
                $graduationLowerLimit = array_search($graduationLimits[0], $graduationList);
                $graduationUpperLimit = array_search($graduationLimits[1], $graduationList);
                if ($graduationNumber >= $graduationLowerLimit && $graduationNumber <= $graduationUpperLimit) {
                    $graduationKey = $requiredGraduation;
                }
            } else {
                if ($graduation === str_replace(" ", "", $requiredGraduation)) {
                    $graduationKey = $requiredGraduation;
                }
            }
        }
        if ($graduationKey === null) {
            throw new Exception("Die Graduierung des Kämpfers ist in dieser Disziplin nicht erlaubt.");
        }

        # find matching ageKey
        $requiredAges = array_keys($categoryReference[$discipline][$graduationKey]);
        $ageKey = null;
        foreach ($requiredAges as $requiredAge) {
            if (strpos($requiredAge, "-")) {
                $ageLimits = explode("-", str_replace(" ", "" , $requiredAge));
                $ageLowerLimit = intval($ageLimits[0]);
                $ageUpperLimit = intval($ageLimits[1]);
                if ($age >= $ageLowerLimit && $age <= $ageUpperLimit) {
                    $ageKey = $requiredAge;
                }
            } else {
                if ($age === intval($requiredAge)) {
                    $ageKey = $requiredAge;
                }
            }
        }
        if ($ageKey === null) {
            throw new Exception("Das Alter des Kämpfers ist in dieser Disziplin mit der erreichten Graduierung nicht erlaubt.");
        }

        # find matching sexKey
        $categories = $categoryReference[$discipline][$graduationKey][$ageKey][$sex];
        return $categories;
    }


    /**
     * This function determines the category for a given team and returns the result (this is a special case of finding the category for a fighter)
     *
     * @param Team $team
     * @throws Exception
     */
    public static function determineCategoryOfTeam(Team $team) {
        // get fighter with the highest age
        $maxAgeFighter = $team->fighters()->first();
        foreach ($team->fighters as $fighter) {
            if ($fighter->age() > $maxAgeFighter->age()) {
                $maxAgeFighter = $fighter;
            }
        }
        return self::determineCategoryOfFighter($fighter, "Team");
    }

}
