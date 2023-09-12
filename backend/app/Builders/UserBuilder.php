<?php
declare(strict_types=1);

namespace App\Builders;

use Illuminate\Database\Eloquent\Builder;

class UserBuilder extends Builder
{
    /**
     * active volunteer scope
     *
     * @param \Illuminate\Contracts\Database\Query\Builder $builder
     * @param bool $active
     * @return \Illuminate\Contracts\Database\Query\Builder
     */
    public function activeVolunteer(Builder $builder, bool $active): Builder
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
    public function neverVolunteer(Builder $builder): Builder
    {
        return $builder->doesntHave('volunteer');
    }

    /**
     * Scope users that can be activated as volunteers
     *
     * @param \Illuminate\Contracts\Database\Query\Builder $builder
     * @return \Illuminate\Contracts\Database\Query\Builder
     */
    public function canActivateVolunteer(Builder $builder): Builder
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
    public function punchedInVolunteer(Builder $builder, bool $punchedIn): Builder
    {
        return $punchedIn ? $builder->whereHas('volunteer.currentHour') :
          $builder->whereDoesntHave('volunteer.currentHour');
    }
}
