<?php

namespace Database\Seeders;

use App\Helper\Permissions;
use App\Helper\Roles;
use App\Models\Club;
use App\Models\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table("roles")->insert([
            [
                "name" => Roles::ADMIN,
                "description" => "Depicts an administrator of this application which by default has several permissions more than a regular user."
            ],
            [
                "name" => Roles::REGULAR,
                "description" => "The regular user only has the minimum required amount of permissions to constructively use this application."
            ],
        ]);

        Club::create([
            "name" => "SV Tora",
        ]);

        foreach (Permissions::PERMISSIONS as $perm_name => $perm_def) {
            Permission::create([
                "name" => $perm_name,
                "description" => $perm_def
            ]);
        }

        $this->call([
            SuperUserSeeder::class
        ]);
    }
}
