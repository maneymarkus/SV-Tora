<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegistrationInvitationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('registration_invitations', function (Blueprint $table) {
            $table->id();

            $table->string('email')->index();
            $table->string('token')->unique();
            $table->unsignedBigInteger("role_id")->index();
            $table->unsignedBigInteger("club_id")->index();

            $table->foreign("role_id")->references("id")->on("roles");
            $table->foreign("club_id")->references("id")->on("clubs");
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
        Schema::dropIfExists('registration_invitations');
    }
}
