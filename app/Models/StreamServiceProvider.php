<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StreamServiceProvider extends Model
{
    use HasFactory;
    protected $fillable = [
        // Các trường khác nếu có
        'user_id', // Thêm trường user_id vào đây
        'service_name',
        'logo'
    ];
    public function subcribedByUsers()
    {
        return $this->belongsToMany(User::class)->withPivot('billing_amount', 'expire_date')->onDelete('cascade');
    }

    public function films()
    {
        return $this->hasMany(Film::class);
    }
}
