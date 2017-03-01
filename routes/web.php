<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', 'Controller@show_home')->name('home');

Route::group(['prefix' => 'contact'], function(){
    Route::get('/', 'ContactController@show_contact')-> name('contact');
    Route::post('store_message', 'ContactController@store_message')-> name('store_message');
});

Route::group(['prefix' => 'about'], function(){
    Route::get('our_story', 'AboutController@show_our_story') -> name('our_story');
    Route::get('gallery', 'AboutController@show_gallery') -> name('gallery');
    Route::get('career', 'AboutController@show_career') -> name('career');
    Route::get('career/{career_id}', 'AboutController@show_career_by_id');
    Route::get('news_feed', 'AboutController@show_news_feed') -> name('news_feed');
    Route::get('news_feed/{news_feed_id}', 'AboutController@show_news_feed_byID') -> name('news_feed.id');
    Route::get('news_feed/{news_feed_id}/{comment_id}', 'AboutController@show_reply') -> name('news_feed.reply');
    Route::get('news_feed/like/{news_feed_id}', [
        'uses' => 'AboutController@get_news_feed_like',
        'as' => 'news_feed.like'
        ]);
    Route::get('news_event', 'AboutController@show_news_event') -> name('news_event');
    Route::get('news_event/{news_event_id}', 'AboutController@show_news_event_byID');
});

Route::group(['prefix' => 'menu'], function(){
    Route::get('/', 'menuController@show_menu_home') -> name('menu_home');
    Route::get('{menu_type}', 'menuController@show_menu_index')->name('menu.index');
    Route::get('{menu_type}/{menu_id}', 'menuController@show_menu_byID');
    // '/menu/{type}/{item}'

});

Route::group(['prefix' => 'specialOffer'], function(){
    Route::get('voucher', 'OfferController@show_voucher') -> name('voucher');
    Route::get('voucher/{voucher_id}', 'OfferController@show_voucher_byID') -> name('voucher.id');
    Route::get('reward', 'OfferController@show_reward') -> name('reward');
    Route::get('reward/{reward_id}', 'OfferController@show_reward_byID') -> name('reward.id');
    Route::get('promotion', 'OfferController@show_promotion') -> name('promotion');
});

Auth::routes();

Route::get('/home', 'HomeController@index');
Route::get('test', function(){
    return view('test');
});
