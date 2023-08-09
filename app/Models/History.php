<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    use HasFactory;

    public function users()
    {
        return $this->belongsTo(User::class);
    }
    public function films()
    {
        return $this->belongsTo(Film::class);
    }
}
