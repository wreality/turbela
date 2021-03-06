<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Silber\Bouncer\Database\HasRolesAndAbilities;
use Laravel\Scout\Searchable;

class User extends Authenticatable
{
    use HasFactory;
    use Notifiable;
    use HasRolesAndAbilities;
    use Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Return array of abilities in string form.
     */
    public function getAbilitiesArray() {
        return $this->getAbilities()->map(function ($ability) {
            $id = $ability->entity_id ? (':' . $ability->entity_id) : '';
            $model = $ability->entity_type ? (':' . str_replace('App\\Models\\', '', $ability->entity_type)) : '';
            return $ability->name . $model . $id;
        });
    }

    public function toSearchableArray()
    {
        $array = $this->toArray();

        return $array;
    }
}
