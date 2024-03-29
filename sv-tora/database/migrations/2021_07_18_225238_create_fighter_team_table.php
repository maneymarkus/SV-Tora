<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFighterTeamTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fighter_team', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger("fighter_id")->index();
            $table->unsignedBigInteger("team_id")->index();

            $table->foreign("fighter_id")->references("id")->on("fighters")->onDelete("cascade");
            $table->foreign("team_id")->references("id")->on("teams")->onDelete("cascade");

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
        Schema::dropIfExists('fighter_team');
    }
}
