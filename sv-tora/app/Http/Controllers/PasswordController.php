<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class PasswordController extends Controller
{
    public function sendResetLink(Request $request) {

        // no validation because there is no explicit form to return the possible error(s) to

        // show nice loading animation :)
        sleep(1);

        $status = Password::sendResetLink(
            $request->only("email")
        );

        return $status === Password::RESET_LINK_SENT ? GeneralHelper::sendNotification("success", "Die E-Mail zum Zurücksetzen Ihres Passwortes wurde versendet.") :  GeneralHelper::sendNotification("error", "Leider konnte die Mail nicht versendet werden. Bitte versuchen Sie es später erneut.");

    }

    public function showResetForm(Request $request, $token) {
        return view("auth.reset-password", ["token" => $token, "email" => $request->input("email")]);
    }

    public function reset(Request $request) {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            "password" => "bail|required|min:8|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/",
            "password-confirmation" => "required|same:password",
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        redirect()->route("login");

        return $status == Password::PASSWORD_RESET ?
            view("auth.password-reset-result") :
            view("auth.password-reset-result", ["error" => true]);
    }

}
