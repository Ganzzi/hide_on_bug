<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $fillable = [
        'user_id',
        'provider_id',
        'expire_date',
        'billing_amount',
    ];

    protected $dates = ['expire_date'];

    use HasFactory;
}
