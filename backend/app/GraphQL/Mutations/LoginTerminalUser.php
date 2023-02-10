<?php
declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

final class LoginTerminalUser
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     * @return array
     */
    public function __invoke($_, array $args)
    {
        /** @var \App\Models\Terminal $terminal */
        $terminal = Auth::user();
        $email = $args['email'];
        $password = $args['password'];
        $guard = Auth::guard('web');
        $result = $guard->validate(['email' => $email, 'password' => $password]);

        if (!$result) {
            throw new \Error('Unauthenticated');
        }

        /** @var \App\Models\User $user */
        $user = User::where(['email' => $email])->firstOrFail();

        $user->tokens()->where(['name' => $terminal->slug])->delete();
        $token = $user->createToken($terminal->slug);

        return [
            'token' => $token->plainTextToken,
            'user' => $user,
        ];
    }
}
