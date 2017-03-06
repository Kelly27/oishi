<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    public function newsfeed_tag()
    {
    	return $this->hasMany('App\NewsFeed');
    }
}
