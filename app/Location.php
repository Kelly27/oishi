<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    public function menus()
    {
    	return $this->belongsTo('App\Menu', 'menus_locations');
    }
}
