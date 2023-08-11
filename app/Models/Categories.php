<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    use HasFactory;

    protected $fillable = [
        'cate_name',
    ];

    public function films()
    {
        return $this->BelongsToMany(Film::class, 'film_categories', 'category_id', 'film_id')->onDelete('cascade');
    }
}
