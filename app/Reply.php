<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    public function comments()
    {
    	return $this->belongsTo('App\Comment', 'comment_id');
    }

    public function users()
    {
    	return $this->belongsTo('App\User', 'user_id');
    }
}
