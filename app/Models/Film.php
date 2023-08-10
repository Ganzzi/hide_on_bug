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
        return $this->belongsToMany(User::class, 'Favorite', 'Film_Id', 'User_Id')->withTimestamps();
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'Film_Category', 'Film_Id', 'Film_Category_Id')->withTimestamps();
    }

    public function watchlists()
    {
        return $this->belongsToMany(Watchlist::class, 'WatchlistFilm', 'Film_Id', 'Watchlist_Id')->withTimestamps();
    }

    public function serviceProvider()
    {
        return $this->belongsTo(Service_Provider::class, 'Service_Id')->onDelete('cascade');
    }
}
