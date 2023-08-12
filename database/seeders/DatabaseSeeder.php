<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        $this->call(RolesSeeder::class);
        $this->call(UsersSeeder::class);
        $now = Carbon::now();

        // Stream Service Providers
        DB::table('stream_service_providers')->insert([
            'provider_name' => 'Netflix',
            'provider_logo' => 'netflix_logo.png',
        ]);

        // Films
        DB::table('films')->insert([
            [
                'stream_service_provider_id' => 1,
                'film_name' => 'Film 1',
                'film_poster' => '1691767285_Oahu-Honolulu-Aerial-Hero-2_1.jpg',
                'video' => 'pexels-ibrahim-bennett-15541408 (1440p).mp4',
                'premiere_date' => '2023-08-15',
            ],
            [
                'stream_service_provider_id' => 1,
                'film_name' => 'Film 2',
                'film_poster' => '1691804187_Iezts5z7tuYAAJ0TTrR76waErT2kITYEdb1mXkRl.png',
                'video' => 'pexels-levi-vaagenes-11502960 (1080p).mp4',
                'premiere_date' => '2023-08-16',
            ],
            [
                'stream_service_provider_id' => 1,
                'film_name' => 'Film 1',
                'film_poster' => '1691767285_Oahu-Honolulu-Aerial-Hero-2_1.jpg',
                'video' => 'pexels-ibrahim-bennett-15541408 (1440p).mp4',
                'premiere_date' => '2023-08-15',
            ],
            [
                'stream_service_provider_id' => 1,
                'film_name' => 'Film 2',
                'film_poster' => '1691804187_Iezts5z7tuYAAJ0TTrR76waErT2kITYEdb1mXkRl.png',
                'video' => 'pexels-levi-vaagenes-11502960 (1080p).mp4',
                'premiere_date' => '2023-08-16',
            ],
            [
                'stream_service_provider_id' => 1,
                'film_name' => 'Film 1',
                'film_poster' => '1691767285_Oahu-Honolulu-Aerial-Hero-2_1.jpg',
                'video' => 'pexels-ibrahim-bennett-15541408 (1440p).mp4',
                'premiere_date' => '2023-08-15',
            ],
            [
                'stream_service_provider_id' => 1,
                'film_name' => 'Film 2',
                'film_poster' => '1691804187_Iezts5z7tuYAAJ0TTrR76waErT2kITYEdb1mXkRl.png',
                'video' => 'pexels-levi-vaagenes-11502960 (1080p).mp4',
                'premiere_date' => '2023-08-16',
            ],
        ]);

        // Favorites
        DB::table('favorites')->insert([
            ['id' => 1, 'user_id' => 1, 'film_id' => 1, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 2, 'user_id' => 3, 'film_id' => 2, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 3, 'user_id' => 2, 'film_id' => 4, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 4, 'user_id' => 4, 'film_id' => 5, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 5, 'user_id' => 2, 'film_id' => 3, 'created_at' => $now, 'updated_at' => $now],
        ]);

        // Ratings
        DB::table('ratings')->insert([
            'user_id' => 1,
            'film_id' => 1,
            'rating' => 4,
        ]);

        // Watch Lists
        DB::table('watch_lists')->insert([
            'user_id' => 1,
            'watch_list_name' => 'My Watchlist',
        ]);

        // Watch List Films
        DB::table('watch_list_films')->insert([
            'watch_list_id' => 1,
            'film_id' => 1,
        ]);

        // Subscriptions
        DB::table('subscriptions')->insert([
            'user_id' => 1,
            'provider_id' => 1,
            'expire_date' => Carbon::now()->addMonth(),
            'billing_amount' => 10,
        ]);

        // Categories
        DB::table('categories')->insert([
            ['cate_name' => 'Action', 'created_at' => $now, 'updated_at' => $now],
            ['cate_name' => 'Documentary', 'created_at' => $now, 'updated_at' => $now],
            ['cate_name' => 'Education', 'created_at' => $now, 'updated_at' => $now],
            ['cate_name' => 'Entertainment', 'created_at' => $now, 'updated_at' => $now],
            ['cate_name' => 'Working', 'created_at' => $now, 'updated_at' => $now],
        ]);

        // Film Categories
        DB::table('film_categories')->insert([
            'film_id' => 1,
            'category_id' => 1,
        ]);

        // Histories
        DB::table('histories')->insert([
            'user_id' => 1,
            'film_id' => 1,
        ]);

        // User Categories
        DB::table('user_categories')->insert([
            'user_id' => 1,
            'category_id' => 1,
        ]);
    }
}
