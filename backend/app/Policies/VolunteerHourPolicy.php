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
}
