<?php

namespace Database\Seeders;

use App\Helper\GeneralHelper;
use App\Helper\Roles;
use App\Models\Club;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SuperUserSeeder extends Seeder
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

        $admin = User::create([
            "name" => "Superuser",
            "username" => "SuperUser",
            "email" => GeneralHelper::generateUniqueRandomToken(),
            "password" => Hash::make("SVTora12345"),
            "role_id" => Role::getRoleId(Roles::ADMIN),
            "club_id" => $svTora->id,
        ]);
    }
}
