<?php

namespace App\Http\Controllers\Api;

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRequest;
use App\Models\Film;
use Illuminate\Http\Request;

class FilmController extends Controller
{
    public function index()
    {
        $films = Film::all();
        return response()->json($films);
    }

    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        $data['stream_service_provider_id'] = $request->input('stream_service_provider_id');
        $data['film_name'] = $request->input('film_name');
        $data['film_thumbnail'] = $request->input('film_thumbnail');
        $data['film_desc'] = $request->input('film_desc');

        if ($request->hasFile('video')) {
            $uploadedVideo = $request->file('video');
            $videoName = $uploadedVideo->getClientOriginalName();
            $videoPath = $uploadedVideo->storeAs('public/videos', $videoName);
            $data['video'] = $videoName;
        }

        $film = new Film;
        $film->fill($data);
        $film->save();

        return response()->json($film, 201);
    }

    public function update(Request $request, string $id)
    {
        $film = Film::findOrFail($id);

        // Validate the request data
        $data = $request->validate([
            'stream_service_provider_id' => 'required',
            'film_name' => 'required|string',
            'film_thumbnail' => 'required|string',
            'film_desc' => 'required|string',
        ]);

        // Update common fields
        $data['stream_service_provider_id'] = $request->input('stream_service_provider_id');
        $data['film_name'] = $request->input('film_name');
        $data['film_thumbnail'] = $request->input('film_thumbnail');
        $data['film_desc'] = $request->input('film_desc');

        // Save the updated film
        $film->fill($data);

        $film->save();

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
