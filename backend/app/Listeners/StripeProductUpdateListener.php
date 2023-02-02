<?php
declare(strict_types=1);

namespace App\Listeners;

use App\Models\Plan;
use Laravel\Cashier\Events\WebhookReceived;

class StripeProductUpdateListener
{
    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(WebhookReceived $event)
    {
        //
        if ($event->payload['type'] === 'product.updated') {
            $updatedId = $event->payload['data']['object']['id'];
        }
        if ($event->payload['type'] === 'price.updated') {
                $updatedId = $event->payload['data']['object']['product'];
        }

        if (!empty($updatedId)) {
            $plan = Plan::where(['stripe_id' => $updatedId])->first();
            if (!$plan) {
                return;
            }
            $plan->updateStripePlanData();
            $plan->save();
        }
    }
}
