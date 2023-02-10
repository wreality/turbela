<?php
declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

final class LogoutTerminalUser
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     * @return \App\Models\User
     */
    public function __invoke($_, array $args)
    {
        $id = $args['id'];

        /** @var \App\Models\Terminal $terminal */
        $terminal = Auth::user();

        $user = User::find($id);

        if (!$user) {
            throw new \Error('Unable to locate user');
        }

        $user->tokens()->where(['name' => $terminal->slug])->delete();

        return $user;
    }
}
