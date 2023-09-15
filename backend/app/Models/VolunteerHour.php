<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VolunteerHour extends Model
{
    use HasFactory;

    protected $casts = [
        'start' => 'datetime',
        'end' => 'datetime',
    ];

    /**
     * Volunteer relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function volunteer(): BelongsTo
    {
        return $this->belongsTo(Volunteer::class, 'volunteer_id', 'user_id');
    }

    /**
     * Currently punched in records
     *
     * @param \Illuminate\Contracts\Database\Eloquent\Builder $builder
     * @return \Illuminate\Contracts\Database\Eloquent\Builder
     */
    public function scopeCurrent(Builder $builder)
    {
        return $builder->whereNull('end');
    }

    /**
     * Not punched in records
     *
     * @param \Illuminate\Contracts\Database\Eloquent\Builder $builder
     * @return \Illuminate\Contracts\Database\Eloquent\Builder
     */
    public function scopeFinal(Builder $builder)
    {
        return $builder->whereNotNull('end');
    }

    /**
     * Scope approved records
     *
     * @param \Illuminate\Contracts\Database\Eloquent\Builder $builder
     * @return \Illuminate\Contracts\Database\Eloquent\Builder
     */
    public function scopeApproved(Builder $builder, $approved)
    {
        return $builder->where('approved', $approved ? '1' : '0');
    }

    /**
     * Calculate the length of the block
     *
     * @return mixed
     */
    public function tenths(): ?int
    {
        if (!$this->start || !$this->end) {
            return null;
        }

        return (int)floor($this->end->diffInMinutes($this->start) / 6);
    }

    /**
     * Attach events.
     *
     * @return void
     */
    protected static function booted(): void
    {
        static::addGlobalScope('shiftOrder', function (Builder $builder) {
            $builder->latest('start');
        });

        static::saving(function (VolunteerHour $hour) {

            if (!$hour->start || !$hour->end) {
                $hour->length = null;
            } else {
                $hour->length = $hour->tenths();
            }

            if ($hour->approved) {
                //start and end must be set
                if (!$hour->start || !$hour->end) {
                    return false;
                }

                //Supervisor must be set
                if (!$hour->supervisor_id) {
                    return false;
                }
            }
        });
    }
}
