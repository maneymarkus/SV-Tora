<?php

/**
 * This custom config file contains values and definitions and configurations regarding tournaments
 */

return [

    /*
        |--------------------------------------------------------------------------
        | Tournament Statuus
        |--------------------------------------------------------------------------
        |
        | This variable contains all the possible tournament statuus in their correct order
        |
        */
    "tournament_statuus" => [
        0 => "Wettkampf erstellt",
        1 => "Anmeldung freigeschalten",
        2 => "Anmeldung geschlossen",
        3 => "Wettkampftag",
        4 => "Wettkampf abgeschlossen",
    ],

    /*
    |--------------------------------------------------------------------------
    | Tournament Alterable Statuus
    |--------------------------------------------------------------------------
    |
    | This variable contains all the statuus of a tournament that can manually be changed by admins
    |
    */
    "tournament_alterable_statuus" => [
        1,
        2,
        3,
        4,
    ],

    /*
    |--------------------------------------------------------------------------
    | Category Statuus
    |--------------------------------------------------------------------------
    |
    | This variable contains all the possible category statuus
    |
    */
    "category_status" => [
        0 => "In Vorbereitung",
        1 => "Vorbereitet",
        2 => "Aktiv",
        3 => "Durchgeführt",
        4 => "Abgeschlossen",
    ],

    /*
    |--------------------------------------------------------------------------
    | Examination Types
    |--------------------------------------------------------------------------
    |
    | This variable contains all the examination types available in Karate
    |
    */
    "examination_types" => [
        "Kihon",
        "Kata",
        "Kumite",
        "Team",
    ],

    /*
    |--------------------------------------------------------------------------
    | Kumite Categories
    |--------------------------------------------------------------------------
    |
    | This variable contains the Kumite categories that a fighter might have the choice on
    |
    */
    "kumite_categories" => [
        "Kihon_Ippon_Kumite",
        "Jiyu_Ippon_Kumite",
        "Shobu_Ippon_Kumite",
    ],

    /*
    |--------------------------------------------------------------------------
    | Regular Category Reference
    |--------------------------------------------------------------------------
    |
    | This variable contains the regular category reference in a tournament context (e.g. Tora-Pokal)
    |
    */
    "regular_category_reference" => [
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
    | This variable contains the complete category reference for each tournament
    |
    */
    "category_reference" => [
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
        "Tora-Pokal" => config("tournament.regular_category_reference"),
        "Weihnachtsturnier" => config("tournament.regular_category_reference"),
    ],

];
