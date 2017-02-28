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
        $menu1 = Menu::where('id', '=', Menu::min('id'))->first();
        $menu2 = Menu::where('id', '>', Menu::min('id'))->first();
        return view('pages.menu.menu_home', compact('menu1','menu2'));
    }

    public function show_menu_index($menu_type)
    {
    	$menus = Menu::where('menu_type', $menu_type)->paginate(8);
    	return view('pages.menu.index', compact('menus'));
    }


    public function show_menu_byID($menu_id)
    {
        $news_feeds = NewsFeed::paginate(2);
        $count_news = NewsFeed::get();
        $menu = Menu::where('id', $menu_id)->first();
        $addOns = $menu->addOns;
        $locations = $menu->locations;
        return view('pages.menu.menu_byID', compact('menu', 'news_feeds', 'users', 'addOns', 'locations', 'count_news'));
    }

}
