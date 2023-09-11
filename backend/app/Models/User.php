<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Event;
use Laravel\Cashier\Billable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Scout\Searchable;
use OwenIt\Auditing\Auditable as AuditingAuditable;
use OwenIt\Auditing\Contracts\Auditable;
use OwenIt\Auditing\Events\AuditCustom;
use Silber\Bouncer\Database\HasRolesAndAbilities;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\File;
use Storage;
use function Illuminate\Events\queueable;

class User extends Authenticatable implements HasMedia, Auditable
{
    use HasFactory;
    use Notifiable;
    use Searchable;
    use Billable;
    use HasApiTokens;
    use InteractsWithMedia;
    use AuditingAuditable;
    use HasRolesAndAbilities;

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
        'terminal_pincode',
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

    /**
     * Associate locator entities with users.
     *
     * @return \App\Models\MorphMany
     */
    public function locators(): MorphMany
    {
        return $this->morphMany(Locator::class, 'target');
    }

    /**
     * Define relationship with badges
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function badges(): BelongsToMany
    {
        return $this
          ->belongsToMany(Badge::class)
          ->as('completion')
          ->withTimestamps()
          ->withPivot('notes', 'instructor_id', 'id', 'revoked')
          ->using(BadgeUser::class);
    }

    /**
     * Hasone association
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function volunteer(): HasOne
    {
        return $this->hasOne(Volunteer::class, 'id', 'id');
    }

    /**
     * active volunteer scope
     *
     * @param \Illuminate\Contracts\Database\Query\Builder $builder
     * @param bool $active
     * @return \Illuminate\Contracts\Database\Query\Builder
     */
    public function scopeActiveVolunteer(Builder $builder, bool $active): Builder
    {
        return $builder->whereHas('volunteer', function (Builder $query) use ($active) {
            return $query->active($active);
        });
    }

    /**
     * Scope no volunter record
     *
     * @param \Illuminate\Contracts\Database\Query\Builder $builder
     * @return \Illuminate\Contracts\Database\Query\Builder
     */
    public function scopeNeverVolunteer(Builder $builder): Builder
    {
        return $builder->doesntHave('volunteer');
    }

    /**
     * Scope users that can be activated as volunteers
     *
     * @param \Illuminate\Contracts\Database\Query\Builder $builder
     * @return \Illuminate\Contracts\Database\Query\Builder
     */
    public function scopeCanActivateVolunteer(Builder $builder): Builder
    {
        return $builder
            ->doesntHave('volunteer')
            ->orWhereHas('volunteer', function (Builder $query) {
                return $query->active(false);
            });
    }

    /**
     * Scope punched in volunteers
     *
     * @param \Illuminate\Contracts\Database\Query\Builder $builder
     * @param bool $punchedIn
     * @return \Illuminate\Contracts\Database\Query\Builder
     */
    public function scopePunchedInVolunteer(Builder $builder, bool $punchedIn): Builder
    {
        return $punchedIn ? $builder->whereHas('volunteer.currentHour') :
          $builder->whereDoesntHave('volunteer.currentHour');
    }

    /**
     * Return the users phone number for inclusion in their stripe profile
     *
     * @return string | null
     */
    public function stripePhone()
    {
        if (!empty($this->phones)) {
            return $this->phones[0]['number'];
        }

        return null;
    }

    /**
     * Return the users address for inclusion in their stripe profile.
     *
     * @return array | null
     */
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
    public function toSearchableArray(): array
    {
        return [
            'id' => (int)$this->id,
            'email' => $this->email,
            'name' => $this->name,
            'preferred_name' => $this->preferred_name,
        ];
    }

    /**
     * Return an attribute for the current subscription
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function currentSubscription(): Attribute
    {
        return new Attribute(
            get: fn () => $this->subscription()
        );
    }

    /**
     * Return an attribute for all invoices
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function allInvoices(): Attribute
    {
        return new Attribute(
            get: fn() => $this->invoices(true)->toArray()
        );
    }

    /**
     * Return the avatar media object as an attribute
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function avatar(): Attribute
    {
        return new Attribute(
            get: fn() => $this->getFirstMedia('avatar')
        );
    }

    /**
     * Register media collections
     *
     * @return void
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('avatar')
            ->withResponsiveImages()
            ->acceptsFile(function (File $file) {
                return in_array($file->mimeType, ['image/png', 'image/jpeg']);
            })
            ->useFallbackPath(public_path('storage/id_placeholder.png'))
            ->singleFile();

        $this->addMediaCollection('overlays');
    }

    /**
     * Generate an IDcard Overlay
     *
     * @param int $id
     * @return bool
     */
    public function generateIdCard($id)
    {
        $name = "overlay:{$id}:{$this->id}.png";

        return Storage::put($name, Overlay::make($id, $this));
    }

    /**
     * Dispatch a custom audit event
     *
     * @param string $eventName
     * @param array $old
     * @param array $new
     * @return void
     */
    public function dispatchCustomAudit(string $eventName, array $old, array $new = [])
    {
        $auditEvent = $this->auditEvent;
        $auditCustomOld = $this->auditCustomOld;
        $auditCustomNew = $this->auditCustomNew;

        $this->auditEvent = $eventName;
        $this->isCustomEvent = true;
        $this->auditCustomOld = $old;
        $this->auditCustomNew = $new;

        Event::dispatch(AuditCustom::class, [$this]);

        $this->isCustomEvent = false;
        $this->auditEvent = $auditEvent;
        $this->auditCustomNew = $auditCustomNew;
        $this->auditCustomOld = $auditCustomOld;
    }

    /**
     * Retrieve a badge if the user has been granted it.
     *
     * @param string $id
     * @return mixed
     */
    public function badge(string $id): ?Badge
    {
        return $this->badges()->where('badges.id', $id)->get()->first();
    }

    /**
     * Attach a badge to this user.
     *
     * @param array $input Badge
     * @return bool
     */
    public function attachBadge(array $input): bool
    {
        $badgeUser = BadgeUser::firstOrCreate(
            [
            'badge_id' => $input['badge_id'],
            'user_id' => $this->id,
            ],
            $input
        );
        $badgeUser->revoked = false;
        $this->dispatchCustomAudit(
            'attachBadge',
            [],
            [
                'completion' => $input,
            ]
        );

        return $badgeUser->save();
    }

    /**
     * Detach a badge from this user.
     *
     * @param array $input
     * @return void
     */
    public function detachBadge(array $input): void
    {
        $badgeUser = BadgeUser::where([
            'badge_id' => $input['badge_id'],
            'user_id' => $this->id,
        ])->first();

        $this->dispatchCustomAudit('detachBadge', [], ['completion' => $input]);

        if ($badgeUser) {
            $badgeUser->revoked = true;
            $badgeUser->save();
        }
    }

    /**
     * Badge users paginator
     *
     * @param [type] $user
     * @param [type] $args
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function paginateBadgeUsers(User $user, $args): LengthAwarePaginator
    {
        $search = $args['q'] ?? '';
        $search = "%{$search}%";
        $query = $user
            ->badges()
            ->where(function (Builder $query) use ($search) {
                $query
                    ->where('name', 'like', $search);
            })
            ->paginate(
                $args['perPage'] ?? 10,
                ['*'],
                'page',
                $args['page']
            );

            return $query;
    }
}
