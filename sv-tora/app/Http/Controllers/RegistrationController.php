<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegistrationController extends Controller
{
    public function showRegistration() {
        return view("auth.registration");
    }

    public function register(Request $request) {
        $request->validate([
            "name" => "bail|required|max:255",
            "username" => "bail|required|unique:users,username|max:255",
            "email" => "bail|required|email|unique:users,email|max:255",
            "password" => "bail|required|min:8|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/",
            "password-confirmation" => "required|same:password",
        ]);

        $newUser = User::create([
            "name" => $request->input("name"),
            "username" => $request->input("username"),
            "email" => $request->input("email"),
            "password" => Hash::make($request->input("password")),
        ]);

        return redirect()->route("dashboard");

    }

}
