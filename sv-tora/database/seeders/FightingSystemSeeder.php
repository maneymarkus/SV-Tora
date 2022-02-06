<?php

namespace Database\Seeders;

use App\Models\FightingSystem;
use Illuminate\Database\Seeder;

class FightingSystemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (config("tournament.fighting_systems") as $fightingSystem) {
            FightingSystem::create([
                "name" => $fightingSystem["name"],
                "min_fighters" => $fightingSystem["min_fighters"],
                "max_fighters" => $fightingSystem["max_fighters"],
            ]);
        }
    }
}
