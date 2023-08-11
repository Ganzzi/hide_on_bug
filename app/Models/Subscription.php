<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{

    protected $fillable = [
        'user_id',
        'service_id',
        'subscript_start',
        'subscript_end',
        'billing_amount',
    ];
    use HasFactory;
}
