<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Film;
use Illuminate\Support\Facades\Auth;

class FilmController extends Controller
{
    public function getRecommendedFilms(Request $request)
    {
        // Lấy thông tin người dùng đã đăng nhập
        $user = Auth::user();
    
        if (!$user) {
            return response()->json(['error' => 'Không tìm thấy người dùng'], 404);
        }
    
        // Lấy danh sách category_id mà người dùng đã lựa chọn
        $userCategories = $user->user_categories;
    
        if (!$userCategories) {
            return response()->json(['message' => 'Người dùng không có bất kỳ danh mục nào'], 200);
        }
    
        $userCategoryIds = $userCategories->pluck('category_id');
    
        // Tìm các phim có chung danh mục với người dùng và sắp xếp theo rating
        $recommendedFilms = Film::whereHas('categories', function ($query) use ($userCategoryIds) {
            $query->whereIn('category_id', $userCategoryIds);
        })
        ->leftJoin('ratings', 'films.id', '=', 'ratings.film_id')
        ->with(['serviceProvider', 'categories'])
        ->select(
            'films.id',
            'films.stream_service_provider_id',
            DB::raw('AVG(ratings.rating) as avg_rating'),
            'films.film_name',
            'films.video'
        )
        ->groupBy('films.id', 'films.stream_service_provider_id', 'films.film_name', 'films.video')
        ->orderBy('avg_rating', 'desc')
        ->get();
    
        // Bổ sung thông tin vào kết quả trả về
        $recommendedFilms->transform(function ($film) {
            $film->provider_name = $film->serviceProvider->provider_name;
            $film->provider_logo = $film->serviceProvider->provider_logo;
            $film->video = $film->video;
            $film->cate_name = $film->categories->implode('cate_name', ', ');
            $film->film_name = $film->film_name;
            return $film;
        });
    
        return response()->json(['recommended_films' => $recommendedFilms], 200);
    }
    
    



    public function getRecommendFilms1(Request $request)
    {
        // Lấy id của phim từ request
        $filmId = $request->input('film_id');

        // Tìm phim dựa trên $filmId
        $film = Film::find($filmId);

        if (!$film) {
            return response()->json(['error' => 'Không tìm thấy phim'], 404);
        }

        // Lấy danh sách các category của phim đang xem
        $filmCategories = $film->categories;

        if ($filmCategories->isEmpty()) {
            return response()->json(['message' => 'Phim không thuộc bất kỳ category nào'], 200);
        }

        // Lấy danh sách phim có chung category với phim đang xem
        $recommendedFilms = Film::whereHas('categories', function ($query) use ($filmCategories) {
            $query->whereIn('category_id', $filmCategories->pluck('id'));
        })
            ->where('id', '<>', $film->id) // Loại trừ phim đang xem
            ->orderBy('premiere_date', 'desc') // Sắp xếp theo ngày ra mắt giảm dần
            ->get();

        return response()->json(['recommended_films' => $recommendedFilms], 200);
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
