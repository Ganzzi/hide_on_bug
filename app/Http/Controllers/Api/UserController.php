<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\User   $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $user)
    {
        $data = $request->validate([
            'name' => 'required|string|max:55|min:5',
            'email' => 'nullable|email|unique:users,email|max:255|regex:/\w{1,}@\w{1,}\.\w{2,5}/i',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'bio' => 'required|max:255',
            'gender' => 'required',
        ]);

        if (isset($data['image'])) {
            $data['image'] =  basename($data['image']->store('public/images'));
        }

        $_user = User::find($user);

        $_user->update($data);

        return response()->json($_user);
    }
}
