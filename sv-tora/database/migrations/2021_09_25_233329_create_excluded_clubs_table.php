<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExcludedClubsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('excluded_clubs', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger("tournament_id")->index();
            $table->unsignedBigInteger("club_id")->index();

            $table->unique(["tournament_id", "club_id"]);
            $table->foreign("club_id")->references("id")->on("clubs")->onDelete("cascade");
            $table->foreign("tournament_id")->references("id")->on("tournaments")->onDelete("cascade");
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
        Schema::dropIfExists('excluded_clubs');
    }
}
