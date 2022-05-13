<?php

namespace App\Policies;

use App\Models\Tournament;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TournamentPolicy
{
    use HandlesAuthorization;

    /**
     * Perform pre-authorization checks.
     *
     * @param  \App\Models\User  $user
     * @param  string  $ability
     * @return void|bool
     */
    public function before(User $user, $ability)
    {
        if ($user->isAdmin()) {
            return true;
        }
    }


    public function dashboard(User $user) {
        $tournament = Tournament::latest()->first();
        if ($tournament?->active && !$tournament?->excludedClubs->contains($user->club)) {
            return true;
        }
        return false;
    }


    /**
     * This function is used for the various api endpoints to prevent regular users to be able to use them
     *
     * @param User $user
     * @return false
     */
    public function onlyAdmin(User $user) {
        return false;
    }

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Tournament  $tournament
     * @return mixed
     */
    public function view(User $user, Tournament $tournament)
    {
        return $tournament->id === Tournament::latest()->first()->id && !$tournament->excludedClubs->contains($user->club);
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Tournament  $tournament
     * @return mixed
     */
    public function update(User $user, Tournament $tournament)
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Tournament  $tournament
     * @return mixed
     */
    public function delete(User $user, Tournament $tournament)
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Tournament  $tournament
     * @return mixed
     */
    public function restore(User $user, Tournament $tournament)
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Tournament  $tournament
     * @return mixed
     */
    public function forceDelete(User $user, Tournament $tournament)
    {
        return false;
    }
}
