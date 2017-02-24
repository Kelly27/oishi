<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NewsFeed extends Model
{
	public $timestamps = true;
	
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function likes()
    {
        return $this->belongsToMany('App\Like', 'news_feeds_likes', 'news_feed_id', 'like_id');
    }

    protected $fillable = [
        'rated_restaurant', 'rated_food', 'image_file', 'food', 'description'
    ];
}
