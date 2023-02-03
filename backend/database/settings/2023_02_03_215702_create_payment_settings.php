<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

class CreatePaymentSettings extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('payment.stripe_sk', '', true);
        $this->migrator->add('payment.stripe_pk', '');
    }
}
