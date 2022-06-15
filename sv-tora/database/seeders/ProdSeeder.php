<?php

namespace Database\Seeders;

use App\Helper\Permissions;
use App\Helper\Roles;
use App\Models\Club;
use App\Models\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProdSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $svTora = Club::create([
            "name" => "SV Tora",
        ]);

        $this->call([
            RoleSeeder::class,
            PermissionSeeder::class,
            SuperUserSeeder::class,
            GlobalSettingSeeder::class,
            FightingSystemSeeder::class,
            TournamentTemplateSeeder::class,
        ]);
    }
}
