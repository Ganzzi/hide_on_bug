<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Film;
use App\Models\User;
use App\Models\History;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Subscription;
use App\Models\UserCategory;

class UserController extends Controller
{
    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\User   $user
     * @return \Illuminate\Http\Response
     */

    public function show($user)
    {
        return response()->json(User::find($user));
    }

    public function update(Request $request, $user)
    {
        $user = Auth::user();

        $data = $request->validate([
            'name' => 'nullable|string|max:55|min:5',
            'email' => 'nullable|email|max:255|unique:users,email,' . $user->id,
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'bio' => 'nullable|max:255',
            'gender' => 'nullable',
            'phone_number' => 'nullable|string|max:20',
            'password' => 'nullable|string|min:4',
            'categories' => 'nullable'
        ]);

        if (isset($data['categories'])) {
            $categories = json_decode($data['categories']);
        }

        if (!$user->id) {
            return response()->json(['error' => 'User not found'], 404);
        }

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('public/images');
            $data['image'] = basename($imagePath);
        }

        // Thực hiện cập nhật mật khẩu nếu có giá trị
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        $user->update($data);

        if (isset($categories)) {
            DB::table('user_categories')->where('user_id', $user->id)->delete();

            foreach ($categories as $categoryId) {
                $userCategory = new UserCategory();
                $userCategory->user_id = $user->id;
                $userCategory->category_id = $categoryId;
                $userCategory->save();
            }
        }

        return response()->json($user);
    }

    public function favoriteFilm(Request $request)
    {
        $user_id = Auth::user()->id;   // Replace with the actual user ID
        $film_id = $request->film_id; // Replace with the actual video ID

        $exists = DB::table('favorites')
            ->where('user_id', $user_id)
            ->where('film_id', $film_id)
            ->exists();

        if ($exists) {
            // Delete the record from the pivot table
            DB::table('favorites')
                ->where('user_id', $user_id)
                ->where('film_id', $film_id)
                ->delete();

            return response()->json(['message' => 'Favorite removed']);
        } else {
            // Insert a new record into the pivot table
            DB::table('favorites')->insert([
                'user_id' => $user_id,
                'film_id' => $film_id,
                'created_at' => now(),
                'updated_at' => now(),
                // Add any other fields you have in the pivot table
            ]);

            return response()->json(['message' => 'Favorite added']);
        }
    }

    public function rateFilm(Request $request)
    {
        // Validate the input
        $request->validate([
            'film_id' => 'required',
            'rating' => 'required|numeric|min:1|max:5',
        ]);

        $user_id = Auth::user()->id;   // Replace with the actual user ID
        $film_id = $request->film_id; // Replace with the actual film ID
        $rating_value = $request->rating; // Replace with the actual rating value


        $exists = DB::table('ratings')
            ->where('user_id', $user_id)
            ->where('film_id', $film_id)
            ->exists();

        if ($exists) {
            // Update the existing record in the pivot table
            DB::table('ratings')
                ->where('user_id', $user_id)
                ->where('film_id', $film_id)
                ->update(['rating' => $rating_value, 'updated_at' => now()]);

            return response()->json(['message' => 'Rating updated']);
        } else {
            // Insert a new record into the pivot table
            DB::table('ratings')->insert([
                'user_id' => $user_id,
                'film_id' => $film_id,
                'rating' => $rating_value,
                'created_at' => now(),
                'updated_at' => now(),
                // Add any other fields you have in the pivot table
            ]);

            return response()->json(['message' => 'Rating added']);
        }
    }

    function updateCategory(Request $request)
    {
        // ham goi khi update profile
    }

    public function addFilmToHistory(Request $request)
    {
        $user = Auth::user();
        $film_id = $request->film_id;

        // Check if the film already exists in the user's history
        $existingHistory = DB::table('histories')
            ->where('user_id', $user->id)
            ->where('film_id', $film_id)
            ->first();

        if ($existingHistory) {
            // Delete the existing history entry
            DB::table('histories')
                ->where('id', $existingHistory->id)
                ->delete();
        }

        // Create a new history entry
        DB::table('histories')->insert([
            'user_id' => $user->id,
            'film_id' => $film_id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Film added to history'], 201);
    }

    public function getUserHistory()
    {
        $user_id = Auth::user()->id;

        $userHistory = DB::table('histories')
            ->join('films', 'films.id', '=', 'histories.film_id')
            ->join('stream_service_providers', 'stream_service_providers.id', '=', 'films.stream_service_provider_id')
            ->select('histories.*', 'films.film_name', 'films.film_poster', 'films.video', 'stream_service_providers.provider_name', 'stream_service_providers.provider_logo')
            ->where('histories.user_id', $user_id)
            ->get();

        return response()->json(['user_history' => $userHistory], 200);
    }

    /**
     * View user's history for a film.
     */
    public function updateHistory(Request $request)
    {
        $user_id = Auth::user()->id;   // Replace with the actual user ID
        $film_id = $request->film_id; // Replace with the actual film ID

        // Validate the input
        $request->validate([
            'film_id' => 'required',
        ]);

        // Delete the record from the pivot table
        DB::table('histories')
            ->where('user_id', $user_id)
            ->where('film_id', $film_id)
            ->delete();

        // Insert a new record into the pivot table
        DB::table('histories')->insert([
            'user_id' => $user_id,
            'film_id' => $film_id,
        ]);



        return response()->json(['message' => 'History added']);
    }

    public function getAllSubcriptions()
    {
        // identify user
        $user = Auth::user();

        // Retrieve all subscriptions for the user from the database
        $subscriptions = DB::table('subscriptions')
            ->where('user_id', $user->id)
            ->select('provider_id', 'expire_date', 'billing_amount', 'created_at', 'updated_at')
            ->get();

        return response()->json(['subscriptions' => $subscriptions], 200);
    }

    public function getAllFavorites()
    {
        $user = Auth::user();
        if ($user) {
            // Lấy tất cả các mục yêu thích của người dùng từ bảng "favorite"
            $favorites = DB::table('favorites')
                ->join('films', 'favorites.film_id', '=', 'films.id')
                ->where('favorites.user_id', $user->id)
                ->select('films.id', 'films.film_name', 'films.film_poster')
                ->get();

            return response()->json($favorites);
        }
    }
}
