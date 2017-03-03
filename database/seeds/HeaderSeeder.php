<?php

use Illuminate\Database\Seeder;
use App\Header;

class HeaderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {	
        $this->command->info('HeaderSeeder seeds finished.');
    	Header::truncate();

        Header::create([
        	'page' => 'our_story',
        	'title' => 'Our Story',
        	'description' => 'Oishi Japanese Restaurant is the most complete and trusted coporate and business on the market.',
        	'bg_image' => 'aboutus-header.png'
        ]);

        Header::create([
        	'page' => 'gallery',
        	'title' => 'Photo Gallery',
        	'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.',
        	'bg_image' => 'gallery-header.png'
        ]);

        Header::create([
        	'page' => 'career',
        	'title' => 'Career',
        	'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.',
        	'bg_image' => 'career-header.png'
        ]);

        Header::create([
        	'page' => 'news_feed',
        	'title' => 'News Feed',
        	'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.',
        	'bg_image' => 'newsfeed-header.png'
        ]);

        Header::create([
        	'page' => 'news_event',
        	'title' => 'News And Event',
        	'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.',
        	'bg_image' => 'newsevent-header.png'
        ]);

        Header::create([
        	'page' => 'menu',
        	'title' => 'Menu',
        	'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.',
        	'bg_image' => 'menu-header.png'
        ]);

        Header::create([
        	'page' => 'voucher',
        	'title' => 'Voucher',
        	'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.',
        	'bg_image' => 'voucher-header.png'
        ]);

        Header::create([
        	'page' => 'reward',
        	'title' => 'Reward',
        	'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.',
        	'bg_image' => 'reward-header.png'
        ]);

        Header::create([
        	'page' => 'promotion',
        	'title' => 'Promotion',
        	'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.',
        	'bg_image' => 'reward-header.png'
        ]);

        Header::create([
        	'page' => 'contact_us',
        	'title' => 'Contact Us',
        	'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a aliquet orci. Ut interdum mauris sem, non aliquet felis interdum sit amet.',
        	'bg_image' => 'contact-header.png'
        ]);
    }
}
