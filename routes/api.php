<?php

// namespace for user page's controller

use App\Http\Controllers\Admin\FilmController;
use App\Http\Controllers\Admin\ProviderController;
use App\Http\Controllers\Api\Auth;
use App\Models\StreamServiceProvider;
use App\Http\Controllers\Admin\UserController  as AdminUserController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

    Route::post("/logout", [Auth::class, 'logout']);
    Route::post("/update_profile", [UserController::class, 'update']);

    // api routes for admin 
    Route::apiResource('/admin/users', UserController::class);
    Route::apiResource('/admin/providers', ProviderController::class);
    Route::apiResource('/admin/films', FilmController::class);
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
