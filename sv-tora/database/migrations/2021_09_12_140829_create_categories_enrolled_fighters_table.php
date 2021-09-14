<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesEnrolledFightersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories_enrolled_fighters', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger("category_id");
            $table->unsignedBigInteger("enrolled_fighter_id")->index();

            $table->foreign("category_id")->references("id")->on("categories")->onDelete("cascade");
            $table->foreign("enrolled_fighter_id")->references("id")->on("enrolled_fighters")->onDelete("cascade");

            $table->unique(["category_id", "enrolled_fighter_id"]);
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
        Schema::dropIfExists('categories_enrolled_fighters');
    }
}
