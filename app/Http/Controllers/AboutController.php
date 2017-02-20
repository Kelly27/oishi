<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Gallery;
use App\NewsFeed;

class AboutController extends Controller
{
    public function show_gallery()
    {
    	$galleries = DB::table('galleries')->paginate(15);
    	return view('pages.abt.gallery', compact('galleries'));
    }

    public function show_our_story()
    {
        return view('pages.abt.our_story');
    }

    public function show_career()
    {
        $careers = DB::table('careers')->paginate(4);
        return view('pages.abt.career', compact('careers'));
    }

    public function show_news_feed()
    {
        // $news_feeds = NewsFeed::all();
        // return view('pages.abt.news_feed', compact('news_feeds'));  //this way of code cannot do pagination 
        // $news_feeds = DB::table('news_feeds') -> paginate(4);
        // return view('pages.abt.news_feed', compact('news_feeds')); //this way of code do pagination
        // 
        $news_feeds = NewsFeed::all();
        return view('pages.abt.news_feed', compact('news_feeds'));  //this way of code cannot do pagination 
    }
}
