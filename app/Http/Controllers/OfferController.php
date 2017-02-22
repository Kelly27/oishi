<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Voucher;

class OfferController extends Controller
{
    public function show_voucher()
    {
        $vouchers = Voucher::paginate(6);
        return view('pages.specialOffer.voucher', compact('vouchers'));
    }
}
