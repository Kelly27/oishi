<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VouchersRedeemsPeriod extends Model
{
    public function vouchers()
    {
    	return $this->belongsTo('App\Voucher');
    }
}
