<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    public function news_feeds()
    {
    	$this->belongsToMany('App\NewsFeed', 'news_feeds_likes', 'like_id', 'news_feed_id');
    }
}
