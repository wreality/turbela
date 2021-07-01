<?php

namespace App\GraphQL\Queries;

use App\Models\User as User;

class UserUtilities
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function userExists($_, array $args)
    {
        return User::where('email', $args['email'])->exists();
    }
}
