<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserCategory extends Model
{
    protected $table = 'user_categories'; // Tên bảng trong CSDL

    protected $fillable = [
        'user_id',
        'category_id',
    ];

    // Định nghĩa mối quan hệ với model User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Định nghĩa mối quan hệ với model Category (nếu có)
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
