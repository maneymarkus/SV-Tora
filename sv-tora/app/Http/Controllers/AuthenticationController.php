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
        return view("login", ["checkboxOptions" => $checkboxOptions]);
    }

    public function login(Request $request) {
        $credentials = $request->only("email", "password");

        if (Auth::attempt($credentials)) {
            return redirect()->intended("dashboard");
        }

        return back()->withErrors([
            // TODO
        ]);

    }

    public function credentials(Request $request) {
        $field = filter_var($request->get($this->username()), FILTER_VALIDATE_EMAIL)
            ? $this->username()
            : 'username';
        return [
            $field => $request->get($this->username()),
            'password' => $request->password,
        ];
    }

    public function logout() {
        Session::flush();
        Auth::logout();
        return redirect("login");
    }

}
