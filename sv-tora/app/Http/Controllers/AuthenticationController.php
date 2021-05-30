<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class AuthenticationController extends Controller
{
    public function showLogin() {
        $checkboxOptions = [["text" => "Angemeldet bleiben", "value" => "remember", "checked" => false, "disabled" => false]];
        return view("auth.login", ["checkboxOptions" => $checkboxOptions]);
    }

    public function login(Request $request) {
        $request->validate([
            "user_identifier" => "required",
            "password" => "required",
        ]);

        $login_type = filter_var($request->input("user_identifier"), FILTER_VALIDATE_EMAIL) ? "email" : "username";

        $request->merge([$login_type => $request->input("user_identifier")]);

        $credentials = $request->only($login_type, "password");

        $remember = $request->input("remember") !== NULL;

        if (Auth::attempt($credentials, $remember)) {
            session(["username" => Auth::user()["username"]]);
            $request->session()->regenerate();
            return redirect()->intended("dashboard");
        }

        return back()->withErrors([
            "user_identifier" => "Die eingegebenen Daten stimmen nicht mit einem Eintrag in unserer Datenbank überein.",
        ]);
    }

    public function logout(Request $request) {
        Session::flush();
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route("login");
    }

}
