<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemberships extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name', 255);
            $table->boolean('public')->default(false);
            $table->string('duration', 20);
            $table->string('prorate_duration')->nullable();
            $table->json('prorate_price')->nullable();
            $table->json('price')->nullable();
            $table->json('signup_fee')->nullable();
            $table->softDeletes();
        });

        Schema::create('features', function (Blueprint $table) {

            $table->id();
            $table->timestamps();
            $table->string('name', 50);
            $table->integer('type')->default(1);
        });

        Schema::create('feature_plan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('plan_id')->constrained();
            $table->foreignId('feature_id')->constrained();
            $table->integer('amount')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('plans');
        Schema::dropIfExists('features');
        Schema::dropIfExists('feature_plan');
        Schema::enableForeignKeyConstraints();
    }
}
