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
    public function activeVolunteer(bool $active = true): Builder
    {
        return $this->whereHas('volunteer', function (Builder $query) use ($active) {
            return $query->active($active);
        });
    }

    /**
     * inactive volunteer scope
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function inactiveVoluteer(): Builder
    {
        return $this->activeVolunteer(false);
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
    public function punchedInVolunteer($punchedIn = true): Builder
    {
        return $punchedIn === false ? $this->whereDoesntHave('volunteer.currentHour') :
        $this->whereHas('volunteer.currentHour');
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
