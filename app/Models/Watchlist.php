<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WatchList extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class, 'User_Id')->onDelete('cascade');
    }

    public function films()
    {
        return $this->belongsToMany(Film::class, 'WatchlistFilm', 'Watchlist_Id', 'Film_Id')->withTimestamps();
    }
}
