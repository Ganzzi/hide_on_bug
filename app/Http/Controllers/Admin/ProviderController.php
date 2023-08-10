<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\StreamServiceProvider;

class ProviderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $providers = StreamServiceProvider::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'service_name' => 'required|string',
            'logo' => 'required|string',
        ]);

        StreamServiceProvider::create($validatedData);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $provider = StreamServiceProvider::findOrFail($id);
        return response()->json([$provider]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $provider = StreamServiceProvider::findOrFail($id);
        $provider->update([
            'service_name' => $request->input('service_name'),
            'logo' => $request->input('logo'),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $provider = StreamServiceProvider::findOrFail($id);
        $provider->delete();
    }
}
