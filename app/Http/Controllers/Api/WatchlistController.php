<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Watchlist;
use Illuminate\Http\Request;

class WatchlistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $watchlists = Watchlist::with('films')->get();
        return response()->json($watchlists);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|int',
            'watchlist_name' => 'required|string',
        ]);

        $watchlist = Watchlist::create($data);
        return response()->json($watchlist, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Watchlist $watchlist)
    {
        $watchlist->load('films');
        return response()->json($watchlist);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Watchlist $watchlist)
    {
        $data = $request->validate([
            'watchlist_name' => 'string',
        ]);

        $watchlist->update($data);
        return response()->json($watchlist);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Watchlist $watchlist)
    {
        $watchlist->delete();
        return response()->json(null, 204);
    }
}
