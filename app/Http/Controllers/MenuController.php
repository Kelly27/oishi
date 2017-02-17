<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Menu;

class MenuController extends Controller
{
    public function show_sig_menu()
    {
    	$menus = DB::table('menus')->where('menu_type', 'sig')->paginate(8);
    	return view('pages.menu.sig_menu', compact('menus'));
    }

    public function show_starters_menu()
    {
    	$menus = DB::table('menus')->where('menu_type', 'sta')->paginate(10);
    	return view('pages.menu.starters_menu', compact('menus'));
    }
}
