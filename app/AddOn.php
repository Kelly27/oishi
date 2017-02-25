<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AddOn extends Model
{
    public function menus()
    {
    	return $this->belongsToMany('App\Menu', 'menus_addons');
    }
}
