<?php

namespace Database\Seeders;

use App\Helper\Permissions;
use App\Helper\Roles;
use App\Models\Category;
use App\Models\Club;
use App\Models\Fighter;
use App\Models\FightPlace;
use App\Models\Permission;
use App\Models\Role;
use App\Models\Team;
use App\Models\Tournament;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $this->call([
            DevSeeder::class,
            #ProdSeeder::class
        ]);

    }
}
