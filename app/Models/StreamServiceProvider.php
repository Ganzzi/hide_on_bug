<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StreamServiceProvider extends Model
{
    use HasFactory;
    protected $fillable = [
        // Các trường khác nếu có
        'service_name',
        'logo'
    ];
    public function users()
    {
        return $this->belongsToMany(User::class, 'subscriptions', 'service_id', 'user_id')->withPivot('billing_amount', 'subscript_start', 'subscript_end');
    }

    public function films()
    {
        return $this->hasMany(Film::class);
    }
}
