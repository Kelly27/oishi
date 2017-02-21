<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
	public $timestamps = true;
	
    protected $fillable = [
    	'menu_type', 'menu_img_', 'menu_name', 'price', 'star', 'new_feed_point'
    ];
}
