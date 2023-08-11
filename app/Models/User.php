<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'image',
        'bio',
        'gender',
        'balance',
        'phone_number'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class)->onDelete('cascade');
    }

    public function favoritings()
    {
        return $this->belongsToMany(Film::class, 'favorites', 'user_id', 'film_id')->onDelete('cascade');
    }

    public function subcribings()
    {
        return $this->belongsToMany(StreamServiceProvider::class, 'subscriptions', 'user_id', 'provider_id')->withPivot('billing_amount', 'expire_date')->onDelete('cascade');
    }

    public function ratings()
    {
        return $this->belongsToMany(Film::class, 'ratings', 'user_id', 'film_id')->withPivot('rating')->onDelete('cascade');
    }

    public function watchLists()
    {
        return $this->hasMany(WatchList::class)->onDelete('cascade');
    }
}
