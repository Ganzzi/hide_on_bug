<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service_Provider extends Model
{
    use HasFactory;

    protected $table = 'Service_Provider'; // Tên bảng trong cơ sở dữ liệu

    protected $primaryKey = 'Service_Id'; // Khóa chính của bảng

    protected $fillable = [
        'User_Id',
        'Service_Name',
        'Logo',
        'Created_At',
        'Updated_At',
    ];

    // Các trường thời gian sẽ tự động được quản lý bởi Eloquent
    public $timestamps = true;
}
