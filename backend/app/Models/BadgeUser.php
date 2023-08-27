<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class BadgeUser extends Pivot
{
    public $incrementing = true;

    public $timestamps = true;

    protected $fillable = [
        'instructor_id',
        'notes',
        'badge_id',
        'user_id',
    ];

    /**
     * Instructor relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function instructor(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * User relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Audits for this badge
     *
     * @return mixed
     */
    public function audits()
    {
        return $this->user->audits()->latest()->where('new_values->completion->badge_id', $this->badge_id);
    }
}
