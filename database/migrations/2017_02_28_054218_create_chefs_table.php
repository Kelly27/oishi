<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChefsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chefs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('image');
            $table->string('position');
            $table->string('description');
            $table->timestamps();
        });

        DB::table('chefs')->insert([
            ['name' => 'Umberto Vincenzo', 'image' => 'chef1.png', 'position' => 'CHEF', 'description'=> 'Give a brief description of your founders to become closer to your clients.'],
            ['name' => 'Mary Walnut', 'image' => 'chef2.png', 'position' => 'DESSERT CHEF', 'description'=> 'Give a brief description of your founders to become closer to your clients.'],
            ['name' => 'Umberto Vincenzo', 'image' => 'chef3.png', 'position' => 'CHEF’S ASSISTANT', 'description'=> 'Give a brief description of your founders to become closer to your clients.'],
            ['name' => 'Edward Horton', 'image' => 'chef4.png', 'position' => 'CHEF’S ASSISTANT', 'description'=> 'Give a brief description of your founders to become closer to your clients.'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chefs');
    }
}
