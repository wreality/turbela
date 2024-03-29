<?php
declare(strict_types=1);

namespace App\Models;

use App\Builders\VolunteerHourBuilder;
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

    protected $guarded = [];

    /**
     * Volunteer relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function volunteer(): BelongsTo
    {
        return $this->belongsTo(Volunteer::class, 'volunteer_id', 'id');
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

    /**
     * Load custom builder
     *
     * @param [type] $query
     * @return \App\Builders\VolunteerHourBuilder
     */
    public function newEloquentBuilder($query)
    {
        return new VolunteerHourBuilder($query);
    }
}
