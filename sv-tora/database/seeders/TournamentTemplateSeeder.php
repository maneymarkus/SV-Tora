<?php

namespace Database\Seeders;

use App\Models\TournamentTemplate;
use Illuminate\Database\Seeder;

class TournamentTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TournamentTemplate::create([
            "tournament_name" => "Tora-Pokal",
            "age_min" => 8,
            "age_max" => 16,
            "graduation_min" => "7. Kyu",
            "graduation_max" => "6. Dan",
            "teams" => true,
            "kihon" => false,
            "examination_types" => "Kata;Kumite;Teams",
        ]);

        TournamentTemplate::create([
            "tournament_name" => "Weihnachtsturnier",
            "age_min" => 8,
            "age_max" => 16,
            "graduation_min" => "7. Kyu",
            "graduation_max" => "6. Dan",
            "teams" => true,
            "kihon" => false,
            "examination_types" => "Kata;Kumite;Teams",
        ]);

        TournamentTemplate::create([
            "tournament_name" => "Nachwuchsturnier",
            "age_min" => 6,
            "age_max" => 12,
            "graduation_min" => "9. Kyu",
            "graduation_max" => "8. Kyu",
            "teams" => false,
            "kihon" => true,
            "examination_types" => "Kihon;Kata;Kumite",
        ]);

    }
}
