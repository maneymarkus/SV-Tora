<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEnrolledFightersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('enrolled_fighters', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger("fighter_id")->index();
            $table->unsignedBigInteger("tournament_id")->index();

            $table->foreign("fighter_id")->references("id")->on("fighters")->onDelete("cascade");
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
        Schema::dropIfExists('enrolled_fighters');
    }
}
