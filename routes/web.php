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

Route::get('gallery', function () {
    return view('pages.gallery');
});

Route::get('menu', function () {
    return view('pages.menu');
});

Route::get('test', function () {
    return view('test');
});

