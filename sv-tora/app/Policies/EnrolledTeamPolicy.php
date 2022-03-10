<?php

namespace App\Policies;

use App\Models\EnrolledTeam;
use App\Models\Tournament;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Access\HandlesAuthorization;
use JetBrains\PhpStorm\Pure;

class EnrolledTeamPolicy
{
    use HandlesAuthorization;

    /**
     * Perform pre-authorization checks.
     *
     * @param  \App\Models\User  $user
     * @param  string  $ability
     * @return void|bool
     */
    #[Pure] public function before(User $user, $ability)
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
     * @return mixed
     */
    public function viewAny(User $user, Tournament $tournament)
    {
        return !$tournament->excludedClubs->contains($user->club);
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param \App\Models\User $user
     * @param Tournament $tournament
     * @param EnrolledTeam $enrolledTeam
     * @return mixed
     */
    public function view(User $user, Tournament $tournament, EnrolledTeam $enrolledTeam)
    {
        return !$tournament->excludedClubs->contains($user->club) && $enrolledTeam->team->club == $user->club;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param \App\Models\User $user
     * @param Tournament $tournament
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
     * @param \App\Models\User $user
     * @param Tournament $tournament
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
     * @param Tournament $tournament
     * @param EnrolledTeam $enrolledTeam
     * @return mixed
     */
    public function delete(User $user, Tournament $tournament, EnrolledTeam $enrolledTeam)
    {
        if (Carbon::today() <= Carbon::parse($tournament->enrollment_start) || Carbon::today() >= Carbon::parse($tournament->enrollment_end)) {
            return false;
        }
        return !$tournament->excludedClubs->contains($user->club) && $enrolledTeam->team->club == $user->club;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param \App\Models\User $user
     * @param Tournament $tournament
     * @param EnrolledTeam $enrolledTeam
     * @return mixed
     */
    public function restore(User $user, Tournament $tournament, EnrolledTeam $enrolledTeam)
    {
        if (Carbon::today() <= Carbon::parse($tournament->enrollment_start) || Carbon::today() >= Carbon::parse($tournament->enrollment_end)) {
            return false;
        }
        return !$tournament->excludedClubs->contains($user->club) && $enrolledTeam->team->club == $user->club;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param \App\Models\User $user
     * @param Tournament $tournament
     * @param EnrolledTeam $enrolledTeam
     * @return mixed
     */
    public function forceDelete(User $user, Tournament $tournament, EnrolledTeam $enrolledTeam)
    {
        if (Carbon::today() <= Carbon::parse($tournament->enrollment_start) || Carbon::today() >= Carbon::parse($tournament->enrollment_end)) {
            return false;
        }
        return !$tournament->excludedClubs->contains($user->club) && $enrolledTeam->team->club == $user->club;
    }
}
