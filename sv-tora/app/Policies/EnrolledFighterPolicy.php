<?php

namespace App\Policies;

use App\Models\EnrolledFighter;
use App\Models\Fighter;
use App\Models\Tournament;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Access\HandlesAuthorization;

class EnrolledFighterPolicy
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
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user, Tournament $tournament)
    {
        if (Carbon::today() <= Carbon::parse($tournament->enrollment_start) || Carbon::today() >= Carbon::parse($tournament->enrollment_end)) {
            return false;
        }
        return !$tournament->excludedClubs->contains($user->club);
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\EnrolledFighter  $enrolledFighter
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Tournament $tournament, EnrolledFighter $enrolledFighter)
    {
        if (Carbon::today() <= Carbon::parse($tournament->enrollment_start) || Carbon::today() >= Carbon::parse($tournament->enrollment_end)) {
            return false;
        }
        return !$tournament->excludedClubs->contains($user->club) && $enrolledFighter->fighter->person->club === $user->club;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function add(User $user, Tournament $tournament)
    {
        if (Carbon::today() <= Carbon::parse($tournament->enrollment_start) || Carbon::today() >= Carbon::parse($tournament->enrollment_end)) {
            return false;
        }
        return !$tournament->excludedClubs->contains($user->club);
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\EnrolledFighter  $enrolledFighter
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function prepare(User $user, Tournament $tournament)
    {
        if (Carbon::today() <= Carbon::parse($tournament->enrollment_start) || Carbon::today() >= Carbon::parse($tournament->enrollment_end)) {
            return false;
        }
        return !$tournament->excludedClubs->contains($user->club);
    }

    /**
     * @param \App\Models\User $user
     * @param Tournament $tournament
     * @param Fighter $fighter
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function enroll(User $user, Tournament $tournament, Fighter $fighter)
    {
        if (Carbon::today() <= Carbon::parse($tournament->enrollment_start) || Carbon::today() >= Carbon::parse($tournament->enrollment_end)) {
            return false;
        }
        return !$tournament->excludedClubs->contains($user->club) && $fighter->person->club === $user->club;
    }


    /**
     *
     * @param \App\Models\User $user
     * @param Tournament $tournament
     * @param Fighter $fighter
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Tournament $tournament, EnrolledFighter $enrolledFighter)
    {
        if (Carbon::today() <= Carbon::parse($tournament->enrollment_start) || Carbon::today() >= Carbon::parse($tournament->enrollment_end)) {
            return false;
        }
        return !$tournament->excludedClubs->contains($user->club) && $enrolledFighter->fighter->person->club === $user->club;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\EnrolledFighter  $enrolledFighter
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Tournament $tournament, EnrolledFighter $enrolledFighter)
    {
        if (Carbon::today() <= Carbon::parse($tournament->enrollment_start) || Carbon::today() >= Carbon::parse($tournament->enrollment_end)) {
            return false;
        }
        return !$tournament->excludedClubs->contains($user->club) && $enrolledFighter->fighter->person->club === $user->club;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\EnrolledFighter  $enrolledFighter
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Tournament $tournament, EnrolledFighter $enrolledFighter)
    {
        if (Carbon::today() <= Carbon::parse($tournament->enrollment_start) || Carbon::today() >= Carbon::parse($tournament->enrollment_end)) {
            return false;
        }
        return !$tournament->excludedClubs->contains($user->club) && $enrolledFighter->fighter->person->club === $user->club;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\EnrolledFighter  $enrolledFighter
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Tournament $tournament, EnrolledFighter $enrolledFighter)
    {
        if (Carbon::today() <= Carbon::parse($tournament->enrollment_start) || Carbon::today() >= Carbon::parse($tournament->enrollment_end)) {
            return false;
        }
        return !$tournament->excludedClubs->contains($user->club) && $enrolledFighter->fighter->person->club === $user->club;
    }
}
