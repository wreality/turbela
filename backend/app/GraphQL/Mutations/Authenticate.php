<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;
use App\Exceptions\InvalidCredentials;

class Authenticate
{
    /**
     * Attempt to login the supplied user
     *
     * @param  null  $_
     * @param  array<string> $args
     */
    public function login($_, array $args)
    {
        /**
         * @var \Illuminate\Contracts\Auth\StatefulGuard
         */
        $guard = Auth::guard('web');
        if (!$guard->attempt(['email' => $args['email'], 'password' => $args['password']])) {
            throw new InvalidCredentials('Invalid credentials');
        }

        $user = $guard->user();

        return $user;

    }

    /**
     * Attempt to logout the current users.
     *
     * @param null $_
     * @param array<string> $args
     */
    public function logout($_, array $args) {

        /**
         * @var \Illuminate\Contracts\Auth\StatefulGuard
         */
        $guard = Auth::guard('web');

        $user = $guard->user();
        $guard->logout();

        return $user;
    }
}
