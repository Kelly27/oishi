<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOpeningsHoursTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('opening_hours', function (Blueprint $table) {
            $table->increments('id');
            $table->string('day');
            $table->string('time');
            $table->timestamps();
        });

        DB::table('opening_hours')->insert([
            ['day' => '1', 'time' => '8am - 10pm'],
            ['day' => '2, 3, 4, 5, 6', 'time' => '8am - 1am'],
            ['day' => '7', 'time' => 'Off'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('opening_hours');
    }
}
