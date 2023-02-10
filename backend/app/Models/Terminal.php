<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Laravel\Sanctum\HasApiTokens;

class Terminal extends Model implements
    AuthenticatableContract,
    AuthorizableContract
{
    use Authenticatable;
    use Authorizable;
    use HasApiTokens;

    protected $fillable = [
        'slug',
        'name',
    ];

    public function hasDefaultToken()
    {
        return $this->tokens->contains(function ($t) {
            return $t->name === 'default';
        });
    }
}
