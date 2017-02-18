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

Route::get('about', function () {
    return view('pages.abt.about');
});

Route::get('gallery', 'AboutController@show_gallery');
Route::get('sig_menu', 'menuController@show_sig_menu');
Route::get('starters_menu', 'menuController@show_starters_menu');

Route::get('test', function () {
    return view('test');
});

