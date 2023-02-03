<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;
use Laravel\Scout\Searchable;
use Silber\Bouncer\Database\HasRolesAndAbilities;
use function Illuminate\Events\queueable;

class User extends Authenticatable
{
    use HasFactory;
    use Notifiable;
    use HasRolesAndAbilities;
    use Searchable;
    use Billable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'preferred_name',
        'phones', 'address',
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
        'phones' => 'json',
        'address' => 'json',
    ];

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::updated(queueable(function (User $customer) {
            if ($customer->hasStripeId()) {
                $customer->syncStripeCustomerDetails();
            }
        }));

        static::created(queueable(function (User $customer) {
            $customer->createOrGetStripeCustomer();
        }));
    }

    public function stripePhone()
    {
        if (!empty($this->phones)) {
            return $this->phones[0]['number'];
        }

        return null;
    }

    public function stripeAddress()
    {
        if (empty($this->address)) {
            return null;
        }

        return array_merge($this->address, ['country' => 'US']);
    }

    /**
     * Return array of abilities in string form.
     *
     * @return array
     */
    public function getAbilitiesArray()
    {
        return $this->getAbilities()->map(function ($ability) {
            $id = $ability->entity_id ? ':' . $ability->entity_id : '';
            $model = $ability->entity_type ? ':' . str_replace('App\\Models\\', '', $ability->entity_type) : '';

            return $ability->name . $model . $id;
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
            'email' => $this->email,
            'name' => $this->name,
            'preferred_name' => $this->preferred_name,
        ];
    }

    protected function currentSubscription(): Attribute
    {
        return new Attribute(
            get: fn () => $this->subscription()
        );
    }

    protected function allInvoices(): Attribute
    {
        return new Attribute(
            get: fn() => $this->invoices(true)->toArray()
        );
    }
}
