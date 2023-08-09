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
            'Service_Id' => 'required|int',
            'Film_Category_Id' => 'required|int',
            'Film_Name' => 'required|string',
            'Film_Thumbnail' => 'nullable|string',
            'Film_Desc' => 'nullable|string',
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
            'Service_Id' => 'int',
            'Film_Category_Id' => 'int',
            'Film_Name' => 'string',
            'Film_Thumbnail' => 'nullable|string',
            'Film_Desc' => 'nullable|string',
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
