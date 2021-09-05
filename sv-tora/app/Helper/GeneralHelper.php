<?php

namespace App\Helper;

use App\Models\Club;
use App\Models\Role;
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

}
