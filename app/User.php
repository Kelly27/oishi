<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{

    public $timestamps = true;

    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'profilepic', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];



    public function news_feeds()
    {
        return $this->belongsToMany('App\NewsFeed', 'news_feed_likes_users');
    }

    public function feeds() {
        return $this->hasMany('App\NewsFeed');
    }

    public function comments()
    {
        return $this->hasMany('App\Comment');
    }

    public function replies()
    {
        return $this->hasMany('App\Reply');
    }
}
