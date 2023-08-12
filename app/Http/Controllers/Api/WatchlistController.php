<?php

namespace App\Http\Controllers\Api;

use App\Models\WatchList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class WatchListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $WatchLists = DB::table('watch_lists')->get();

        return response()->json($WatchLists);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|int',
            'watch_list_name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "errors" => $validator->messages()
            ], 400);
        }

        // Kiểm tra xem đã tồn tại bản ghi nào có user_id và watch_list_name tương tự chưa
        $existingWatchList = WatchList::where('user_id', $request->user_id)
            ->where('watch_list_name', $request->watch_list_name)
            ->first();

        if ($existingWatchList) {
            return response()->json([
                "status" => 409, // Conflict status code
                "message" => "WatchList with the same user and name already exists"
            ], 409);
        }

        $newWatchList = WatchList::create($request->all());

        if ($newWatchList) {
            return response()->json([
                "status" => 201,
                "data" => $newWatchList,
                "message" => "WatchList added successfully"
            ], 201);
        } else {
            return response()->json([
                "status" => 500,
                "message" => "Something went wrong"
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $WatchLists = WatchList::with('films')->findOrFail($id);
        return response()->json([$WatchLists]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|int',
            'watch_list_name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages()
            ], 400);
        } else {
            $WatchList = WatchList::find($id);
            if (!$WatchList) {
                return response()->json([
                    'status' => 404,
                    'message' => "watch list not found"
                ], 404);
            }

            $WatchList->update($request->all());

            return response()->json([
                'status' => 200,
                'data' => $WatchList,
                'message' => "Update watch list successfully"
            ], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $WatchList = WatchList::findOrFail($id);

        if (!$WatchList) {
            return response()->json([
                'status' => 404,
                'message' => 'no record found'
            ], 404);
        }
        $WatchList->delete();
        return response()->json([
            'status' => 200, // Đã sửa từ 404 thành 200
            'message' => 'WatchList deleted successfully'
        ], 200);
    }

    // function to add or delete a film to watch list
    public function add_or_delete_film_to_watch_list(Request $request)
    {
        $film_id = $request->film_id;  // Replace with the actual film ID
        $watch_list_id = $request->watch_list_id;


        $existingFilm = DB::table('watch_list_films')
            ->where('watch_list_id', $watch_list_id)
            ->where('film_id', $film_id)
            ->first();

        if ($existingFilm) {
            // Delete the existing film record from the pivot table
            DB::table('watch_list_films')
                ->where('watch_list_id', $watch_list_id)
                ->where('film_id', $film_id)
                ->delete();

            return response()->json(['message' => 'Film removed']);
        } else {
            // Insert a new film record into the pivot table
            DB::table('watch_list_films')->insert([
                'watch_list_id' => $watch_list_id,
                'film_id' => $film_id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return response()->json(['message' => 'Film added']);
        }
    }
}
