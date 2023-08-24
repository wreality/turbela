<?php
declare(strict_types=1);

namespace App\GraphQL\Types\BadgeMutations;

use App\Models\Badge;
use App\Models\User;

final class UpdateBadgeUsers
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     * @return \App\Models\Badge
     */
    public function __invoke($_, array $args): Badge
    {
        /** @var \App\Models\Badge $badge */
        $badge = Badge::findOrFail($args['id']);
        if (!empty($args['grant'])) {
            foreach ($args['grant'] as $grant) {
                $user = User::findOrFail($grant['user_id']);
                $user->attachBadge([...$grant, 'badge_id' => $badge->id]);
            }
        }
        if (!empty($args['revoke'])) {
            foreach ($args['revoke'] as $revoke) {
                $user = User::findOrFail($revoke['user_id']);
                $user->detachBadge([...$revoke, 'badge_id' => $badge->id]);
            }
        }

        return $badge->refresh();
    }
}
