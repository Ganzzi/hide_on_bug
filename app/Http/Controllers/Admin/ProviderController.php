<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\StreamServiceProvider;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProviderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $providers = StreamServiceProvider::all()->load('films')->load('users');

        return response()->json($providers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'service_name' => 'required|string',
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "errors" => $validator->messages()
            ], 400);
        }

        $existingProvider = StreamServiceProvider::where('service_name', $request->service_name)
            ->first();

        if ($existingProvider) {
            return response()->json([
                "status" => 409,
                "message" => "Provider with the same user and service name already exists"
            ], 409);
        }

        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('public/images');
            $logoUrl = url(Storage::url($logoPath));
        }

        $provider = StreamServiceProvider::create([
            'service_name' => $request->service_name,
            'logo' => $logoUrl ?? null,
        ]);

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
