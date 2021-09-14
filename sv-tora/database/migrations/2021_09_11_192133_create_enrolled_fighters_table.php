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

            $table->unsignedBigInteger("enrolled_person_id")->index();
            $table->boolean("kata");
            $table->boolean("kumite");
            $table->enum("kumite_category", config("tournament.kumite_categories"));

            $table->foreign("enrolled_person_id")->references("id")->on("enrolled_people")->onDelete("cascade");
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
