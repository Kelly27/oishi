<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGetInTouchTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('get_in_touches', function (Blueprint $table) {
            $table->increments('id');
            $table->string('address');
            $table->string('office_no');
            $table->string('mobile_no');
            $table->string('email');
            $table->timestamps();
        });

        DB::table('get_in_touches')->insert([
            ['address' => '66 South Street, 
Window 6 Wonderland, xxxx
xxxxx, xxxxxxxxxx', 'office_no' => '082-577168', 'mobile_no' => '082-462569', 'email' => 'oishi@gmail.com']
            ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('get_in_touches');
    }
}
