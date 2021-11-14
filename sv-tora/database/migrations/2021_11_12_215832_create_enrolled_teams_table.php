<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEnrolledTeamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('enrolled_teams', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger("team_id")->index();
            $table->unsignedBigInteger("tournament_id")->index();

            $table->foreign("team_id")->references("id")->on("teams")->onDelete("cascade");
            $table->foreign("tournament_id")->references("id")->on("tournaments")->onDelete("cascade");
            $table->unique(["team_id", "tournament_id"]);
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
        Schema::dropIfExists('enrolled_teams');
    }
}
