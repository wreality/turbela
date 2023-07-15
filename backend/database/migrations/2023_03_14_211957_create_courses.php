<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->string('stripe_product')->nullable();
        });

        Schema::create('course_sessions', function(Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->boolean('published')->default(false);
            $table->dateTime('publish_at')->nullable();
            $table->foreignId('course_id')->constrained();
        });

        Schema::create('course_session_meetings', function(Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('course_session_id')->constrained();
            $table->timestamp('start_at');
            $table->timestamp('end_at');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses');
        Schema::dropIfExists('course_sessions');
        Schema::dropIfExists('course_session_meetings');
    }
};
