<?php
declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\Plan;

final class GetAvailableStripeProducts
{
    /**
     * Fetch unassigned stripe products.
     *
     * @return \Illuminate\Support\Collection
     */
    public function __invoke()
    {
        return Plan::listAvailableStripeProducts();
    }
}
