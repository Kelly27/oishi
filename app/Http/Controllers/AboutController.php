<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Carbon\Carbon;
use App\Gallery;
use App\NewsFeed;
use App\User;
use App\Career;
use App\NewsEvent;
use App\ContactUs;
use App\Comment;
use App\Reply;
use App\Menu;
use App\Chef;
use App\BoardDirector;
use App\Header;

class AboutController extends Controller
{   
    public function show_gallery()
    {
        $header = Header::where('page', 'gallery')->firstOrFail();
    	$galleries = Gallery::paginate(15);
        // $galleries = Gallery::where('id', 30); //test no data
    	return view('pages.abt.gallery', compact('galleries', 'header'));
    }

    public function show_our_story()
    {
        $header = Header::where('page', 'our_story')->firstOrFail();
        $chefs = Chef::paginate(4);
        $directors = BoardDirector::paginate(6);
        return view('pages.abt.our_story', compact('chefs', 'directors', 'header'));
    }

    public function show_career()
    {
        $header = Header::where('page', 'career')->firstOrFail();
        $careers = Career::paginate(4);
        // $careers = Career::where('title', 'gg'); //test no data
        return view('pages.abt.career', compact('careers', 'header'));
    }

    public function show_career_by_id($id)
    {
        $header = Header::where('page', 'career')->firstOrFail();
        $career = Career::where('id', $id)->firstOrFail();
        // return $career;
        return view('pages.abt.career_by_id', compact('career', 'header'));
    }

    public function show_news_feed()
    {
        $header = Header::where('page', 'news_feed')->firstOrFail();
        // $news_feeds = NewsFeed::all();
        // return view('pages.abt.news_feed', compact('news_feeds'));  //this way of code cannot do pagination
        // $news_feeds = DB::table('news_feeds') -> paginate(4);
        // return view('pages.abt.news_feed', compact('news_feeds')); //this way of code do pagination

        // $users = User::where('id', 1)->first();
        // $users = User::has('news_feed')->get();
        // return User::with('feeds')->get();
        $news_feeds = NewsFeed::with(['newsfeedPoster'])->paginate(4);
        // $users = $news_feeds->user;
        // $news_feeds = NewsFeed::paginate(4); //way of pagination
        // $news_feeds = $users->news_feed;
        return view('pages.abt.news_feed', compact('news_feeds', 'header'));
    }

    public function show_news_feed_byID($id)
    {
        $header = Header::where('page', 'news_feed')->firstOrFail();
        $news_feed = NewsFeed::where('id', $id)->firstOrFail();
        $comments = $news_feed->comments()->paginate(4);
        // return $comments = Comment::has(['news_feed'])->get();
        return view('pages.abt.news_feed_byID', compact('news_feed', 'comments', 'header'));
    }

    public function show_reply($news_feed_id, $comment_id)
    {
        $header = Header::where('page', 'news_feed')->firstOrFail();
        $comment = Comment::where('id', $comment_id)->firstOrFail();
        $news_feed = NewsFeed::where('id', $news_feed_id)->firstOrFail();
        $replies = $comment->replies()->paginate(6);
        return view('pages.abt.replies', compact('comment', 'replies', 'news_feed', 'header'));
    }

    public function show_news_event()
    {
        $header = Header::where('page', 'news_event')->firstOrFail();
        $news_events = NewsEvent::paginate(4);
        return view('pages.abt.news_event_index', compact('news_events', 'header'));
    }

    public function show_news_event_byID($news_event_id)
    {
        $header = Header::where('page', 'news_event')->firstOrFail();
        $news_event = NewsEvent::where('id', $news_event_id)->firstOrFail();
        return view('pages.abt.news_event_byID', compact('news_event', 'header'));
    }

    public function get_news_feed_like($id)
    {
        $user_id=Auth::user()->id;
        $user = User::where('id', $user_id)->first();
        $user->news_feeds()->attach($id);
        return redirect() -> back();
    }

}
