<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Session;
use Illuminate\Validation\Factory;
use Illuminate\Support\Facades\Auth;

use Carbon\Carbon;
use App\Gallery;
use App\NewsFeed;
use App\User;
use App\Career;
use App\NewsEvent;
use App\ContactUs;
use App\Comment;
use App\Reply;

class AboutController extends Controller
{
    public function show_gallery()
    {
    	$galleries = DB::table('galleries')->paginate(15);
        // $galleries = Gallery::where('id', 30); //test no data
    	return view('pages.abt.gallery', compact('galleries'));
    }

    public function show_test()
    {
        $galleries = DB::table('galleries')->paginate(15);
        // $galleries = Gallery::where('id', 30); //test no data
        return view('test', compact('galleries'));
    }

    public function show_our_story()
    {
        return view('pages.abt.our_story');
    }

    public function show_career()
    {
        $careers = Career::paginate(4);
        // $careers = Career::where('title', 'gg'); //test no data
        return view('pages.abt.career', compact('careers'));
    }

    public function show_career_by_id($id)
    {
        $career = Career::where('id', $id)->firstOrFail();
        // return $career;
        return view('pages.abt.career_by_id', compact('career'));
    }

    public function show_news_feed()
    {
        // $news_feeds = NewsFeed::all();
        // return view('pages.abt.news_feed', compact('news_feeds'));  //this way of code cannot do pagination
        // $news_feeds = DB::table('news_feeds') -> paginate(4);
        // return view('pages.abt.news_feed', compact('news_feeds')); //this way of code do pagination

        // $users = User::where('id', 1)->first();
        // $users = User::has('news_feed')->get();
        // return User::with('feeds')->get();
        $news_feeds = NewsFeed::with('newsfeedPoster')->paginate(4);
        // $users = $news_feeds->user;
        // $news_feeds = NewsFeed::paginate(4); //way of pagination
        // $news_feeds = $users->news_feed;
        // return $users->name;
        return $news_feeds;
        return view('pages.abt.news_feed', compact('news_feeds'));
    }

    public function show_news_feed_byID($id)
    {
        $news_feed = NewsFeed::where('id', $id)->firstOrFail();
        $comments = $news_feed->comments()->paginate(4);
        // return $comments = Comment::has(['news_feed'])->get();
        return view('pages.abt.news_feed_byID', compact('news_feed', 'comments'));
    }

    public function show_reply($a, $comment_id)
    {
        $comment = Comment::where('id', $comment_id)->firstOrFail();;
        $replies = $comment->replies()->paginate(6);
        return view('pages.abt.replies', compact('comment', 'replies'));
    }

    public function show_news_event()
    {
        $news_events = NewsEvent::paginate(4);
        return view('pages.abt.news_event_index', compact('news_events'));
    }

    public function show_news_event_byID($news_event_id)
    {
        $news_event = NewsEvent::where('id', $news_event_id)->firstOrFail();
        return view('pages.abt.news_event_byID', compact('news_event'));
    }

    public function get_news_feed_like($id)
    {
        $user_id=Auth::user()->id;
        $user = User::where('id', $user_id)->first();
        $user->news_feeds()->attach($id);
        return redirect() -> back();
    }

    public function store_message(Request $request, Factory $validator)
    {
        $validation=$validator->make($request->all(), [
            'name' =>'required',
            'email' =>'required',
            'phone' =>'required',
            'subject' =>'required',
            'message' =>'required',
        ]);
        if($validation->fails()){
            return redirect()->back()->withErrors($validation);

        }
        else{
            $message = new ContactUs([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'phone' => $request->input('phone'),
                'subject' => $request->input('subject'),
                'message' => $request->input('message')
            ]);
            $message->save();
            Session::flash('message', 'Successfully created message!');
        }

        return redirect()->back();
    }
}
