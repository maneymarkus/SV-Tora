<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFightingSystemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fighting_systems', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string("name")->unique();
            $table->unsignedInteger("min_fighters");
            $table->unsignedInteger("max_fighters");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fighting_systems');
    }
}
