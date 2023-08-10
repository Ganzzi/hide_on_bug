<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use NunoMaduro\Collision\Provider;
use App\Http\Controllers\Controller;
use App\Models\Service_Provider;

class StreamServiceProviderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $serviceProviders = Service_Provider::all();
        return response()->json($serviceProviders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'User_Id' => 'required|int',
            'Service_Name' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    $existingService = Service_Provider::where('Service_Name', $value)
                        ->where('User_Id', request('User_Id'))
                        ->first();

                    if ($existingService) {
                        $fail('Service name is already taken.');
                    }
                },
            ],
            'Logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Add image validation rules
        ]);

        // Check if an image has been uploaded
        if ($request->hasFile('Logo')) {
            // Get the uploaded image from the request
            $uploadedImage = $request->file('Logo');

            // Store the uploaded image in a public storage disk
            $imagePath = $uploadedImage->store('public/images');

            // Update the Logo field in the data array with the image path
            $data['Logo'] = $imagePath;
        }

        $serviceProvider = Service_Provider::create($data);
        return response()->json($serviceProvider, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Service_Provider $serviceProvider)
    {
        return response()->json($serviceProvider);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service_Provider $serviceProvider)
{
    $data = $request->validate([
        'Service_Name' => 'string',
        'Logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Add image validation rules
    ]);

    // Check if an image has been uploaded
    if ($request->hasFile('Logo')) {
        // Get the uploaded image from the request
        $uploadedImage = $request->file('Logo');

        // Store the uploaded image in a public storage disk
        $imagePath = $uploadedImage->store('public/images');

        // Update the Logo field in the data array with the image path
        $data['Logo'] = $imagePath;
    }

    $serviceProvider->update($data);
    return response()->json($serviceProvider);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service_Provider $serviceProvider)
    {
        $serviceProvider->delete();
        return response()->json(null, 204);
    }
}
