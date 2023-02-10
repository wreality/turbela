<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUserFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string("preferred_name")->nullable();
            $table->json('address')->nullable();
            $table->json('phones')->nullable();
            $table->string('terminal_pincode')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('preferred_name');
            $table->dropColumn('address');
            $table->dropColumn('phones');
            $table->dropColumn('terminal_pincode');
        });
    }
}
