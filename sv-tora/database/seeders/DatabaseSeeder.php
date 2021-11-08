<?php

namespace Database\Seeders;

use App\Helper\Permissions;
use App\Helper\Roles;
use App\Models\Category;
use App\Models\Club;
use App\Models\Fighter;
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

        $svTora = Club::create([
            "name" => "SV Tora",
        ]);

        $admin = User::create([
            "name" => "Der admin",
            "username" => "admin",
            "email" => "admin@admin.de",
            "password" => Hash::make("admin"),
            "role_id" => Role::getRoleId(Roles::ADMIN),
            "club_id" => $svTora->id,
        ]);

        $marcus = User::create([
            "name" => "Marcus",
            "username" => "sucram",
            "email" => "sucram@homo.de",
            "password" => Hash::make("sucram"),
            "role_id" => Role::getRoleId(Roles::REGULAR),
            "club_id" => $svTora->id,
        ]);

        $no_club_user = User::create([
            "name" => "Vinzer",
            "username" => "vinz",
            "email" => "vinz@host.com",
            "password" => Hash::make("passwort"),
            "role_id" => Role::getRoleId(Roles::REGULAR),
        ]);

        foreach (Permissions::PERMISSIONS as $perm_name => $perm_def) {
            Permission::create([
                "name" => $perm_name,
                "description" => $perm_def
            ]);
        }

        $admin->allowTo([Permission::where("name", Permissions::INVITE_USERS)->first(), Permission::where("name", Permissions::INVITE_ADMINS)->first(), Permission::where("name", Permissions::DELETE_ADMINS)->first(), Permission::where("name", Permissions::UPDATE_ADMIN_PERMISSIONS)->first()]);

        $marcus->allowTo(Permission::where("name", Permissions::INVITE_USERS)->first());

        #$marcus->denyTo(Permission::where("name", Permissions::INVITE_USER)->first());

        $this->call([
            ClubSeeder::class,
            UserSeeder::class,
            TeamSeeder::class,
            PersonSeeder::class,
            FighterSeeder::class,
            GlobalSettingSeeder::class,
            TournamentTemplateSeeder::class,
        ]);

        $teams = Team::all();
        $fighters = Fighter::join("people", "fighters.person_id", "=", "people.id")->select("fighters.*", "people.club_id")->get();

        foreach ($teams as $team) {
            $countMembers = rand(2, 5);
            for ($i = 0; $i < $countMembers; $i++) {
                $fighter = $fighters->where("club_id", "=", $team->club_id)->random();
                $team->fighters()->attach($fighter);
            }
        }

        $tournament = Tournament::create([
            "tournament_template_id" => 2,
            "date" => "2021-12-04",
            "time" => "12:00",
            "place" => "Vor Ort",
            "enrollment_start" => "2021-11-01",
            "enrollment_end" => "2021-11-30",
        ]);

        Category::create([
            "name" => 1,
            "tournament_id" => $tournament->id,
            "examination_type" => "Kata",
            "graduation" => "7. Kyu",
            "age_start" => 11,
            "age_end" => 12,
            "sex" => "m",
        ]);

    }
}
