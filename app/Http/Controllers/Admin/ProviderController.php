<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\StreamServiceProvider;
use Illuminate\Support\Facades\Validator;

class ProviderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $providers = StreamServiceProvider::all();
        if ($providers->count() > 0) {
            return response()->json([
                "status" => 200,
                "data" => $providers,
                "message" => "Get all providers successfully"
            ], 200);
        } else {
            return response()->json([
                "status" => 404,
                "message" => "No records found"
            ], 404);
        }
        return response()->json($providers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'service_name' => 'required|string',
            'logo' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "errors" => $validator->messages()
            ], 400);
        }

        // Kiểm tra xem đã tồn tại bản ghi nào có user_id và service_name tương tự chưa
        $existingProvider = StreamServiceProvider::where('user_id', $request->user_id)
            ->where('service_name', $request->service_name)
            ->first();

        if ($existingProvider) {
            return response()->json([
                "status" => 409, // Conflict status code
                "message" => "Provider with the same user and service name already exists"
            ], 409);
        }

        $provider = StreamServiceProvider::create($request->all());

        if ($provider) {
            return response()->json([
                "status" => 201,
                "data" => $provider,
                "message" => "Provider added successfully"
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
    public function show(string $id)
    {
        $provider = StreamServiceProvider::findOrFail($id);
        return response()->json([$provider]);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'service_name' => 'required|string',
            'logo' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages()
            ], 400);
        } else {
            $provider = StreamServiceProvider::find($id);
            if (!$provider) {
                return response()->json([
                    'status' => 404,
                    'message' => "provider not found"
                ], 404);
            }

            $provider->update($request->all());

            return response()->json([
                'status' => 200,
                'data' => $provider,
                'message' => "Update provider successfully"
            ], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy($id)
    {
        $provider = StreamServiceProvider::findOrFail($id);
        
        if (!$provider) {
            return response()->json([
                'status' => 404,
                'message' => 'no record found'
            ], 404);
        }
        $provider->delete();
        return response()->json([
            'status' => 200, // Đã sửa từ 404 thành 200
            'message' => 'provider deleted successfully'
        ], 200);
    }
}
