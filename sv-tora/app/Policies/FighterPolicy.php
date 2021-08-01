<?php

namespace App\Policies;

use App\Models\Fighter;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Log;

class FighterPolicy
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

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Fighter  $fighter
     * @return mixed
     */
    public function view(User $user, Fighter $fighter)
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determines whether the user can edit the model
     *
     * @param User $user
     * @param Fighter $fighter
     */
    public function edit(User $user, Fighter $fighter) {
        return $user->club->id === $fighter->person->club->id;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Fighter  $fighter
     * @return mixed
     */
    public function update(User $user, Fighter $fighter)
    {
        return $user->club->id === $fighter->person->club->id;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Fighter  $fighter
     * @return mixed
     */
    public function delete(User $user, Fighter $fighter)
    {
        return $user->club->id === $fighter->person->club->id;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Fighter  $fighter
     * @return mixed
     */
    public function restore(User $user, Fighter $fighter)
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Fighter  $fighter
     * @return mixed
     */
    public function forceDelete(User $user, Fighter $fighter)
    {
        return false;
    }
}
