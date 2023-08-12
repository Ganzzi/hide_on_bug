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
use Spatie\FlareClient\Api;

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
    Route::apiResource('/watchlists', ApiWatchlistController::class);

    Route::get('/films', [ApiFilmController::class, ' watchFilm']);
    // not done
    Route::post("/update_profile", [ApiUserController::class, 'update']);

    // nhan
    Route::post('/watchlist_add_delete_film', [ApiWatchlistController::class, 'add_or_delete_film_to_watch_list']);
    Route::get('/films/{filmId}', [ApiFilmController::class, "watchFilm"]);
    Route::post('/search_film',  [ApiFilmController::class,  "searchFilm"]);
    Route::get('/recommended_films',  [ApiFilmController::class,  "getRecommendedFilms"]);

    // Route::get('/recommended_films',  [ApiFilmController::class,  "getRecommendFilms1"]); //cach khac

    Route::get('/getHistory', [ApiUserController::class, 'getUserHistory']);
    Route::post("/update_history", [ApiUserController::class, 'addFilmToHistory']);

    Route::get('/getFavorites', [ApiUserController::class, 'getAllFavorites']);
    Route::get("/providers/{providerId}", [ProviderController::class, 'show']);
    Route::get("/getProviders", [ProviderController::class, 'getProviders']);
    Route::post("/subcribeOrUnsubcribe", [ProviderController::class, 'subscribeOrUnsubscribe']);
    Route::post("/updatepay", [ProviderController::class, 'extendExpireDate']);


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
