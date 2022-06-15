<?php

/**
 * This custom config file contains global variables that should be available to the whole application and maintained in a single spot
 */

return [

    /*
    |--------------------------------------------------------------------------
    | Sex
    |--------------------------------------------------------------------------
    |
    | This variable contains all the different available genders
    |
    */
    "sex" => [
        "m",
        "w"
    ],

    /*
    |--------------------------------------------------------------------------
    | Sex with mixed
    |--------------------------------------------------------------------------
    |
    | This variable contains all the different available genders including mixed
    |
    */
    "sex-with-mixed" => [
        "m",
        "w",
        "m/w"
    ],

    /*
    |--------------------------------------------------------------------------
    | Graduations
    |--------------------------------------------------------------------------
    |
    | This variable contains all the graduations in the correct order
    |
    */
    "graduations" => [
        "9. Kyu",
        "8. Kyu",
        "7. Kyu",
        "6. Kyu",
        "5. Kyu",
        "4. Kyu",
        "3. Kyu",
        "2. Kyu",
        "1. Kyu",
        "1. Dan",
        "2. Dan",
        "3. Dan",
        "4. Dan",
        "5. Dan",
        "6. Dan",
    ],


    /*
    |--------------------------------------------------------------------------
    | One Minute Length
    |--------------------------------------------------------------------------
    |
    | This variable contains the length of one minute in em for frontend representations
    |
    */
    "ONE_MINUTE_LENGTH" => 0.1,

    /*
    |--------------------------------------------------------------------------
    | Maximum Amount of Team Members
    |--------------------------------------------------------------------------
    |
    | This variable contains the maximum amount of team members allowed
    |
    */
    "MAX_TEAM_MEMBERS" => 6,

];
