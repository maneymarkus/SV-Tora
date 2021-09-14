<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFightPlacesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fight_places', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger("tournament_id")->index();
            $table->string("name");

            $table->unique(["tournament_id", "name"]);
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
        Schema::dropIfExists('fight_places');
    }
}
