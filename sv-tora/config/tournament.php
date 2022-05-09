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
    | Category Reference
    |--------------------------------------------------------------------------
    |
    | This variable contains the category reference in a tournament context.
    | A category is being determined by discipline (/examination type), age, graduation and sex.
    | Discipline -> graduation -> age -> sex -> determine category directly or at least category choices
    |
    */
    "category_reference" => [
        "Kihon" => [
            "9. Kyu" => [
                "6-8" => [
                    "m" => "1",
                    "w" => "2",
                ],
                "9-10" => [
                    "m" => "3",
                    "w" => "4",
                ],
            ]
        ],
        "Kata" => [
            "8. Kyu" => [
                "6-8" => [
                    "m" => "5",
                    "w" => "6",
                ],
                "9-10" => [
                    "m" => "7",
                    "w" => "8",
                ],
                "11-12" => [
                    "m" => "9",
                    "w" => "10",
                ],
            ],
            "7. Kyu - 6. Kyu" => [
                "8-10" => [
                    "m" => "13",
                    "w" => "14",
                ],
                "11-12" => [
                    "m" => "17",
                    "w" => "18",
                ],
                "13-14" => [
                    "m" => "21",
                    "w" => "22",
                ],
            ],
            "5. Kyu - 6. Dan" => [
                "8-10" => [
                    "m" => "15",
                    "w" => "16",
                ],
                "11-12" => [
                    "m" => "19",
                    "w" => "20",
                ],
                "13-14" => [
                    "m" => "23",
                    "w" => "24",
                ],
                "15-17" => [
                    "m" => "25",
                    "w" => "26",
                ]
            ]
        ],
        "Kumite" => [
            "8. Kyu" => [
                "6-8" => [
                    "m" => "27",
                    "w" => "28",
                ],
                "9-10" => [
                    "m" => "29",
                    "w" => "30",
                ],
                "11-12" => [
                    "m" => "31",
                    "w" => "32",
                ],
            ],
            "7. Kyu" => [
                "9-10" => [
                    "m" => "33",
                    "w" => "33",
                ],
                "11-12" => [
                    "m" => "38",
                    "w" => "38",
                ],
            ],
            "6. Kyu" => [
                "9-10" => [
                    "m" => [
                        "Kihon Ippon Kumite" => "33",
                        "Jiyu Ippon Kumite" => "34",
                        "Shobu Ippon Kumite" => "36",
                    ],
                    "w" => [
                        "Kihon Ippon Kumite" => "33",
                        "Jiyu Ippon Kumite" => "35",
                        "Shobu Ippon Kumite" => "37",
                    ],
                ],
                "11-12" => [
                    "m" => [
                        "Kihon Ippon Kumite" => "38",
                        "Jiyu Ippon Kumite" => "39",
                        "Shobu Ippon Kumite" => "41",
                    ],
                    "w" => [
                        "Kihon Ippon Kumite" => "38",
                        "Jiyu Ippon Kumite" => "40",
                        "Shobu Ippon Kumite" => "42",
                    ],
                ],
                "13-14" => [
                    "m" => [
                        "Jiyu Ippon Kumite" => "43",
                        "Shobu Ippon Kumite" => "45",
                    ],
                    "w" => [
                        "Jiyu Ippon Kumite" => "44",
                        "Shobu Ippon Kumite" => "46",
                    ],
                ],
                "15-17" => [
                    "m" => [
                        "Shobu Ippon Kumite" => "47",
                    ],
                    "w" => [
                        "Shobu Ippon Kumite" => "48",
                    ],
                ],
            ],
            "5. Kyu - 4. Kyu" => [
                "9-10" => [
                    "m" => [
                        "Jiyu Ippon Kumite" => "34",
                        "Shobu Ippon Kumite" => "36",
                    ],
                    "w" => [
                        "Jiyu Ippon Kumite" => "35",
                        "Shobu Ippon Kumite" => "37",
                    ],
                ],
                "11-12" => [
                    "m" => [
                        "Jiyu Ippon Kumite" => "39",
                        "Shobu Ippon Kumite" => "41",
                    ],
                    "w" => [
                        "Jiyu Ippon Kumite" => "40",
                        "Shobu Ippon Kumite" => "42",
                    ],
                ],
                "13-14" => [
                    "m" => [
                        "Jiyu Ippon Kumite" => "43",
                        "Shobu Ippon Kumite" => "45",
                    ],
                    "w" => [
                        "Jiyu Ippon Kumite" => "44",
                        "Shobu Ippon Kumite" => "46",
                    ],
                ],
                "15-17" => [
                    "m" => [
                        "Shobu Ippon Kumite" => "47",
                    ],
                    "w" => [
                        "Shobu Ippon Kumite" => "48",
                    ],
                ],
            ],
            "3. Kyu - 6. Dan" => [
                "9-10" => [
                    "m" => [
                        "Shobu Ippon Kumite" => "36",
                    ],
                    "w" => [
                        "Shobu Ippon Kumite" => "37",
                    ],
                ],
                "11-12" => [
                    "m" => [
                        "Shobu Ippon Kumite" => "41",
                    ],
                    "w" => [
                        "Shobu Ippon Kumite" => "42",
                    ],
                ],
                "13-14" => [
                    "m" => [
                        "Shobu Ippon Kumite" => "45",
                    ],
                    "w" => [
                        "Shobu Ippon Kumite" => "46",
                    ],
                ],
                "15-17" => [
                    "m" => [
                        "Shobu Ippon Kumite" => "47",
                    ],
                    "w" => [
                        "Shobu Ippon Kumite" => "48",
                    ],
                ],
            ],
        ],
        "Team" => [
            "9. Kyu - 6. Dan" => [
                "8-11" => [
                    "m" => "11",
                    "w" => "11",
                ],
                "12-17" => [
                    "m" => "12",
                    "w" => "12",
                ],
            ]
        ]
    ],

    "fighting_systems" => [
        "dog-eats-dog" => [
            "name" => "Jeder-Gegen-Jeden",
            "min_fighters" => 2,
            "max_fighters" => 6,
        ],
        "ko-system" => [
            "name" => "KO-System",
            "min_fighters" => 2,
            "max_fighters" => 64,
        ],
        "double-ko-system" => [
            "name" => "Doppel-KO-System",
            "min_fighters" => 4,
            "max_fighters" => 64,
        ],
        "tables" => [
            "name" => "Tafelsystem",
            "min_fighters" => 2,
            "max_fighters" => 64,
        ],
        "ko-system-with-final-tables" => [
            "name" => "KO-System mit finalen Tafeln",
            "min_fighters" => 8,
            "max_fighters" => 64,
        ],
        "double-ko-system-with-final-tables" => [
            "name" => "Doppel-KO-System mit finalen Tafeln",
            "min_fighters" => 8,
            "max_fighters" => 64,
        ],
        "brazilian-ko-system" => [
            "name" => "Brasilianisches KO-System",
            "min_fighters" => 4,
            "max_fighters" => 64,
        ],
    ],

];
