<?php

namespace App\Http\Controllers\Api;

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRequest;
use App\Models\Category;
use App\Models\Film;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FilmController extends Controller
{
    public function index()
    {
        $films = Film::all();
        if ($films->count() > 0) {
            return response()->json([
                "status" => 200,
                "data" => $films,
                "message" => "Get all films successfully"
            ], 200);
        } else {
            return response()->json([
                "status" => 404,
                "message" => "No records found"
            ], 404);
        }
        return response()->json($films);
    }

    public function getCategories()
    {
        $categories = Category::all();

        return response()->json(['categories' => $categories]);
    }

    public function store(StoreRequest $request)
    {

        if (isset($data['categories'])) {
            $categories = json_decode($request->input('categories'));
            if (!is_array($categories)) {
                return response()->json(['error' => 'Categories must be an array dkmm'], 422);
            }
        }

        $data = $request->validated();

        $data['stream_service_provider_id'] = $request->input('stream_service_provider_id');
        $data['film_name'] = $request->input('film_name');
        $data['premiere_date'] = $request->input('premiere_date');

        if ($request->hasFile('film_poster')) {
            $uploadedVideo = $request->file('film_poster');
            $videoName = $uploadedVideo->getClientOriginalName();
            $videoPath = $uploadedVideo->storeAs('public/videos', $videoName);
            $data['film_poster'] = $videoName;
        }

        if ($request->hasFile('video')) {
            $uploadedVideo = $request->file('video');
            $videoName = $uploadedVideo->getClientOriginalName();
            $videoPath = $uploadedVideo->storeAs('public/images', $videoName);
            $data['video'] = $videoName;
        }

        $film = new Film;

        $film->fill($data);
        $film->save();

        $categories = json_decode($request->input('categories'));

        foreach ($categories as $categoryId) {
            $film->categories()->attach($categoryId);
        }

        return response()->json($film, 201);
    }

    public function update_film(Request $request, string $id)
    {
        $film = Film::findOrFail($id);

        // Validate the request data
        $data = $request->validate([
            'stream_service_provider_id' => 'required',
            'film_name' => 'required|string',
            'film_poster' => 'required|image',
            'video' => 'required|mimetypes:video/*|max:20480',
            'premiere_date' => 'required|date',
            'categories' => 'nullable'
        ]);

        $data['stream_service_provider_id'] = $request->input('stream_service_provider_id');
        $data['film_name'] = $request->input('film_name');
        $data['premiere_date'] = $request->input('premiere_date');

        if ($request->hasFile('film_poster')) {
            $uploadedVideo = $request->file('film_poster');
            $videoName = $uploadedVideo->getClientOriginalName();
            $videoPath = $uploadedVideo->storeAs('public/videos', $videoName);
            $data['film_poster'] = $videoName;
        }

        if ($request->hasFile('video')) {
            $uploadedVideo = $request->file('video');
            $videoName = $uploadedVideo->getClientOriginalName();
            $videoPath = $uploadedVideo->storeAs('public/images', $videoName);
            $data['video'] = $videoName;
        }

        // Save the updated film
        $film->fill($data);

        $film->save();

        $categories = json_decode($request->input('categories'));

        foreach ($categories as $categoryId) {
            $film->categories()->attach($categoryId);
        }

        // Return a response
        return response()->json($film, 202);
    }

    public function destroy($id)
    {
        $film = Film::findOrFail($id);
        $film->delete();
        return response()->json(null, 204);
    }
}
