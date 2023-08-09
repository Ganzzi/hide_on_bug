<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    use HasFactory;

    public function favoritedByUsers() 
    {
        return $this->belongsToMany(User::class)->withPivot()->onDelete('cascade');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class)->withPivot()->onDelete('cascade');
    }

    public function watchlists()
    {
        return $this->belongsToMany(WatchList::class)->withPivot()->onDelete('cascade');
    }

    public function ratedByUsers()
    {
        return $this->belongsToMany(User::class)->withPivot()->onDelete('cascade');
    }

    public function provider() {
        return $this->belongsTo(StreamServiceProvider::class)->onDelete('cascade');
    }
}