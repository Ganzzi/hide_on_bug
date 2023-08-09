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
            'Service_Name' => 'required|string',
            'Logo' => 'nullable|string',
        ]);

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
            'Logo' => 'nullable|string',
        ]);

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
