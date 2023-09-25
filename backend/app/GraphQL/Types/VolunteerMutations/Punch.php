<?php
declare(strict_types=1);

namespace App\GraphQL\Types\VolunteerMutations;

use App\Models\Volunteer;
use App\Models\VolunteerHour;
use Carbon\Carbon;
use Nuwave\Lighthouse\Exceptions\ValidationException;

final class Punch
{
    /**
     * Edit a volunteer user.
     *
     * @param null $_
     * @param array $args
     * @return \App\Models\VolunteerHour
     */
    public function __invoke($_, array $args): VolunteerHour
    {
        $volunteer = Volunteer::find($args['id']);

        if (!$volunteer) {
            throw ValidationException::withMessages(['id' => 'User is not an active volunteer']);
        }

        $current = $volunteer->currentHour;

        $direction = $args['direction'];

        if ($direction == 'in') {
            if ($current) {
                throw ValidationException::withMessages(['direction' => 'This user is already punched in']);
            }
            $current = new VolunteerHour();
            $current->forceFill([
                'volunteer_id' => $args['id'],
                'start' => Carbon::now(),
            ]);
            $current->save();
        } else {
            if (!$current) {
                throw ValidationException::withMessages(['direction' => 'This user is not punched in']);
            }
            $current->end = Carbon::now();
            $current->save();
        }

        return $current;
    }
}
