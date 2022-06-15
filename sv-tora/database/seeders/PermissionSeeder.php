<?php

namespace Database\Seeders;

use App\Helper\Permissions;
use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (Permissions::PERMISSIONS as $perm_name => $perm_def) {
            Permission::create([
                "name" => $perm_name,
                "description" => $perm_def
            ]);
        }
    }
}
