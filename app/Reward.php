<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reward extends Model
{
    public function menus()
    {
    	return $this->belongsToMany('App\Menu', 'rewards_menus');
    }

    public function locations()
    {
    	return $this->belongsToMany('App\Location', 'rewards_locations');
    }

    public function rewardRedeem()
    {
    	return $this->hasMany('App\RewardsRedeemPeriod');
    }
}
