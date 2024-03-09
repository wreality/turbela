<?php
declare(strict_types=1);

namespace App\GraphQL\Types\VolunteerMutations;

use App\Models\VolunteerHour;
use Nuwave\Lighthouse\Exceptions\AuthorizationException;

final class ReviewHours
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     * @return array
     */
    public function __invoke($_, array $args)
    {
        /** @var \App\Models\User $user */
        $user = auth()->user();

        $edits = $args['input'];

        $result = [];

        foreach ($edits as $edit) {
            $time = VolunteerHour::findOrFail($edit['id']);
            if (!$user->can('review', $time)) {
                throw new AuthorizationException('NOT_AUTHORIZED');
            }
            $time->fill($edit)->saveOrFail();
            $result[] = $time;
        }

        return $result;
    }
}
