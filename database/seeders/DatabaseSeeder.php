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

        // Stream Service Providers
        DB::table('stream_service_providers')->insert([
            'provider_name' => 'Netflix',
            'provider_logo' => 'netflix_logo.png',
        ]);

        // Films
        DB::table('films')->insert([
            'stream_service_provider_id' => 1,
            'film_name' => 'Awesome Movie',
            'film_poster' => 'awesome_movie_poster.jpg',
            'video' => 'awesome_movie.mp4',
            'premiere_date' => Carbon::now(),
        ]);

        // Favorites
        DB::table('favorites')->insert([
            'user_id' => 1,
            'film_id' => 1,
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
            'cate_name' => 'Action',
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
