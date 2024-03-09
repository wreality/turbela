<?php
declare(strict_types=1);

namespace App\Builders;

use Illuminate\Database\Eloquent\Builder;

class VolunteerHourBuilder extends Builder
{
    /**
     * Currently punched in records
     *
     * @return \Illuminate\Contracts\Database\Eloquent\Builder
     */
    public function current()
    {
        return $this->whereNull('end');
    }

    /**
     * Not punched in records
     *
     * @return \Illuminate\Contracts\Database\Eloquent\Builder
     */
    public function final()
    {
        return $this->whereNotNull('end');
    }

    /**
     * Scope approved records
     *
     * @param bool $approved
     * @return \Illuminate\Contracts\Database\Eloquent\Builder
     */
    public function approved($approved)
    {
        return $this->where('approved', $approved ? '1' : '0');
    }

    /**
     * Scope pending records
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function pending()
    {
        return $this->whereNull('approved');
    }
}
