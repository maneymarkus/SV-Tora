<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Mail\InvitationMail;
use App\Models\User;
use App\Models\RegistrationInvitation;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules\Password;

class RegistrationController extends Controller
{

    /**
     * @throws Exception
     */
    public function invite(Request $request) {
        $request->validate([
            "email" => "bail|required|email|max:255"
        ]);

        $email = $request->input("email");

        //generate random token
        do {
            $token = GeneralHelper::generateRandomToken();
        } while (RegistrationInvitation::where("token", "=", $token)->first() !== null);

        Mail::to($email)->send(new InvitationMail($token, $email));

        $invitation = RegistrationInvitation::updateOrCreate(
            ["email" => $email],
            ["token" => $token]
        );

        if (Mail::failures()) {
            return GeneralHelper::sendNotification("error", "Leider konnte die Mail nicht versendet werden. Bitte versuchen Sie es später erneut.");
        }

        return GeneralHelper::sendNotification("success", "Die Einladungs-E-Mail wurde versendet.");

    }

    public function showRegistration(Request $request, $token) {
        return view("auth.registration", ["token" => $token, "email" => $request->input("email")]);
    }

    public function register(Request $request) {
        $request->validate([
            "token" => "required",
            "name" => "bail|required|max:255",
            "username" => "bail|required|unique:users,username|max:255",
            "email" => "bail|required|email|unique:users,email|max:255",
            "password" => ["bail", "required", Password::min(8)->letters()->mixedCase()->numbers()->symbols()],
            "password-confirmation" => "required|same:password",
        ]);

        $invitation = RegistrationInvitation::where("token", "=", $request->input("token")->first());

        if ($invitation === null) {
            return GeneralHelper::sendNotification("error", "Leider liegt für Sie keine Einladung vor. Ich kann Sie demnach nicht registrieren.");
        }

        $date = Carbon::parse($invitation->updated_at);
        $diffInDays = $date->diffInDays(now());
        if ($diffInDays > config("registration.invitation_timeout")) {
            $invitation->delete();
            return GeneralHelper::sendNotification("error", "Ihre Einladung ist leider abgelaufen. Bitte fordern Sie eine neue Einladung an (zum Beispiel unter " . config("contact.mail") . ").");
        }

        $newUser = User::create([
            "name" => $request->input("name"),
            "username" => $request->input("username"),
            "email" => $request->input("email"),
            "password" => Hash::make($request->input("password")),
        ]);

        $invitation->delete();

        $credentials = $request->only("email", "password");

        if (Auth::attempt($credentials)) {
            session(["username" => Auth::user()["username"]]);
            $request->session()->regenerate();
            return redirect()->route("dashboard");
        }

        GeneralHelper::sendNotification("success", "Sie haben sich erfolgreich registriert. In 5 Sekunden werden Sie zur Login Seite weitergeleitet, wo Sie sich direkt anmelden können.");

        sleep(6);

        return redirect()->route("login");

    }

}
