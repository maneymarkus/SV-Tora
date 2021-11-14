<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEnrolledTeamCategoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('enrolled_team_category', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger("enrolled_team_id")->index();
            $table->unsignedBigInteger("category_id")->index();

            $table->foreign("enrolled_team_id")->references("id")->on("enrolled_teams")->onDelete("cascade");
            $table->foreign("category_id")->references("id")->on("categories")->onDelete("cascade");
            $table->unique(["enrolled_team_id", "category_id"]);
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
        Schema::dropIfExists('enrolled_team_category');
    }
}
