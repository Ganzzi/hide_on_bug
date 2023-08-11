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
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin123'),
            'balance' => 10000,
            'phone_number' => '6767371231231',
            'created_at' => now(),
            'updated_at' => now(),
            'image' => 'abd.png'
        ]);

        User::create([
            'id' => 2,
            'role_id' => 2,
            'name' => 'Jane Smith',
            'email' => 'user1@gmail.com',
            'password' => bcrypt('user123'),
            'balance' => 10000,
            'phone_number' => '099839123233',
            'created_at' => now(),
            'updated_at' => now(),
            'image' => 'abd.png'
        ]);

        User::create([
            'id' => 3,
            'role_id' => 2,
            'name' => 'John',
            'email' => 'user2@gmail.com',
            'password' => bcrypt('user123'),
            'balance' => 10000,
            'phone_number' => '123125514213',
            'created_at' => now(),
            'updated_at' => now(),
            'image' => 'abd.png'
        ]);

        User::create([
            'id' => 4,
            'role_id' => 2,
            'name' => 'Anna',
            'password' => bcrypt('user123'),
            'email' => 'user3@gmail.com',
            'balance' => 10000,
            'phone_number' => '213214214',
            'created_at' => now(),
            'updated_at' => now(),
            'image' => 'abd.png'
        ]);

        User::create([
            'id' => 5,
            'role_id' => 2,
            'name' => 'Louis',
            'password' => bcrypt('user123'),
            'email' => 'user4@gmail.com',
            'balance' => 100,
            'created_at' => now(),
            'updated_at' => now(),
            'image' => 'abd.png'
        ]);
    }
}
