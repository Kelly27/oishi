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

Route::get('/', function () {
    return view('pages.home.home');
});


Route::group(['prefix' => 'about'], function(){
    Route::get('our_story', 'AboutController@show_our_story') -> name('our_story');
    Route::get('gallery', 'AboutController@show_gallery') -> name('gallery');
    Route::get('career', 'AboutController@show_career') -> name('career');
    Route::get('career/{career_id}', 'AboutController@show_career_by_id');
    Route::get('news_feed', 'AboutController@show_news_feed') -> name('news_feed');
    Route::get('news_event', 'AboutController@show_news_event') -> name('news_event');

});

Route::group(['prefix' => 'menu'], function(){
    Route::get('menu_home', 'menuController@show_menu_home') -> name('menu_home');
    Route::get('sig_menu', 'menuController@show_sig_menu') -> name('sig_menu');
    Route::get('sig_menu/{menu_id}', 'menuController@show_sig_menu_byID');
    Route::get('starters_menu', 'menuController@show_starters_menu') -> name('starters_menu');

});

Route::get('test', function () {
    return view('test');
});

