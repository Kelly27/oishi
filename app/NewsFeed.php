<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NewsFeed extends Model
{
	public $timestamps = true;

    public function user()
    {
        return $this->belongsToMany('App\User', 'news_feed_likes_users');
    }

    public function newsfeedPoster(){
        return $this->belongsTo('App\User', 'user_id');
    }

    // public function likes()
    // {
    //     return $this->belongsToMany('App\Like', , 'news_feed_id', 'like_id');
    // }
    //
    public function comments()
    {
        return $this->hasMany('App\Comment');
    }

    protected $fillable = [
        'rated_restaurant', 'rated_food', 'image_file', 'food', 'description'
    ];
}
