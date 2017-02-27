<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    public function locations()
    {
    	return $this->belongsToMany('App\Location', 'vouchers_locations');
    }

    public function voucherRedeem()
    {
    	return $this->hasMany('App\VouchersRedeemPeriod');
    }
}
