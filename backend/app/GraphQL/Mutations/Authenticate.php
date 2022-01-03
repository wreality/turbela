<?php
declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Exceptions\InvalidCredentials;
use Illuminate\Support\Facades\Auth;

class Authenticate
{
    /**
     * Attempt to login the supplied user
     *
     * @param  null  $_
     * @param  array<string> $args
     * @return \App\Models\User
     */
    public function login($_, array $args)
    {
        /**
         * @var \Illuminate\Contracts\Auth\StatefulGuard
         */
        $guard = Auth::guard('web');
        if (!$guard->attempt(['email' => $args['email'], 'password' => $args['password']])) {
            throw new InvalidCredentials('INVALID_CREDENTIALS');
        }

        $user = $guard->user();

        return $user;
    }

    /**
     * Attempt to logout the current users.
     *
     * @param null $_
     * @param array<string> $_args
     * @return \App\Models\User
     */
    public function logout($_, array $_args)
    {
        /**
         * @var \Illuminate\Contracts\Auth\StatefulGuard
         */
        $guard = Auth::guard('web');

        $user = $guard->user();
        $guard->logout();

        return $user;
    }
}
