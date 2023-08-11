<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Subscription;

class UserController extends Controller
{
    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\User   $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $user)
    {
        $data = $request->validate([
            'name' => 'required|string|max:55|min:5',
            'email' => 'nullable|email|unique:users,email|max:255|regex:/\w{1,}@\w{1,}\.\w{2,5}/i',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'bio' => 'required|max:255',
            'gender' => 'required',
        ]);

        if (isset($data['image'])) {
            $data['image'] =  basename($data['image']->store('public/images'));
        }

        $_user = User::find($user);

        $_user->update($data);

        return response()->json($_user);
    }

    public function favoriteFilm(Request $request)
    {
        $user_id = $request->user_id;   // Replace with the actual user ID
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
        $user_id = $request->user_id;   // Replace with the actual user ID
        $film_id = $request->film_id; // Replace with the actual film ID
        $rating_value = $request->rating; // Replace with the actual rating value

        // Validate the input
        $request->validate([
            'user_id' => 'required',
            'film_id' => 'required',
            'rating' => 'required|numeric|min:1|max:5',
        ]);

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

public function subscriptions(Request $request)
{
    $user = User::findOrFail($request->user_id);

    if ($user->balance >= 50) {
        $user->balance -= 50;
        $user->save();

        $subscriptionData = $request->only([
            'user_id',
            'service_id',
            'billing_amount',
        ]);

        $subscriptionData['subscript_start'] = now();
        $subscriptionData['subscript_end'] = now()->addMonth();

        $subscription = new Subscription($subscriptionData);
        $subscription->save();

        // Attach the subscription to the user's subscribings relationship
        $user->subcribings()->attach($subscription->id, [
            'billing_amount' => 50,
            'subscript_end' => now()->addMonth(),
        ]);

        return response()->json(['message' => 'Subscription successful']);
    } else {
        return response()->json(['message' => 'Insufficient balance'], 400);
    }
}


    function updateCategory(Request $request)
    {
        // ham goi khi update profile
    }

    public function addFilmToHistory(Request $request)
    {
    }

    public function getUserHistory()
    {
        // identify user
        $user = Auth::user();
    }

    public function getAllSubcriptions()
    {
    }

    public function getAllFavorites()
    {
    }
}
