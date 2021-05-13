<?php

namespace App\Helper;

/**
 * Class GeneralHelper
 * Provides helpful global methods
 * @package App\Helper
 */
class GeneralHelper
{

    private static $uniqueRandomIdentifiers = array();

    /**
     * This function creates a unique random identifier for e.g. inputs (and their labels)
     * @param int $length
     * @return string
     */
    public static function uniqueRandomIdentifier(int $length = 10): string
    {
        $uniqueRandomIdentifier = self::generateRandomString($length);

        if (in_array($uniqueRandomIdentifier, self::$uniqueRandomIdentifiers)) {
            while (in_array($uniqueRandomIdentifier, self::$uniqueRandomIdentifiers)) {
                $uniqueRandomIdentifier = self::generateRandomString($length);
            }
        }

        array_push(self::$uniqueRandomIdentifiers, $uniqueRandomIdentifier);

        return $uniqueRandomIdentifier;

    }

    /**
     * This function generates a random string
     * @param int $length
     * @return string
     */
    private static function generateRandomString(int $length): string
    {
        $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        $charsArray = str_split($chars);

        $randomString = "";
        for ($i = 0; $i < $length; $i++) {
            $randKey = array_rand($charsArray);
            $randomString .= $charsArray[$randKey];
        }
        return "id-".$randomString;
    }

    public static function sendNotification($type, $message, $sender = "System") {
        $timestamp = date("d.m.Y H:i");
        $response_code = 200;
        if ($type === "error") {
            $response_code = 400;
        }
        return response(json_encode(["type" => $type, "message" => $message, "timestamp" => $timestamp, "sender" => $sender]), $response_code);
    }

}
