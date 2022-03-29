<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->unsignedInteger("estimated_required_time_in_seconds")->nullable();
            $table->unsignedInteger("rank")->nullable();
            $table->unsignedInteger("fight_place_id")->index()->nullable();
            $table->json("fighting_system_configuration")->nullable();

            $table->foreign("fight_place_id")->references("id")->on("fight_places")->onDelete("SET NULL");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('category');
    }
}
