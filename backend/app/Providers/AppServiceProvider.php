<?php

namespace App\Providers;

use App\Settings\PaymentSettings;
use Illuminate\Support\ServiceProvider;
use Laravel\Cashier\Cashier;
use Spatie\LaravelSettings\Settings;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        try {

            $paymentSettings = app(PaymentSettings::class);
            if (empty(config('cashier.secret')) && !empty($paymentSettings->stripe_sk) ) {
                app('config')->set('cashier.secret', $paymentSettings->stripe_sk);
            }
            if (empty(config('cashier.key')) && !empty($paymentSettings->stripe_pk) ) {
                app('config')->set('cashier.key', $paymentSettings->stripe_pk);
            }
            Cashier::calculateTaxes();
        } catch (\Illuminate\Database\QueryException $e) {
            //Database is not available so skip setting the config values.
            echo "No database connection available.";
        }
    }
}
