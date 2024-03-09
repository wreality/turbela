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
            throw ValidationException::withMessages(['id' => 'NOT_ACTIVE']);
        }

        $current = $volunteer->currentHour ?? new VolunteerHour();

        $current->forceFill([
            'volunteer_id' => $args['id'],
        ]);

        if (!empty($args['supervisor_id'])) {
            $current->supervisor_id = $args['supervisor_id'];
        }

        $direction = $args['direction'];

        if ($direction == 'in') {
            if ($current->exists) {
                throw ValidationException::withMessages(['direction' => 'DUPLICATE']);
            }
            $current->start = Carbon::now();
            $current->save();
        } else {
            if (!$current) {
                throw ValidationException::withMessages(['direction' => 'NOT_FOUND']);
            }
            if (empty($current->supervisor_id)) {
                throw ValidationException::withMessages(['supervisor_id' => 'REQUIRED']);
            }
            $current->end = Carbon::now();
            $current->save();
        }

        return $current;
    }
}
