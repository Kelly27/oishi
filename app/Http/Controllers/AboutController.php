<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Session;
use Illuminate\Validation\Factory;
use App\Mailers\AppMailer;
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
use App\Menu;
use App\Voucher;
use App\Reward;
use App\Chef;
use App\BoardDirector;

class AboutController extends Controller
{
    public function show_home()
    {
        $menu1 = Menu::where('id', '=', Menu::min('id'))->first();
        $menu2 = Menu::where('id', '>', Menu::min('id'))->first();
        $vouchers = Voucher::paginate(3);
        $rewards = Reward::paginate(3);
        $newsEvents = NewsEvent::paginate(3);
        return view('pages.home.home', compact('menu1','menu2', 'vouchers', 'rewards', 'newsEvents'));
    }

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
        $chefs = Chef::paginate(4);
        $directors = BoardDirector::paginate(6);
        return view('pages.abt.our_story', compact('chefs', 'directors'));
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
        $news_feeds = NewsFeed::with(['newsfeedPoster'])->paginate(4);
        // $users = $news_feeds->user;
        // $news_feeds = NewsFeed::paginate(4); //way of pagination
        // $news_feeds = $users->news_feed;
        return view('pages.abt.news_feed', compact('news_feeds'));
    }

    public function show_news_feed_byID($id)
    {
        $news_feed = NewsFeed::where('id', $id)->firstOrFail();
        $comments = $news_feed->comments()->paginate(4);
        // return $comments = Comment::has(['news_feed'])->get();
        return view('pages.abt.news_feed_byID', compact('news_feed', 'comments'));
    }

    public function show_reply($news_feed_id, $comment_id)
    {
        $comment = Comment::where('id', $comment_id)->firstOrFail();
        $news_feed = NewsFeed::where('id', $news_feed_id)->firstOrFail();
        $replies = $comment->replies()->paginate(6);
        return view('pages.abt.replies', compact('comment', 'replies', 'news_feed'));
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

    public function show_contact()
    {
        $info = DB::table('get_in_touches')->where('id', 2)->first();
        return view('pages.contact', compact('info'));
    }
    public function store_message(Request $request, Factory $validator, AppMailer $mailer)
    {
        $validation=$validator->make($request->all(), [
            'name' =>'required',
            'email' =>'required | email',
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
            $mailer->sendTicketInformation($message);
            Session::flash('message', 'Successfully created message!');
        }

        return redirect()->back();
    }

    public function messages()
    {
        return [
            'email.E-mail' => 'A '/@' is required in the E-mail field.',
        ];
    }
}
