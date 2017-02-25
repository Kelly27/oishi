<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Voucher;
use App\Reward;

class OfferController extends Controller
{
    public function show_voucher()
    {
        $vouchers = Voucher::paginate(6);
        return view('pages.specialOffer.voucher', compact('vouchers'));
    }

    public function show_voucher_byID($id)
    {
    	$voucher = Voucher::where('id', $id)->firstOrFail();
        $locations = $voucher->locations;
    	return view('pages.specialOffer.voucher_byID', compact('voucher', 'locations'));
    }

    public function show_reward()
    {
        $rewards = Reward::paginate(8);
        return view('pages.specialOffer.reward', compact('rewards'));
    }

    public function show_reward_byID($id)
    {
    	$reward = Reward::where('id', $id)->firstOrFail();
        $locations = $reward->locations;
    	return view('pages.specialOffer.reward_byID', compact('reward', 'locations'));
    }

    public function show_promotion()
    {
        return view('pages.specialOffer.promotion');
    }
}
