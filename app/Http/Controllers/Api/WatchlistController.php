<?php

namespace App\Http\Controllers\Api;

use App\Models\Watchlist;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class WatchlistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $watchlists = Watchlist::all();
        if ($watchlists->count() > 0) {
            return response()->json([
                "status" => 200,
                "data" => $watchlists,
                "message" => "Get all watchlists successfully"
            ], 200);
        } else {
            return response()->json([
                "status" => 404,
                "message" => "No records found"
            ], 404);
        }
        return response()->json($watchlists);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|int',
            'name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "errors" => $validator->messages()
            ], 400);
        }

        // Kiểm tra xem đã tồn tại bản ghi nào có user_id và service_name tương tự chưa
        $existingWatchlist = Watchlist::where('name', $request->name)
            ->first();

        if ($existingWatchlist) {
            return response()->json([
                "status" => 409, // Conflict status code
                "message" => "watchlist name with the same user and watchlist name already exists"
            ], 409);
        }

        $provider = Watchlist::create($request->all());

        if ($provider) {
            return response()->json([
                "status" => 201,
                "data" => $provider,
                "message" => "watchlist name added successfully"
            ], 201);
        } else {
            return response()->json([
                "status" => 500,
                "message" => "Something went wrong!!"
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(String $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|int',
            'name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages()
            ], 400);
        } else {
            $watchlist = Watchlist::find($id);
            if (!$watchlist) {
                return response()->json([
                    'status' => 404,
                    'message' => "watch list not found"
                ], 404);
            }

            $watchlist->update($request->all());

            return response()->json([
                'status' => 200,
                'data' => $watchlist,
                'message' => "Update watch list successfully"
            ], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $watchlist = Watchlist::findOrFail($id);
        
        if (!$watchlist) {
            return response()->json([
                'status' => 404,
                'message' => 'no record found'
            ], 404);
        }
        $watchlist->delete();
        return response()->json([
            'status' => 200, // Đã sửa từ 404 thành 200
            'message' => 'watchlist deleted successfully'
        ], 200);
    }
}
