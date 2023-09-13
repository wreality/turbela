<?php
declare(strict_types=1);

namespace App\Models\RelationTraits;

use App\Models\Badge;
use App\Models\BadgeUser;
use App\Models\Locator;
use App\Models\Volunteer;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait UserRelations
{
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
}
