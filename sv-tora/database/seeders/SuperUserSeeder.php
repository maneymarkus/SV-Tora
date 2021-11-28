<?php

namespace Database\Seeders;

use App\Helper\GeneralHelper;
use App\Helper\Permissions;
use App\Helper\Roles;
use App\Models\Club;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class SuperUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws \Exception
     */
    public function run()
    {
        $superUser = User::create([
            "name" => "Superuser",
            "username" => "SuperUser",
            "email" => GeneralHelper::generateUniqueRandomToken(),
            "password" => Hash::make("SVTora12345"),
            "role_id" => Role::getRoleId(Roles::ADMIN),
            "club_id" => Club::where("name", "=", "SV Tora")->first()->id,
        ]);

        $allPermissions = Permission::all()->all();
        $superUser->allowTo($allPermissions);
    }
}
