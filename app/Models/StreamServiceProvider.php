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
    public function subcribedByUsers()
    {
        return $this->belongsToMany(User::class)->withPivot('billing_amount', 'subscribe_end')->onDelete('cascade');
    }

    public function films()
    {
        return $this->hasMany(Film::class);
    }
}
