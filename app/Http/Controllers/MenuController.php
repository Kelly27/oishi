<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Menu;
use App\NewsFeed;
use App\User;

class MenuController extends Controller
{

    public function show_menu_home()
    {
        return view('pages.menu.menu_home');
    }

    public function show_sig_menu()
    {
    	$menus = DB::table('menus')->where('menu_type', 'sig')->paginate(8);
        // $menus = Menu::where('id', 99) ; //test no data
    	return view('pages.menu.sig_menu', compact('menus'));
    }

    public function show_starters_menu()
    {
    	$menus = DB::table('menus')->where('menu_type', 'sta')->paginate(10);
        // $menus = Menu::where('id', 99) ; //test no data
    	return view('pages.menu.starters_menu', compact('menus'));
    }

    public function show_sig_menu_byID($menu_id)
    {
        $news_feeds = NewsFeed::paginate(2);
        $menu = Menu::where('id', $menu_id)->firstOrFail();
        return view('pages.menu.sig_menu_byID', compact('menu', 'news_feeds', 'users'));
    }

}
