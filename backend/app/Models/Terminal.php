<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Scout\Searchable;
use Silber\Bouncer\Database\HasRolesAndAbilities;

class Terminal extends Model implements
    AuthenticatableContract,
    AuthorizableContract
{
    use HasFactory;
    use Authenticatable;
    use Authorizable;
    use HasApiTokens;
    use Searchable;
    use HasRolesAndAbilities;

    protected $fillable = [
        'slug',
        'name',
    ];

    /**
     * Setup events.
     *
     * @return void
     */
    protected static function booted()
    {
        static::created(function (Terminal $terminal) {
            $terminal->assign('terminal');
        });
    }

    /**
     * Return true if the termianl has a token assigned
     *
     * @return bool
     */
    public function hasDefaultToken()
    {
        return $this->tokens->contains(function ($t) {
            return $t->name === 'default';
        });
    }

    /**
     * Serialize model for searching
     *
     * @return array
     */
    public function toSearchableArray()
    {
        return [
            'id' => (int)$this->id,
            'name' => $this->name,
        ];
    }
}
