<?php
declare(strict_types=1);

namespace App\GraphQL\Types\Badge;

final class Users
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        var_dump($_);
        var_dump('HERE');
        // TODO implement the resolver
    }
}
