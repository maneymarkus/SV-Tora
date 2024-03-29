<?php

namespace App\Policies;

use App\Models\EnrolledPerson;
use App\Models\Tournament;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Log;

class EnrolledPersonPolicy
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
     * @param \App\Models\User $user
     * @param Tournament $tournament
     * @return bool
     */
    public function viewAny(User $user, Tournament $tournament)
    {
        return !$tournament->excludedClubs->contains($user->club);
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\EnrolledPerson  $enrolledPerson
     * @return mixed
     */
    public function view(User $user, Tournament $tournament, EnrolledPerson $enrolledPerson)
    {
        return !$tournament->excludedClubs->contains($user->club) && $enrolledPerson->fighter->person->club == $user->club;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
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
     * @return mixed
     */
    public function enroll(User $user, Tournament $tournament)
    {
        if (Carbon::today() <= Carbon::parse($tournament->enrollment_start) || Carbon::today() >= Carbon::parse($tournament->enrollment_end)) {
            return false;
        }
        return !$tournament->excludedClubs->contains($user->club);
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param \App\Models\User $user
     * @param \App\Models\EnrolledPerson $enrolledPerson
     * @param Tournament $tournament
     * @return mixed
     */
    public function delete(User $user, Tournament $tournament, EnrolledPerson $enrolledPerson)
    {
        if (Carbon::today() <= Carbon::parse($tournament->enrollment_start) || Carbon::today() >= Carbon::parse($tournament->enrollment_end)) {
            return false;
        }
        return !$tournament->excludedClubs->contains($user->club) && $enrolledPerson->person->club == $user->club;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\EnrolledPerson  $enrolledPerson
     * @return mixed
     */
    public function restore(User $user, Tournament $tournament, EnrolledPerson $enrolledPerson)
    {
        if (Carbon::today() <= Carbon::parse($tournament->enrollment_start) || Carbon::today() >= Carbon::parse($tournament->enrollment_end)) {
            return false;
        }
        return !$tournament->excludedClubs->contains($user->club) && $enrolledPerson->person->club == $user->club;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\EnrolledPerson  $enrolledPerson
     * @return mixed
     */
    public function forceDelete(User $user, Tournament $tournament, EnrolledPerson $enrolledPerson)
    {
        if (Carbon::today() <= Carbon::parse($tournament->enrollment_start) || Carbon::today() >= Carbon::parse($tournament->enrollment_end)) {
            return false;
        }
        return !$tournament->excludedClubs->contains($user->club) && $enrolledPerson->person->club == $user->club;
    }
}
