<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();

            $table->string("name");
            $table->unsignedBigInteger("tournament_id")->index();
            $table->enum("examination_type", config("tournament.examination_types"));
            $table->enum("graduation_min", config("global.graduations"));
            $table->enum("graduation_max", config("global.graduations"));
            $table->enum("sex", config("global.sex"));
            $table->unsignedInteger("age_min");
            $table->unsignedInteger("age_max");

            $table->foreign("tournament_id")->references("id")->on("tournaments")->onDelete("cascade");
            $table->unique(["name", "tournament_id"]);
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
        Schema::dropIfExists('categories');
    }
}
