<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEnrolledPeopleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('enrolled_people', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger("tournament_id")->index();
            $table->unsignedBigInteger("person_id")->index();

            $table->foreign("tournament_id")->references("id")->on("tournaments")->onDelete("cascade");
            $table->foreign("person_id")->references("id")->on("people")->onDelete("cascade");
            $table->unique(["tournament_id", "person_id"]);
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
        Schema::dropIfExists('enrolled_people');
    }
}
