<?php

// namespace for user page's controller

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth;
use App\Http\Controllers\Admin\FilmController as AdminFilmController;
use App\Http\Controllers\Admin\UserController  as AdminUserController;
use App\Http\Controllers\Admin\ProviderController as AdminProviderController;
use App\Http\Controllers\Api\FilmController as ApiFilmController;
use App\Http\Controllers\Api\ProviderController;
use App\Http\Controllers\Api\UserController as ApiUserController;
use App\Http\Controllers\Api\WatchlistController as ApiWatchlistController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    // route to get information both user and admin
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // api routes for user
    Route::post("/logout", [Auth::class, 'logout']);
    Route::post("/update_rating", [ApiUserController::class, 'rateFilm']);
    Route::post("/update_favorite", [ApiUserController::class, 'favoriteFilm']);
    Route::post("/create_delete__history", [UserController::class, 'updateHistory']);
    Route::apiResource('/watchlists', ApiWatchlistController::class);

    // not done
    Route::post("/update_profile", [ApiUserController::class, 'update']);

    // nhan
    Route::post('/watchlist_add_delete_film', [ApiWatchlistController::class, 'add_or_delete_film_to_watch_list']);
    Route::get('/films/{filmId}', [ApiFilmController::class, "watchFilm"]);
    Route::post('/films',  [ApiFilmController::class,  "searchFilm"]);
    Route::post('/recommended_films/{filmId}',  [ApiFilmController::class,  "getRecommendFilms"]);
    //

    Route::get('/getHistory', [ApiUserController::class, 'getUserHistory']);
    Route::get('/getSubcriptions', [ApiUserController::class, 'getAllSubcriptions']);
    Route::post("/update_history", [ApiUserController::class, 'addFilmToHistory']);
    
    Route::get('/getFavorites', [ApiUserController::class, 'getAllFavorites']);
    Route::post("/update_rating", [UserController::class, 'createRating']);
    Route::get("/providers/{providerId}", [ProviderController::class, 'show']);
    Route::post("/subcribe", [ProviderController::class, 'subcribeToProvider']);


    // api routes for admin
    Route::get('/admin/categories', [AdminFilmController::class, 'getCategories']);
    Route::apiResource('/admin/users', AdminUserController::class);
    Route::apiResource('/admin/providers', AdminProviderController::class);
    Route::post('/admin/provider_update/{id}', [AdminProviderController::class, 'update_provider']);
    Route::apiResource('/admin/films', AdminFilmController::class);
    Route::post('/admin/film_update/{id}', [AdminFilmController::class, 'update_film']);
});

// routes for signup, login
Route::post("/signup", [Auth::class, 'signup']);
Route::post("/login", [Auth::class, 'login']);

// routes for get images in storage
Route::get('/images/{filename}', function ($filename) {
    $path = storage_path('app/public/images/' . $filename);

    if (!file_exists($path)) {
        abort(404);
    }

    $file = file_get_contents($path);
    $type = mime_content_type($path);

    return response($file)->header('Content-Type', $type);
});

Route::get('/videos/{filename}', function ($filename) {
    $path = storage_path('app/public/videos/' . $filename);

    if (!file_exists($path)) {
        abort(404);
    }

    $file = file_get_contents($path);
    $type = mime_content_type($path);

    return response($file)->header('Content-Type', $type);
});

Route::post('/upload-video', function (Request $request) {
    $request->validate([
        'video' => 'nullable|mimetypes:video/*|max:20480',
    ]);

    if ($request->hasFile('video')) {
        $uploadedVideo = $request->file('video');
        $videoPath = $uploadedVideo->store('public/videos');

        return response()->json(['video' => $videoPath]);
    } else {
        return response()->json(['message' => 'No video file uploaded'], 400);
    }
});

Route::get('/films', [FilmController::class, 'index']);
// Route::get('/providers', [ProviderController::class, 'index']);
// Route::post('/providers', [ProviderController::class, 'store']);