<?php
declare(strict_types=1);

namespace App\GraphQL\Types\VolunteerMutations;

use App\Models\Volunteer;

final class UpdateVolunteer
{
    /**
     * Edit a volunteer user.
     *
     * @param null $_
     * @param array $args
     * @return \App\Models\Volunteer
     */
    public function __invoke($_, array $args): Volunteer
    {
        $volunteer = Volunteer::updateOrCreate(['id' => $args['id']], $args);

        return $volunteer;
    }
}
