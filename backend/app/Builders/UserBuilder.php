<?php
declare(strict_types=1);

namespace App\Builders;

use Illuminate\Database\Eloquent\Builder;

class UserBuilder extends Builder
{
    /**
     * active volunteer scope
     *
     * @param bool $active
     * @return \Illuminate\Contracts\Database\Query\Builder
     */
    public function activeVolunteer(bool $active): Builder
    {
        return $this->whereHas('volunteer', function (Builder $query) use ($active) {
            return $query->active($active);
        });
    }

    /**
     * Scope no volunter record
     *
     * @return \Illuminate\Contracts\Database\Query\Builder
     */
    public function neverVolunteer(): Builder
    {
        return $this->doesntHave('volunteer');
    }

    /**
     * Scope users that can be activated as volunteers
     *
     * @return \Illuminate\Contracts\Database\Query\Builder
     */
    public function canActivateVolunteer(): Builder
    {
        return $this
            ->where(function (Builder $query) {
                return $query
                    ->doesntHave('volunteer')
                    ->orWhereHas('volunteer', function (Builder $query) {
                        return $query->active(false);
                    });
            });
    }

    /**
     * Scope punched in volunteers
     *
     * @param bool $punchedIn
     * @return \Illuminate\Contracts\Database\Query\Builder
     */
    public function punchedInVolunteer(bool $punchedIn): Builder
    {
        return $punchedIn ? $this->whereHas('volunteer.currentHour') :
            $this->whereDoesntHave('volunteer.currentHour');
    }

    /**
     * Search scope
     *
     * @param string $search
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function search(?string $search): Builder
    {
        return !empty($search) ?
            $this->where(function (Builder $query) use ($search) {
                return $query
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('preferred_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phones', 'like', "%{$search}%");
            }) :
            $this;
    }
}
