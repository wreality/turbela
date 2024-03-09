<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Silber\Bouncer\BouncerFacade as Bouncer;

return new class extends Migration
{


    public $abilityRoles = [
        'index:App\Models\Volunteer'    => ['admin', 'manager'],
        'update:App\Models\Volunteer'     => ['admin', 'manager'],
        'update:App\Models\VolunteerHour' => ['supervisor', 'admin', 'manager'],
        'review:App\Models\VolunteerHour' => ['admin', 'manager'],
        'view:App\Models\Volunteer' => ['supervisor', 'admin', 'manager'],

    ];
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('volunteers', function (Blueprint $table) {
            $table->timestamps();
            $table->foreignId('id');
            $table->integer('hour_tenths_available')->default(0);
            $table->integer('hour_tenths_expired')->default(0);
            $table->integer('hour_tenths_redeemed')->default(0);
            $table->boolean('active')->default(true);

            $table->primary('id');
            $table->foreign('id')->references('id')->on('users');
        });

        Schema::create('volunteer_hours', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('volunteer_id');
            $table->foreignId('supervisor_id')->nullable();
            $table->timestamp('start_actual')->nullable();
            $table->timestamp('end_actual')->nullable();
            $table->timestamp('start');
            $table->timestamp('end')->nullable();
            $table->longText('notes')->nullable();
            $table->boolean('approved')->nullable();;
            $table->integer('length')->nullable();

            $table->foreign('supervisor_id')->references('id')->on('users');
            $table->foreign('volunteer_id')->references('id')->on('volunteers');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('volunteers');
        Schema::dropIfExists('volunteer_hours');
    }
};
