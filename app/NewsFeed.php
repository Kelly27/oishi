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

    public function posterFriends()
    {
        return $this->belongsToMany('App\User', 'tgt_with');
    }

    public function comments()
    {
        return $this->hasMany('App\Comment');
    }

    public function tag()
    {
        return $this->belongsTo('App\Tag');
    }

    protected $fillable = [
        'rated_restaurant', 'rated_food', 'image_file', 'food', 'description', 'user_id'
    ];
}
