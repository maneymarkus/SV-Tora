<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTournamentTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tournament_templates', function (Blueprint $table) {
            $table->id();
            $table->string("tournament_name")->unique();
            $table->unsignedInteger("age_min");
            $table->unsignedInteger("age_max");
            $table->enum("graduation_min", config("global.graduations"));
            $table->enum("graduation_max", config("global.graduations"));
            $table->boolean("teams")->default("false");
            $table->boolean("kihon")->default("false");
            $table->string("examination_types")->default("Kata;Kumite");

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
        Schema::dropIfExists('tournament_templates');
    }
}
