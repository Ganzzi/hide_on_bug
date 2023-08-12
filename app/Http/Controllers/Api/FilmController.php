<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Film;
use Illuminate\Support\Facades\Auth;

class FilmController extends Controller
{
    public function getRecommendFilms(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;

        $provider_ids = DB::table('stream_service_providers')->pluck('id')->toArray();

        $user_subscription = DB::table('subscriptions')
            ->where('user_id', $user_id)
            ->whereIn('provider_id', $provider_ids) // Sử dụng whereIn để kiểm tra user_subscription với tất cả provider_ids
            ->first();

        if ($user_subscription) {
            $category_id = $request->get('category_id');
            $film_id = $request->get('film_id'); // Lấy film_id từ request hoặc cách khác bạn có thể lấy film_id dựa vào logic của mình.

            $relatedFilmIds = DB::table('film_categories')
                ->where('category_id', $category_id)
                ->where('film_id', '!=', $film_id)
                ->pluck('film_id')
                ->toArray();

            $recommends = DB::table('films')
                ->join('stream_service_providers', 'films.stream_service_provider_id', '=', 'stream_service_providers.id')
                ->whereIn('films.id', $relatedFilmIds)
                ->select('films.*', 'stream_service_providers.provider_name', 'stream_service_providers.provider_logo')
                ->get();
        } else {
            $recommends = []; // Không có gợi ý nếu không có subscription cho nhà cung cấp tương ứng
        }

        return response()->json(['recommend_films' => $recommends]);
    }




    // function for user to watch a film - get provider infor, subcribe, rating, favorite,...
    // public function watchFilm($filmId)
    // {
    //     // 1 provider
    //     // 2 subcription
    //     // 3 favorite exist()
    //     // 4 rating of current user get()
    //     // 5 average rate numbers

    // }

    public function watchFilm($filmId)
    {
        // Step 1: Get the film details
        $film = DB::table('films')->where('id', $filmId)->first();

        if (!$film) {
            return response()->json(['message' => 'Film not found'], 404);
        }

        // Step 2: Get the streaming provider details
        $provider = DB::table('stream_service_providers')->where('id', $film->stream_service_provider_id)->first();

        // Step 3: Check if the film is in user's favorites
        $user = Auth::user();
        $user_id = $user->id;

        $isFavorite = DB::table('favorites')
            ->where('user_id', $user_id)
            ->where('film_id', $filmId)
            ->exists();

        // Step 4: Get the user's rating for the film
        $userRatings = DB::table('ratings')
            ->where('film_id', $filmId)
            ->count(); // Count the number of ratings

        // Step 5: Calculate the average rating for the film
        $averageRating = DB::table('ratings')
            ->where('film_id', $filmId)
            ->avg('rating'); // Get the average

        return response()->json([
            'film' => $film,
            'provider' => $provider,
            'is_favorite' => $isFavorite,
            'user_ratings' => $userRatings,
            'average_rating' => $averageRating
        ]);
    }

    // function to search film with a keyword
    public function searchFilm(Request $request)
    {
        $film_name = $request->film_name;

        // Trim leading and trailing whitespaces from the input
        $film_name = trim($film_name);

        if (empty($film_name)) {
            return response()->json(['message' => 'Film not found']);
        }

        $searchedFilms = DB::table('films')
            ->where('film_name', 'like', '%' . $film_name . '%')
            ->get();

        if ($searchedFilms->isEmpty()) {
            return response()->json(['message' => 'No films found']);
        } else {
            return response()->json(['films' => $searchedFilms]);
        }
    }
}
