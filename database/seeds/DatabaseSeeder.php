<?php

use Illuminate\Database\Seeder;
use App\Gallery;
use App\NewsFeed;
use App\User;
use App\Career;
use App\NewsEvent;
use App\Like;
use App\Voucher;
use App\Reward;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call('OishiSeeder');
        $this->command->info('Oishi Seeder seeds finished.');
    }
}

class OishiSeeder extends Seeder
{
	
	public function run()
	{
		User::create([
			'name' => 'John Maxwell',
			'profilepic' => 'head1.png',
			'email' => 'john@eg.com',
			'password' => '123'
			]);

		for ($i=0; $i <4 ; $i++) { 
			NewsFeed::create([
			'user_id' => 1,
			'rated_restaurant' => 5,
			'rated_food' => 5,
			'image_file' => 'img25.png',
			'food' => 'Kampua',
			'description' => 'This food is nice.'
			]);
		}

		// for ($i=0; $i <4 ; $i++) { 
		// 	NewsEvent::create([
		// 	'image' => "img25.png",
		// 	'rated_restaurant' => 5,
		// 	'rated_food' => 5,
		// 	'image_file' => 'img25.png',
		// 	'food' => 'Kampua',
		// 	'description' => 'This food is nice.'
		// 	]);
		// }
		// 
		for ($i=0; $i <10 ; $i++) { 
			Voucher::create([
				'image' => 'img2.png',
            	'title' => '50% OFF CHICKEN WITH RICE',
            	'sold' => 100,
            	'stock' => 115,
            	'group_of' => 3,
            	'expirydate' => '2018-02-27',
            	'availability' => 'Unlimited',
            	'ori_price' => 110.00,
            	'dis_price' => 55.00
				]);
		}

		for ($i=0; $i <10 ; $i++) { 
			Reward::create([
				'image' => 'img13.png',
            	'title' => 'FREE ONE JUICE DRINK',
				'expirydate' => '2018-02-27'
				]);
		}


	}
}
