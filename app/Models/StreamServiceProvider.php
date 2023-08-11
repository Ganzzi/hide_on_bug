<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StreamServiceProvider extends Model
{
    use HasFactory;
    protected $fillable = [
        // Các trường khác nếu có
        'provider_name',
        'provider_logo'
    ];
    public function users()
    {
        return $this->belongsToMany(User::class, 'subscriptions', 'provider_id', 'user_id')->withPivot('billing_amount', 'expire_date')->onDelete('cascade');
    }

    public function films()
    {
        return $this->hasMany(Film::class);
    }
}
