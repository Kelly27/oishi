<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Voucher;
use App\Reward;
use App\Header;

class OfferController extends Controller
{
    public function show_voucher()
    {
        $header = Header::where('page', 'voucher')->firstOrFail();
        $vouchers = Voucher::paginate(6);
        return view('pages.specialOffer.voucher', compact('vouchers', 'header'));
    }

    public function show_voucher_byID($id)
    {
        $header = Header::where('page', 'voucher')->firstOrFail();
    	$voucher = Voucher::where('id', $id)->firstOrFail();
        $locations = $voucher->locations;
        $periods = $voucher->voucherRedeem;
    	return view('pages.specialOffer.voucher_byID', compact('voucher', 'locations', 'periods', 'header'));
    }

    public function show_reward()
    {
        $header = Header::where('page', 'reward')->firstOrFail();
        $rewards = Reward::paginate(8);
        return view('pages.specialOffer.reward', compact('rewards', 'header'));
    }

    public function show_reward_byID($id)
    {
        $header = Header::where('page', 'reward')->firstOrFail();
    	$reward = Reward::where('id', $id)->firstOrFail();
        $locations = $reward->locations;
        $menus = $reward->menus;
        $periods = $reward->rewardRedeems;
    	return view('pages.specialOffer.reward_byID', compact('reward', 'locations', 'menus', 'periods', 'header'));
    }

    public function show_promotion()
    {
        $header = Header::where('page', 'promotion')->firstOrFail();
        return view('pages.specialOffer.promotion', compact('header'));
    }
}
