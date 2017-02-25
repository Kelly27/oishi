<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
	public $timestamps = true;
	
    protected $fillable = [
    	'menu_type', 'menu_img_', 'menu_name', 'price', 'star', 'new_feed_point'
    ];

    public function locations()
    {
    	return $this->belongsToMany('App\Location', 'menus_locations');
    }

    public function addOns()
    {
    	return $this->belongsToMany('App\AddOn', 'menus_addons');
    }
}
