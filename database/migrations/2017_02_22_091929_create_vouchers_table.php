<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVouchersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vouchers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('image');
            $table->string('title');
            $table->text('description');
            $table->string('redeem_dish');
            $table->integer('tag');
            $table->integer('from');
            $table->integer('is_cv');
            $table->integer('sold');
            $table->integer('stock');
            $table->integer('group_of');
            $table->string('availability');
            $table->float('ori_price');
            $table->float('dis_price');
            $table->date('expirydate');
            $table->text('term_cond');
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
        Schema::dropIfExists('vouchers');
    }
}
