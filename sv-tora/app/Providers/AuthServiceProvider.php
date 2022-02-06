<?php

namespace App\Providers;

use App\Models\EnrolledFighter;
use App\Models\EnrolledPerson;
use App\Models\EnrolledTeam;
use App\Models\Fighter;
use App\Models\Person;
use App\Models\Team;
use App\Models\Tournament;
use App\Models\User;
use App\Policies\CoachPolicy;
use App\Policies\EnrolledFighterPolicy;
use App\Policies\EnrolledPersonPolicy;
use App\Policies\EnrolledTeamPolicy;
use App\Policies\FighterPolicy;
use App\Policies\PersonPolicy;
use App\Policies\TeamPolicy;
use App\Policies\TournamentPolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Person::class => PersonPolicy::class,
        Fighter::class => FighterPolicy::class,
        Team::class => TeamPolicy::class,
        User::class => UserPolicy::class,
        Tournament::class => TournamentPolicy::class,
        EnrolledPerson::class => EnrolledPersonPolicy::class,
        EnrolledFighter::class => EnrolledFighterPolicy::class,
        EnrolledTeam::class => EnrolledTeamPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        /**
         * This gate quickly checks if the currently authenticated user is an admin
         */
        Gate::define("admin", function (User $user) {
            return $user->isAdmin();
        });

        /**
         * This gate quickly checks if a given $user has a given $permission
         */
        Gate::define("has-permission", function (User $user, String $permission) {
            if (!Gate::forUser($user)->allows("admin")) {
                // Users that are no admins automatically don't have any additional permissions
                return false;
            }
            return $user->permissions->flatten()->pluck("name")->unique()->contains($permission);
        });

    }
}
