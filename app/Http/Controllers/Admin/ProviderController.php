<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use App\Models\StreamServiceProvider;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProviderController extends Controller
{
    public function index()
    {
        $providers = StreamServiceProvider::all()->load('films')->load('users');

        return response()->json($providers);
    }

    public function show($id)
    {
        $providers = StreamServiceProvider::find($id);

        return response($providers);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'provider_name' => 'required',
            'provider_logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $providers = new StreamServiceProvider();
        $providers->provider_name = $request->provider_name;

        if ($validator->fails()) {
            return response()->json(
                [
                    "status" => 400,
                    'errors' => $validator->errors()
                ],
                400
            );
        } else {
            if ($request->hasFile('provider_logo')) {
                $image = $request->file('provider_logo');
                $imageName =  $image->getClientOriginalName();
                $image->move(public_path('images'), $imageName);
                $providers->provider_logo = $imageName;
            }
            $providers->save();
            if ($providers) {
                return response()->json(
                    [
                        "status" => 201,
                        "data" => $providers,
                        'message' => 'providers created successfully'
                    ],
                    201
                );
            } else {
                return response()->json(
                    [
                        "status" => 500,
                        'message' => 'Error server'
                    ],
                    500
                );
            }
        }
    }
    public function destroy($id)
    {
        $provider = StreamServiceProvider::find($id);
        if (!$provider) {
            return response()->json([
                "status" => 404,
                "message" => "No record found"
            ], 404);
        }
        if ($provider->logo) {
            $destination = public_path($provider->logo);
            if (File::exists($destination)) {
                File::delete($destination);
            }
        }
        $provider->delete();
        return response()->json([
            "status" => 200,
            "message" => "provider deleted successfully"
        ], 200);
    }
    public function update_provider(Request $request, $id)
    {
        $providers = StreamServiceProvider::find($id);
        if (!$providers) {
            return response()->json([
                "status" => 404,
                "message" => "No record found"
            ], 404);
        }
        $validator = null;
        if ($request->provider_logo) {
            $validator = Validator::make($request->all(), [
                'provider_name' => 'required',
            ]);
        } else {
            $validator = Validator::make($request->all(), [
                'provider_name' => 'required',
                'logo' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
        }

        $providers->provider_name = $request->provider_name;
        if ($validator->fails()) {
            return response()->json(
                [
                    "status" => 400,
                    'errors' => $validator->errors()
                ],
                400
            );
        } else {
            if ($request->hasFile('provider_logo')) {
                if ($providers->provider_logo) {
                    $destination = public_path($providers->provider_logo);
                    if (File::exists($destination)) {
                        File::delete($destination);
                    }
                }
                $provider_logo = $request->file('provider_logo');
                $imageName = $provider_logo->getClientOriginalName();
                $provider_logo->move(public_path('images'), $imageName);
                $providers->provider_logo = $imageName;
            }
            $providers->save();
            if ($providers) {
                return response()->json(
                    [
                        "status" => 200,
                        "data" => $providers,
                        'message' => 'providers created successfully'
                    ],
                    200
                );
            } else {
                return response()->json(
                    [
                        "status" => 500,
                        'message' => 'Error server'
                    ],
                    500
                );
            }
        }
    }
}
