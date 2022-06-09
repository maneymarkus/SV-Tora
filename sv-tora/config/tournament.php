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
        "Kumite (Kihon Ippon)",
        "Kumite (Jiyu Ippon)",
        "Kumite (Shobu Ippon)",
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
                "11-12" => [
                    "m" => "5",
                    "w" => "6",
                ]
            ]
        ],
        "Kata" => [
            "8. Kyu" => [
                "6-8" => [
                    "m" => "7",
                    "w" => "8",
                ],
                "9-10" => [
                    "m" => "9",
                    "w" => "10",
                ],
                "11-12" => [
                    "m" => "11",
                    "w" => "12",
                ],
            ],
            "7. Kyu - 6. Kyu" => [
                "8-10" => [
                    "m" => "21",
                    "w" => "22",
                ],
                "11-12" => [
                    "m" => "25",
                    "w" => "26",
                ],
                "13-14" => [
                    "m" => "29",
                    "w" => "30",
                ],
                "15-17" => [
                    "m" => "33",
                    "w" => "34"
                ],
                "18-20" => [
                    "m" => "37",
                    "w" => "38",
                ],
            ],
            "5. Kyu - 6. Dan" => [
                "8-10" => [
                    "m" => "23",
                    "w" => "24",
                ],
                "11-12" => [
                    "m" => "27",
                    "w" => "28",
                ],
                "13-14" => [
                    "m" => "31",
                    "w" => "32",
                ],
                "15-17" => [
                    "m" => "35",
                    "w" => "36",
                ],
                "18-20" => [
                    "m" => "39",
                    "w" => "40",
                ],
                "21-99" => [
                    "m" => "41",
                    "w" => "42",
                ],
            ]
        ],
        "Kumite" => [
            "8. Kyu" => [
                "6-8" => [
                    "m" => "13",
                    "w" => "14",
                ],
                "9-10" => [
                    "m" => "15",
                    "w" => "16",
                ],
                "11-12" => [
                    "m" => "17",
                    "w" => "18",
                ],
            ],
            "7. Kyu" => [
                "9-10" => [
                    "m" => "43",
                    "w" => "43",
                ],
                "11-12" => [
                    "m" => "48",
                    "w" => "48",
                ],
                "13-14" => [
                    "m" => "53",
                    "w" => "53",
                ],
                "15-17" => [
                    "m" => "58",
                    "w" => "58",
                ],
            ],
            "6. Kyu" => [
                "9-10" => [
                    "m" => [
                        "Kihon Ippon Kumite" => "43",
                        "Jiyu Ippon Kumite" => "44",
                        "Shobu Ippon Kumite" => "46",
                    ],
                    "w" => [
                        "Kihon Ippon Kumite" => "43",
                        "Jiyu Ippon Kumite" => "45",
                        "Shobu Ippon Kumite" => "47",
                    ],
                ],
                "11-12" => [
                    "m" => [
                        "Kihon Ippon Kumite" => "48",
                        "Jiyu Ippon Kumite" => "49",
                        "Shobu Ippon Kumite" => "51",
                    ],
                    "w" => [
                        "Kihon Ippon Kumite" => "48",
                        "Jiyu Ippon Kumite" => "50",
                        "Shobu Ippon Kumite" => "52",
                    ],
                ],
                "13-14" => [
                    "m" => [
                        "Kihon Ippon Kumite" => "53",
                        "Jiyu Ippon Kumite" => "54",
                        "Shobu Ippon Kumite" => "56",
                    ],
                    "w" => [
                        "Kihon Ippon Kumite" => "53",
                        "Jiyu Ippon Kumite" => "55",
                        "Shobu Ippon Kumite" => "57",
                    ],
                ],
                "15-17" => [
                    "m" => [
                        "Kihon Ippon Kumite" => "58",
                        "Jiyu Ippon Kumite" => "59",
                        "Shobu Ippon Kumite" => "61",
                    ],
                    "w" => [
                        "Kihon Ippon Kumite" => "58",
                        "Jiyu Ippon Kumite" => "60",
                        "Shobu Ippon Kumite" => "62",
                    ],
                ],
            ],
            "5. Kyu - 4. Kyu" => [
                "9-10" => [
                    "m" => [
                        "Jiyu Ippon Kumite" => "44",
                        "Shobu Ippon Kumite" => "46",
                    ],
                    "w" => [
                        "Jiyu Ippon Kumite" => "45",
                        "Shobu Ippon Kumite" => "47",
                    ],
                ],
                "11-12" => [
                    "m" => [
                        "Jiyu Ippon Kumite" => "49",
                        "Shobu Ippon Kumite" => "51",
                    ],
                    "w" => [
                        "Jiyu Ippon Kumite" => "50",
                        "Shobu Ippon Kumite" => "52",
                    ],
                ],
                "13-14" => [
                    "m" => [
                        "Jiyu Ippon Kumite" => "54",
                        "Shobu Ippon Kumite" => "56",
                    ],
                    "w" => [
                        "Jiyu Ippon Kumite" => "55",
                        "Shobu Ippon Kumite" => "57",
                    ],
                ],
                "15-17" => [
                    "m" => [
                        "Jiyu Ippon Kumite" => "59",
                        "Shobu Ippon Kumite" => "61",
                    ],
                    "w" => [
                        "Jiyu Ippon Kumite" => "60",
                        "Shobu Ippon Kumite" => "62",
                    ],
                ],
                "18-20" => [
                    "m" => [
                        "Jiyu Ippon Kumite" => "63",
                        "Shobu Ippon Kumite" => "65",
                    ],
                    "w" => [
                        "Jiyu Ippon Kumite" => "64",
                        "Shobu Ippon Kumite" => "66",
                    ],
                ],
            ],
            "3. Kyu - 6. Dan" => [
                "9-10" => [
                    "m" => [
                        "Shobu Ippon Kumite" => "46",
                    ],
                    "w" => [
                        "Shobu Ippon Kumite" => "47",
                    ],
                ],
                "11-12" => [
                    "m" => [
                        "Shobu Ippon Kumite" => "51",
                    ],
                    "w" => [
                        "Shobu Ippon Kumite" => "52",
                    ],
                ],
                "13-14" => [
                    "m" => [
                        "Shobu Ippon Kumite" => "56",
                    ],
                    "w" => [
                        "Shobu Ippon Kumite" => "57",
                    ],
                ],
                "15-17" => [
                    "m" => [
                        "Shobu Ippon Kumite" => "61",
                    ],
                    "w" => [
                        "Shobu Ippon Kumite" => "62",
                    ],
                ],
                "18-20" => [
                    "m" => [
                        "Shobu Ippon Kumite" => "65",
                    ],
                    "w" => [
                        "Shobu Ippon Kumite" => "66",
                    ],
                ],
                "21-99" => [
                    "m" => [
                        "Shobu Ippon Kumite" => "67",
                    ],
                    "w" => [
                        "Shobu Ippon Kumite" => "68",
                    ],
                ],
            ],
        ],
        "Team" => [
            "9. Kyu - 6. Dan" => [
                "8-12" => [
                    "m" => "19",
                    "w" => "19",
                ],
                "13-20" => [
                    "m" => "20",
                    "w" => "20",
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
