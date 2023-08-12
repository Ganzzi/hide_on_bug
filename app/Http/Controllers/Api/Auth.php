<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\Category;
use App\Models\User;
use App\Models\UserCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth as FacadesAuth;
// use User;

class Auth extends Controller
{

    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        if (isset($data['categories'])) {
            $categories = json_decode($data['categories']);
        }
        // Check if an image was uploaded
        if ($request->hasFile('image')) {
            // Get the uploaded file from the request
            $uploadedFile = $request->file('image');

            // Store the uploaded file in a public storage disk
            $filePath = $uploadedFile->store('public/images');
        } else {
            $filePath = null;
        }

        // Create the user
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'role_id' => 2,
            'image' => basename($filePath)
        ]);

        if (isset($categories)) {
            foreach ($categories as $categoryId) {
                $userCategory = new UserCategory();
                $userCategory->user_id = $user->id;
                $userCategory->category_id = $categoryId;
                $userCategory->save();
            }
        } else {
            $all_categories = Category::all();
            foreach ($all_categories as $_cate) {
                $userCategory = new UserCategory();
                $userCategory->user_id = $user->id;
                $userCategory->category_id = $_cate->id;
                $userCategory->save();
            }
        }


        // Generate token for the user
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!FacadesAuth::attempt($credentials)) {
            return response()->json([
                'errors' => 'incorrect email or password',
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = FacadesAuth::user();
        $lock = $user->lock;

        if ($lock == 1) {
            return response()->json(['message' => 'This account was locked'], 422);
        }

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function logout(Request  $request)
    {
        /** @var \App\Models\User $user */
        // $user = $request->user();
        // $user->currentAccessToken()->delete();

        $request->user()->currentAccessToken()->delete();

        return response('', 204);
    }
}
