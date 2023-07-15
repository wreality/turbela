<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CourseSession extends Model
{
    use HasFactory;

    /**
     * Setup course meetings relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function meetings(): HasMany
    {
        return $this->hasMany(CourseSessionMeeting::class);
    }

    /**
     * Setup course relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}
