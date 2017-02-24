<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function news_feed()
    {
        return $this->belongsTo('App\NewsFeed', 'news_feed_id');
    }
}
