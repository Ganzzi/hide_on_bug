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
        'film_poster',
        'video',
        'premiere_date',
    ];

    public function favoritedByUsers()
    {
        return $this->belongsToMany(User::class, 'favorites', 'film_id', 'user_id')->withTimestamps();
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'film_categories', 'film_id', 'category_id')->withTimestamps();
    }

    public function watchlists()
    {
        return $this->belongsToMany(WatchList::class, 'watch_list_films', 'film_id', 'watch_list_id')->withTimestamps();
    }

    public function serviceProvider()
    {
        return $this->belongsTo(StreamServiceProvider::class, 'stream_service_provider_id');
    }

    public function ratedByUsers()
    {
        return $this->belongsToMany(User::class, 'ratings', 'film_id', 'user_id')->withPivot('rating')->withTimestamps();
    }
}
