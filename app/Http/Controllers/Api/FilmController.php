<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Film;
use Illuminate\Http\Request;

class FilmController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $films = Film::all();
        return response()->json($films);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'service_id' => 'required|int',
            'film_category_id' => 'required|int',
            'film_name' => 'required|string',
            'film_thumbnail' => 'nullable|string',
            'film_desc' => 'nullable|string',
            'film_video' => 'nullable|string', 
        ]);

        $film = Film::create($data);
        return response()->json($film, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Film $film)
    {
        return response()->json($film);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Film $film)
    {
        $data = $request->validate([
            'service_id' => 'int',
            'film_category_id' => 'int',
            'film_name' => 'string',
            'film_thumbnail' => 'nullable|string',
            'film_desc' => 'nullable|string',
            'film_video' => 'nullable|string', 
        ]);

        $film->update($data);
        return response()->json($film);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Film $film)
    {
        $film->delete();
        return response()->json(null, 204);
    }
}
