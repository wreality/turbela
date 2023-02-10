<?php
declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Terminal;

final class ActivateTerminal
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     * @return \Laravel\Sanctum\NewAccessToken
     */
    public function __invoke($_, array $args)
    {
            $slug = $args['slug'];
            $terminal = Terminal::where(['slug' => $slug])->first();

        if (!$terminal) {
            return null;
        }
        if ($terminal->hasDefaultToken()) {
            return null;
        }
        $token = $terminal->createToken('default');

        return $token;
    }
}
