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
    // /**
    //  * Display a listing of the resource.
    //  */
    // public function index()
    // {
    //     $providers = StreamServiceProvider::all();
    //     if ($providers->count() > 0) {
    //         return response()->json([
    //             "status" => 200,
    //             "data" => $providers,
    //             "message" => "Get all providers successfully"
    //         ], 200);
    //     } else {
    //         return response()->json([
    //             "status" => 404,
    //             "message" => "No records found"
    //         ], 404);
    //     }
    //     return response()->json($providers);
    // }

    // /**
    //  * Store a newly created resource in storage.
    //  */
    // public function store(Request $request)
    // {
    //     // $validator = Validator::make($request->all(), [
    //     //     'service_name' => 'required|string',
    //     //     'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    //     // ]);

    //     // if ($validator->fails()) {
    //     //     return response()->json([
    //     //         "status" => 400,
    //     //         "errors" => $validator->messages()
    //     //     ], 400);
    //     // }

    //     // $existingProvider = StreamServiceProvider::where('service_name', $request->service_name)
    //     //     ->first();

    //     // if ($existingProvider) {
    //     //     return response()->json([
    //     //         "status" => 409,
    //     //         "message" => "Provider with the same user and service name already exists"
    //     //     ], 409);
    //     // }

    //     // if ($request->hasFile('logo')) {
    //     //     $logoPath = $request->file('logo')->store('public/images');
    //     //     $logoUrl = url(Storage::url($logoPath));
    //     // }

    //     // $provider = StreamServiceProvider::create([
    //     //     'service_name' => $request->service_name,
    //     //     'logo' => $logoUrl ?? null,
    //     // ]);

    //     // if ($provider) {
    //     //     return response()->json([
    //     //         "status" => 201,
    //     //         "data" => $provider,
    //     //         "message" => "Provider added successfully"
    //     //     ], 201);
    //     // } else {
    //     //     return response()->json([
    //     //         "status" => 500,
    //     //         "message" => "Something went wrong!!"
    //     //     ], 500);
    //     // }


    //     $data = $request->validate([
    //         'service_name' => 'required|string',
    //         'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    //     ]);

    //     // Update common fields
    //     $data['service_name'] = $request->input('service_name');
    //     $data['logo'] = $request->input('logo');

    //     if ($request->hasFile('logo')) {
    //         $uploadedLogo = $request->file('logo');
    //         $logoName = $uploadedLogo->getClientOriginalName();
    //         //$logoPath = $uploadedLogo->storeAs('', $logoName);
    //         $data['logo'] = $logoName;
    //     }

    //     $provider = new StreamServiceProvider;
    //     $provider->fill($data);
    //     $provider->save();

    //     return response()->json($provider, 201);
    // }
    // /**
    //  * Display the specified resource.
    //  */
    // public function show(string $id)
    // {
    //     // $provider = StreamServiceProvider::findOrFail($id);
    //     // return response()->json([$provider]);
    // }

    // public function update(Request $request, $id)
    // {
    //     // $validator = Validator::make($request->all(), [
    //     //     'service_name' => 'required|string',
    //     //     'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Change 'required' to 'nullable'
    //     // ]);

    //     // if ($validator->fails()) {
    //     //     return response()->json([
    //     //         'status' => 400,
    //     //         'errors' => $validator->messages()
    //     //     ], 400);
    //     // } else {
    //     //     $provider = StreamServiceProvider::find($id);
    //     //     if (!$provider) {
    //     //         return response()->json([
    //     //             'status' => 404,
    //     //             'message' => "Provider not found"
    //     //         ], 404);
    //     //     }

    //     //     // Update provider's fields
    //     //     $data = $request->only('service_name'); // Update only 'service_name'

    //     //     if ($request->hasFile('logo')) {
    //     //         $uploadedLogo = $request->file('logo');

    //     //         // Validate if the uploaded file is an image
    //     //         if (!$uploadedLogo->isValid() || !in_array($uploadedLogo->getClientOriginalExtension(), ['jpg', 'jpeg', 'png', 'gif'])) {
    //     //             return response()->json([
    //     //                 'status' => 400,
    //     //                 'errors' => [
    //     //                     'logo' => ['The logo field must be a valid image in JPEG, PNG, JPG, or GIF format.']
    //     //                 ]
    //     //             ], 400);
    //     //         }

    //     //         $logoName = $uploadedLogo->getClientOriginalName();
    //     //         $logoPath = $uploadedLogo->storeAs('logos', $logoName, 'public'); // Adjust storage path
    //     //         $data['logo'] = $logoPath;
    //     //     }

    //     //     $provider->update($data);

    //     //     return response()->json([
    //     //         'status' => 200,
    //     //         'data' => $provider,
    //     //         'message' => "Update provider successfully"
    //     //     ], 200);
    //     // }

    //     $provider = StreamServiceProvider::find($id);
    //     if (!$provider) {
    //         return response()->json([
    //             "status" => 404,
    //             "message" => "No record found"
    //         ], 404);
    //     }
    //     if ($request->logo) {
    //         $validate = $request->validate([
    //             'service_name' => 'required|string',
    //             //'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    //         ]);
    //     }

    //     $provider->service_name = $request->service_name;
    //     $provider->logo = $request->logo;

    //     if ($request->hasFile('images')) {
    //         if ($provider->logo) {
    //             $destination = public_path($provider->logo);
    //             if (File::exists($destination)) {
    //                 File::delete($destination);
    //             }
    //         }
    //         $image = $request->file('images');
    //         $imageName = $image->getClientOriginalName();
    //         $image->move(public_path('images'), $imageName);
    //         $provider->image = $imageName;
    //     }
    //     $provider->save();
    //     if ($provider) {
    //         return response()->json(
    //             [
    //                 "status" => 200,
    //                 "data" => $provider,
    //                 'message' => 'Product created successfully'
    //             ],
    //             200
    //         );
    //     } else {
    //         return response()->json(
    //             [
    //                 "status" => 500,
    //                 'message' => 'Error server'
    //             ],
    //             500
    //         );
    //     }
    // }
    // /**
    //  * Remove the specified resource from storage.
    //  */

    // public function destroy($id)
    // {
    //     $provider = StreamServiceProvider::findOrFail($id);

    //     if (!$provider) {
    //         return response()->json([
    //             'status' => 404,
    //             'message' => 'no record found'
    //         ], 404);
    //     }
    //     $provider->delete();
    //     return response()->json([
    //         'status' => 200, // Đã sửa từ 404 thành 200
    //         'message' => 'provider deleted successfully'
    //     ], 200);
    // }

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
        if ($provider->provider_logo) {
            $destination = public_path($provider->provider_logo);
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
                'service_name' => 'required',
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
