<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Film;

class FilmController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $film = new Film([
            'film_name' => $request->input('film_name'),
            // Set other fields
        ]);
        $film->save();

        // Attach categories
        $categoryIds = $request->input('name'); // Assuming 'categories' is the field name in your form
        $film->categories()->sync($categoryIds);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $film = Film::with('categories')->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $film = Film::findOrFail($id);
        $film->film_name = $request->input('film_name');
        // Update other fields
        $film->save();

        // Update categories
        $film->categories()->sync($request->input('categories'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $film = Film::findOrFail($id);
        $film->categories()->detach();
        $film->delete();
    }
}
