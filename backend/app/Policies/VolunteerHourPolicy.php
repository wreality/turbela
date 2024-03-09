<?php
declare(strict_types=1);

namespace App\Policies;

use App\Models\User;
use App\Models\VolunteerHour;
use Illuminate\Auth\Access\HandlesAuthorization;

class VolunteerHourPolicy
{
    use HandlesAuthorization;

    /**
     * Always allow admins.
     *
     * @param \App\Models\User $user
     * @param string $_
     * @return bool|null
     */
    public function before(User $user, string $_)
    {
        if ($user->isA('admin') || $user->isA('super-admin')) {
            return true;
        }

        return null;
    }

    /**
     * Allow edits if the user
     *
     * @param \App\Models\User $user
     * @param \App\Models\VolunteerHour $volunteerHour
     * @return bool | void
     */
    public function edit(User $user, VolunteerHour $volunteerHour): bool
    {
        if ($user->id === $volunteerHour->volunteer_id) {
            if ($volunteerHour->approved) {
                return false;
            }

            return true;
        }
    }

    /**
     * Allow volunteers to create volunteer hours
     *
     * @param \App\Models\User $user
     * @return bool
     */
    public function create(User $user): bool
    {
        return $user?->volunteer->active;
    }

    /**
     * Allow reviewing of user hours
     *
     * @param \App\Models\User $user
     * @param \App\Models\VolunteerHour $hour
     * @return bool|null
     */
    public function review(User $user, VolunteerHour $hour): bool | null
    {
        //Do not allow reviewing one's own hours.
        if ($user->id === $hour->volunteer_id) {
            return false;
        }

        if ($user->id === $hour->supervisor_id) {
            return true;
        }

        return null;
    }
}
