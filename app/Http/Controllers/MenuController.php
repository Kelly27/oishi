<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Menu;

class MenuController extends Controller
{
    public function sig_menu()
    {
    	$menus = Menu::all();
    	return view('pages.menu.sig_menu', compact('menus'));
    }
}
