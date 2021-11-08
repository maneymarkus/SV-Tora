<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEnrolledFighterCategoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('enrolled_fighter_category', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger("enrolled_fighter_id")->index();
            $table->unsignedBigInteger("category_id")->index();

            $table->foreign("enrolled_fighter_id")->references("id")->on("enrolled_fighters")->onDelete("cascade");
            $table->foreign("category_id")->references("id")->on("categories")->onDelete("cascade");
            $table->unique(["enrolled_fighter_id", "category_id"]);
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
        Schema::dropIfExists('enrolled_fighter_category');
    }
}
