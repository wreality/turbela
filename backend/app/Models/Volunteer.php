<?php
declare(strict_types=1);

namespace App\Models;

use Arr;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * Volunteer model
 *
 * @property \App\Models\User $user
 */
class Volunteer extends Model
{
    use HasFactory;

    protected $guarded = [];

    public $incrementing = false;

    /**
     * Boot model events
     *
     * @return void
     */
    protected static function booted()
    {
        static::created(function (Volunteer $model) {
            $model->user->dispatchCustomAudit('volunteer:create', [], []);
        });

        static::updated(function (Volunteer $model) {
            $old = [];
            $new = [];
            foreach ($model->getDirty() as $attribute => $value) {
                $old[$attribute] = Arr::get($model->original, $attribute);
                $new[$attribute] = Arr::get($model->attributes, $attribute);
            }

            $model->user->dispatchCustomAudit('volunteer:update', $old, $new);
        });
    }

    /**
     * BelongsTo association
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id', 'id');
    }

    /**
     * Final hours
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function hours(): HasMany
    {
        return $this->hasMany(VolunteerHour::class, 'volunteer_id', 'id')->final();
    }

    /**
     * Current hours
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function currentHour(): HasOne
    {
        return $this->hasOne(VolunteerHour::class, 'volunteer_id', 'id')->current();
    }

    /**
     * Active volunteers only.
     *
     * @param \Illuminate\Database\Eloquent\Builder $builder
     * @param bool $active
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive(Builder $builder, bool $active): Builder
    {
        return $builder->where('active', $active ? '1' : '0');
    }

    /**
     * Punched in volunteers only.
     *
     * @param \Illuminate\Database\Eloquent\Builder $builder
     * @param bool $punchedIn
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePunchedIn(Builder $builder, bool $punchedIn): Builder
    {
        return $punchedIn ? $builder->whereHas('currentHour') : $builder->whereDoesntHave('currentHour');
    }
}
