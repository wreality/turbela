<?php
declare(strict_types=1);

namespace App\GraphQL\Types\BadgeMutations;

use App\Models\User;

final class UpdateUserBadges
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     * @return \App\Models\User
     */
    public function __invoke($_, array $args): User
    {
        /** @var \App\Models\User $user */
        $user = User::findOrFail($args['id']);

        if (!empty($args['grant'])) {
            foreach ($args['grant'] as $grant) {
                $user->attachBadge($grant);
            }
        }
        if (!empty($args['revoke'])) {
            foreach ($args['revoke'] as $revoke) {
                $user->detachBadge($revoke);
            }
        }

        return $user;
    }
}
