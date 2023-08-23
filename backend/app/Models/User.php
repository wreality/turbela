<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
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
          ->withPivot('notes', 'instructor_id')
          ->using(BadgeUser::class);
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
                return $file->mimeType === 'image/png';
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
     * Attach a badge to this user.
     *
     * @param array $input Badge
     * @return mixed
     */
    public function attachBadge(array $input)
    {
        $badge = Badge::find($input['badge_id'])->toArray();
        $this->dispatchCustomAudit(
            'attachBadge',
            [],
            [
                'badge' => $badge,
                'completion' => $input,
            ]
        );
        $badgeUser = new BadgeUser();
        $badgeUser->fill($input);
        $badgeUser->user_id = $this->id;

        return $badgeUser->save();
    }

    /**
     * Detach a badge from this user.
     *
     * @param array $badge
     * @return mixed
     */
    public function detachBadge(array $badge)
    {
        $this->dispatchCustomAudit('detachBadge', [$badge]);
        $badgeUser = BadgeUser::find($badge['id']);

        return $badgeUser->delete();
    }

    /**
     * Badge users paginator
     *
     * @param [type] $user
     * @param [type] $args
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function paginateBadgeUsers(User $user, $args)
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
