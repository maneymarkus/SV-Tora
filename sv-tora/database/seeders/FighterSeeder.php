<?php

namespace Database\Seeders;

use App\Models\Fighter;
use Illuminate\Database\Seeder;

class FighterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Fighter::factory()->count(50)->create();
    }
}
