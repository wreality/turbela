<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class BadgeUser extends Pivot
{
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
}
