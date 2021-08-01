<?php

/**
 * This custom config file contains global variables that should be available to the whole application and maintained in a single spot
 */

return [

    /*
    |--------------------------------------------------------------------------
    | Help Mail
    |--------------------------------------------------------------------------
    |
    | This value is the mail that may be contacted by users
    |
    */
    "help-mail" => env("help-mail", "markus.staedler@hotmail.de"),

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
        "w",
        "d"
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
    | Tournament Statuus
    |--------------------------------------------------------------------------
    |
    | This variable contains all the possible tournament statuus
    |
    */
    "tournamentStatus" => [
        "CREATED",
        "ENROLLMENT_OPEN",
        "ENROLLMENT_CLOSED",
        "TOURNAMENT_DAY",
        "FINISHED",
    ],

    /*
    |--------------------------------------------------------------------------
    | Tournament Alterable Statuus
    |--------------------------------------------------------------------------
    |
    | This variable contains all the statuus of a tournament that can manually be changed by admins
    |
    */
    "tournamentAlterableStatus" => [
        "ENROLLMENT_OPEN",
        "ENROLLMENT_CLOSED",
        "TOURNAMENT_DAY",
        "FINISHED",
    ],

    /*
    |--------------------------------------------------------------------------
    | Category Statuus
    |--------------------------------------------------------------------------
    |
    | This variable contains all the possible category statuus
    |
    */
    "categoryStatus" => [
        "PREPARING",
        "READY",
        "ACTIVE",
        "DONE",
        "FINISHED",
    ],

    /*
    |--------------------------------------------------------------------------
    | Examination Types
    |--------------------------------------------------------------------------
    |
    | This variable contains all the examination types available in Karate
    |
    */
    "examinationTypes" => [
        "KIHON",
        "KATA",
        "KIHON_IPPON_KUMITE",
        "JIYU_IPPON_KUMITE",
        "SHOBU_IPPON_KUMITE",
        "TEAM",
    ],

    /*
    |--------------------------------------------------------------------------
    | Regular Category Reference
    |--------------------------------------------------------------------------
    |
    | This variable contains the regular category reference in a tournament context (e.g. Tora-Pokal)
    |
    */
    "regularCategoryReference" => [
        "Kata" => [
            "7-6.Kyu" => [
                "8-10" => [
                    "m" => "1",
                    "w" => "2",
                ],
                "11-12" => [
                    "m" => "10",
                    "w" => "11",
                ],
                "13-14" => [
                    "m" => "31",
                    "w" => "32",
                ],
            ],
            "5.Kyu-6.Dan" => [
                "8-10" => [
                    "m" => "3",
                    "w" => "4",
                ],
                "11-12" => [
                    "m" => "12",
                    "w" => "13",
                ],
                "13-14" => [
                    "m" => "19",
                    "w" => "20",
                ],
                "15-16" => [
                    "m" => "25",
                    "w" => "26",
                ]
            ]
        ],
        "Kumite" => [
            "7.Kyu" => [
                "8-10" => [
                    "Kihon Ippon Kumite" => [
                        "m" => "5",
                        "w" => "5",
                    ],
                    "Jiyu Ippon Kumite" => [
                        "m" => "6",
                        "w" => "7",
                    ],
                    "Shobu Ippon Kumite" => [
                        "m" => "8",
                        "w" => "9",
                    ],
                ],
                "11-12" => [
                    "Kihon Ippon Kumite" => [
                        "m" => "14",
                        "w" => "14",
                    ],
                    "Jiyu Ippon Kumite" => [
                        "m" => "15",
                        "w" => "16",
                    ],
                    "Shobu Ippon Kumite" => [
                        "m" => "17",
                        "w" => "18",
                    ],
                ],
            ],
            "6.Kyu" => [
                "8-10" => [
                    "Kihon Ippon Kumite" => [
                        "m" => "5",
                        "w" => "5",
                    ],
                    "Jiyu Ippon Kumite" => [
                        "m" => "6",
                        "w" => "7",
                    ],
                    "Shobu Ippon Kumite" => [
                        "m" => "8",
                        "w" => "9",
                    ],
                ],
                "11-12" => [
                    "Kihon Ippon Kumite" => [
                        "m" => "14",
                        "w" => "14",
                    ],
                    "Jiyu Ippon Kumite" => [
                        "m" => "15",
                        "w" => "16",
                    ],
                    "Shobu Ippon Kumite" => [
                        "m" => "17",
                        "w" => "18",
                    ],
                ],
                "13-14" => [
                    "Jiyu Ippon Kumite" => [
                        "m" => "21",
                        "w" => "22",
                    ],
                    "Shobu Ippon Kumite" => [
                        "m" => "23",
                        "w" => "24",
                    ],
                ],
                "15-16" => [
                    "Shobu Ippon Kumite" => [
                        "m" => "27",
                        "w" => "28",
                    ],
                ],
            ],
            "5.Kyu-4.Kyu" => [
                "8-10" => [
                    "Jiyu Ippon Kumite" => [
                        "m" => "6",
                        "w" => "7",
                    ],
                    "Shobu Ippon Kumite" => [
                        "m" => "8",
                        "w" => "9",
                    ],
                ],
                "11-12" => [
                    "Jiyu Ippon Kumite" => [
                        "m" => "15",
                        "w" => "16",
                    ],
                    "Shobu Ippon Kumite" => [
                        "m" => "17",
                        "w" => "18",
                    ],
                ],
                "13-14" => [
                    "Jiyu Ippon Kumite" => [
                        "m" => "21",
                        "w" => "22",
                    ],
                    "Shobu Ippon Kumite" => [
                        "m" => "23",
                        "w" => "24",
                    ],
                ],
                "15-16" => [
                    "Shobu Ippon Kumite" => [
                        "m" => "27",
                        "w" => "28",
                    ],
                ],
            ],
            "3.Kyu-6.Dan" => [
                "8-10" => [
                    "Shobu Ippon Kumite" => [
                        "m" => "8",
                        "w" => "9",
                    ],
                ],
                "11-12" => [
                    "Shobu Ippon Kumite" => [
                        "m" => "17",
                        "w" => "18",
                    ],
                ],
                "13-14" => [
                    "Shobu Ippon Kumite" => [
                        "m" => "23",
                        "w" => "24",
                    ],
                ],
                "15-16" => [
                    "Shobu Ippon Kumite" => [
                        "m" => "27",
                        "w" => "28",
                    ],
                ],
            ],
        ],
        "Team" => [
            "8-11" => "29",
            "12-16" => "30",
        ]
    ],

    /*
    |--------------------------------------------------------------------------
    | Category Reference
    |--------------------------------------------------------------------------
    |
    | This variable contains all the the complete category reference for each tournament
    |
    */
    "categoryReference" => [
        "Nachwuchsturnier" => [
            "Kihon" => [
                "9.Kyu" => [
                    "6-8" => [
                        "w" => "1",
                        "m" => "2",
                    ],
                    "9-10" => [
                        "w" => "3",
                        "m" => "4",
                    ],
                ],
            ],
            "Kata" => [
                "8.Kyu" => [
                    "6-8" => [
                        "w" => "5",
                        "m" => "6",
                    ],
                    "9-10" => [
                        "w" => "7",
                        "m" => "8",
                    ],
                    "11-12" => [
                        "w" => "9",
                        "m" => "10",
                    ],
                ],
            ],
            "Kumite" => [
                "8.Kyu" => [
                    "6-8" => [
                        "w" => "11",
                        "m" => "12",
                    ],
                    "9-10" => [
                        "w" => "13",
                        "m" => "14",
                    ],
                    "11-12" => [
                        "w" => "15",
                        "m" => "16",
                    ],
                ],
            ],
        ],
        "Tora-Pokal" => config("global.regularCategoryReference"),
        "Weihnachtsturnier" => config("global.regularCategoryReference"),
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
    "MAX_TEAM_MEMBERS" => 5,

];
