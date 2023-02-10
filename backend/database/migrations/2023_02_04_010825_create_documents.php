<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocuments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('title');
            $table->boolean('archived')->default(false);
        });

        Schema::create('documents_users', function(Blueprint $table) {
            $table->foreignId('user_id')->constrained();
            $table->foreignId('document_id')->constrained();
            $table->string('public_path');
            $table->string('local_path');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('documents');
        Schema::dropIfExists('documents_users');
    }
}
