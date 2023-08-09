<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'id' => 1,
            'role_id' => 1,
            'fullname' => 'Nguyen',
            'name' => 'admin',
            'password' => bcrypt('admin123'),
            'email' => 'admin@gmail.com',
            'balance' => 10000,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        User::create([
            'id' => 2,
            'role_id' => 2,
            'fullname' => 'Le nguyen',
            'name' => 'Jane Smith',
            'password' => bcrypt('user123'),
            'email' => 'user1@gmail.com',
            'balance' => 10000,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        User::create([
            'id' => 3,
            'role_id' => 2,
            'fullname' => 'Tran thi',
            'name' => 'John',
            'password' => bcrypt('user123'),
            'email' => 'user2@gmail.com',
            'balance' => 10000,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        User::create([
            'id' => 4,
            'role_id' => 2,
            'fullname' => 'Jayson',
            'name' => 'Anna',
            'password' => bcrypt('user123'),
            'email' => 'user3@gmail.com',
            'balance' => 10000,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        User::create([
            'id' => 5,
            'role_id' => 2,
            'fullname' => 'Le Tran',
            'name' => 'Louis',
            'password' => bcrypt('user123'),
            'email' => 'user4@gmail.com',
            'balance' => 10000,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}