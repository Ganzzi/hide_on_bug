<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    use HasFactory;

    protected $fillable = [
        'stream_service_provider_id',
        'film_name',
        'film_thumbnail',
        'film_desc',
        'video',
    ];

    public function favoritedByUsers()
    {
        return $this->belongsToMany(User::class, 'favorite', 'film_id', 'user_id')->withTimestamps();
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'film_category', 'film_id', 'film_Category_id')->withTimestamps();
    }

    public function watchlists()
    {
        return $this->belongsToMany(Watchlist::class, 'watchlistfilm', 'film_id', 'fatchlist_id')->withTimestamps();
    }

    public function serviceProvider()
    {
        return $this->belongsTo(StreamServiceProvider::class, 'service_id')->onDelete('cascade');
    }
}
