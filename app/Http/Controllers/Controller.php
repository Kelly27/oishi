<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;


use App\Menu;
use App\Voucher;
use App\Reward;
use App\NewsEvent;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function show_home()
    {
        $menu1 = Menu::where('id', '=', Menu::min('id'))->first();
        $menu2 = Menu::where('id', '>', Menu::min('id'))->first();
        $vouchers = Voucher::paginate(3);
        $rewards = Reward::paginate(3);
        $newsEvents = NewsEvent::paginate(3);
        return view('pages.home.home', compact('menu1','menu2', 'vouchers', 'rewards', 'newsEvents'));
    }

}
