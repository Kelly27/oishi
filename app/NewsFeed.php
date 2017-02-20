<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NewsFeed extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User');
    }
    protected $fillable = [
        'rated_restaurant', 'rated_food', 'image_file', 'food', 'description'
    ];
}
