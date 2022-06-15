<?php

namespace Database\Seeders;

use App\Helper\Roles;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
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
    }
}
