<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RewardsRedeemsPeriod extends Model
{
    public function rewards()
    {
    	return $this->belongsTo('App\Reward');
    }
}
