<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProviderController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(string $providerId)
    {
        // lay tat ca thong tin ve provider, va tat ca film thuoc ve provider, subcription payment
    }

    public function subcribeToProvider()
    {
        // function to create a subcribe to a provider
        $user = Auth::user();
    }

    public function paySubcription()
    {
        // function to extend subcription time
        $user = Auth::user();
    }
}
