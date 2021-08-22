<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTournamentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tournaments', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger("tournament_template_id")->index();
            $table->date("date");
            $table->date("enrollment_start");
            $table->date("enrollment_end");
            $table->boolean("active")->default("true");

            $table->foreign("tournament_template_id")->references("id")->on("tournament_templates")->onDelete("cascade");
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
        Schema::dropIfExists('tournaments');
    }
}
