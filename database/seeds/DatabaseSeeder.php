<?php

use Illuminate\Database\Seeder;
use App\Gallery;
use App\NewsFeed;
use App\User;
use App\Career;
use App\NewsEvent;
use App\Comment;
use App\Voucher;
use App\Reward;
use App\AddOn;
use App\Location;
use App\Menu;

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
		DB::table('users')->delete();
        DB::table('add_ons')->delete();
        DB::table('careers')->delete();
        DB::table('news_feeds')->delete();
        DB::table('galleries')->delete();
        DB::table('menus')->delete();
        DB::table('comments')->delete();
        DB::table('vouchers')->delete();
        DB::table('rewards')->delete();
        DB::table('locations')->delete();

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
			'food' => 'Kampua Mee',
			'description' => 'This Kampua Mee is very nice! I\'ll come again',
			]);
		}

		Gallery::create([
			'gallery_name' => 'Hydrangeas.jpg'
		]);
		Gallery::create([
			'gallery_name' => 'Chrysanthemum.jpg'
		]);
		Gallery::create([
			'gallery_name' => 'Desert.jpg'
		]);
		Gallery::create([
			'gallery_name' => 'Penguins.jpg'
		]);
		Gallery::create([
			'gallery_name' => 'Lighthouse.jpg'
		]);
		Gallery::create([
			'gallery_name' => 'Jellyfish.jpg'
		]);
		Gallery::create([
			'gallery_name' => 'Tulips.jpg'
		]);
		Gallery::create([
			'gallery_name' => 'Jellyfish.jpg'
		]);

		for ($i=0; $i <30 ; $i++) {
			if ($i%2 == 1) {
				Gallery::create([
					'gallery_name' => 'img24.png'
				]);
			}
			else{
				Gallery::create([
					'gallery_name' => 'img23.png'
				]);
			}
		}

		// for ($i=0; $i <12 ; $i++) {
		// 	NewsFeed::create([
		// 		'user_id' => 1,
		// 		'rated_restaurant' => 5,
		// 		'rated_food' => 5,
		// 		'image_file' => 'img25.png',
		// 		'food' => 'Kampua',
		// 		'description' => 'This food is nice.'
		// 	]);
		// }
		
		for ($i=0; $i <10 ; $i++) {

			Menu::create([
				'menu_img' => 'img1.png',
				'menu_type' => 'sig',
				'menu_name' => 'Chicken Teriyaki',
				'ice_lvl' => '- 100% - 70% - 50% - 30% - 0% ',
				'sugar_lvl' => '- 100% - 70% - 50% - 30% - 0% ',
				'hot' => 'Available',
				'price' => 13.8,
				'star' => 5,
				'new_feed_point' => 5,
			]);

			Voucher::create([
				'image' => 'img2.png',
            	'title' => '50% OFF CHICKEN WITH RICE',
            	'description' => 'A white fluorescent sign with a red awning marks Haem-Beogeo’s location along Jalan Baru, where diners may expect to find burgers with a Korean twist. Proprietor Mr. Haem devised a menu featuring familiar meats like pork, chicken, and shrimp but doused with Korean flavours and served with a side of kimchi. Complement meals with a variety of Korean-imported beverages while Wi-Fi connection prolongs dining sessions.',

            	'redeem_dish' => 'Chicken Rice',
            	'term_cond' => 'XXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXxxxxxxx
					XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
					XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
					XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            	'sold' => 100,
            	'stock' => 115,
            	'group_of' => 3,
            	'expirydate' => '2018-02-27',
            	'availability' => 'Unlimited',
            	'ori_price' => 110.00,
            	'dis_price' => 55.00
				]);

				Reward::create([
				'image' => 'img13.png',
            	'title' => 'FREE ONE JUICE DRINK',
            	'description' => 'A white fluorescent sign with a red awning marks Haem-Beogeo’s location along Jalan Baru, where diners may expect to find burgers with a Korean twist. Proprietor Mr. Haem devised a menu featuring familiar meats like pork, chicken, and shrimp but doused with Korean flavours and served with a side of kimchi. Complement meals with a variety of Korean-imported beverages while Wi-Fi connection prolongs dining sessions.',
            	'term_cond' => '- Redemption period: Jul 7, 2015 
            					– Dec 31, 2015.
								- Valid 11am – 9pm daily (not 
								  including public holidays).
								- Dine-in only.
								- Non-Halal restaurant.
								- Prices displayed inclusive of GST. - No service charge.
								- Valid at Haem-Beogeo: 04-390 8878.',
				'expirydate' => '2018-02-27'
				]);

				Comment::create([
				'user_id' => 1,
				'news_feed_id' => 1,
				'comment' => 'I came here for a few times already.'
			]);
		}

		AddOn::create([
			'item' => 'Pearl',
			'price' => 1
		]);

		AddOn::create([
			'item' => 'Coffee Jelly',
			'price' => 1
		]);

		Location::create([
			'location_name' => 'Everise BDC'
		]);

		Location::create([
			'location_name' => 'Everise MJC'
		]);

		Location::create([
			'location_name' => 'XXXXXX'
		]);

	}
}
