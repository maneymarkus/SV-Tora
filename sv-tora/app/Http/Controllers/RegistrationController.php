<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Helper\Roles;
use App\Mail\AdminInvitationMail;
use App\Mail\InvitationMail;
use App\Models\Club;
use App\Models\Permission;
use App\Models\Role;
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

    /*
    |--------------------------------------------------------------------------
    | Invitation
    |--------------------------------------------------------------------------
    |
    | This is the part where new users or admins are invited to the application
    |
    */

    /**
     * @throws Exception
     */
    public function invite(Request $request) {
        $request->validate([
            "email" => "bail|required|email|max:255"
        ]);

        $email = $request->input("email");
        $club = $request->input("club");

        if (User::where("email", "=", $email)->first() !== null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Dieser User existiert schon in unserer Datenbank. Eine Einladung ist daher nicht notwendig.");
        }

        $otherTokens = (array) RegistrationInvitation::all()->pluck("token");
        $token = GeneralHelper::generateUniqueRandomToken(25, $otherTokens);

        Mail::to($email)->send(new InvitationMail($token));

        $invitation = RegistrationInvitation::updateOrCreate(
            ["email" => $email],
            ["token" => $token, "role_id" => Role::getRoleId(Roles::REGULAR), "club" => $club]
        );

        if (Mail::failures()) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Leider konnte die Mail nicht versendet werden. Bitte versuchen Sie es später erneut.");
        }

        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Die Einladungs-E-Mail wurde versendet.");

    }

    public function inviteAdmin(Request $request) {
        $request->validate([
            "email" => "bail|required|email|max:255"
        ]);

        $email = $request->input("email");

        $otherTokens = (array) RegistrationInvitation::all()->pluck("token");
        $token = GeneralHelper::generateUniqueRandomToken(25, $otherTokens);

        Mail::to($email)->send(new AdminInvitationMail($token));

        $invitation = RegistrationInvitation::updateOrCreate(
            ["email" => $email],
            ["token" => $token, "role_id" => Role::getRoleId(Roles::ADMIN), "club_id" => Club::where("name", "=", "SV Tora")->first()->id]
        );

        if (Mail::failures()) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Leider konnte die Mail nicht versendet werden. Bitte versuch es später erneut.");
        }

        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Die Einladungs-E-Mail an den neuen Admin wurde versendet.");
    }


    /*
    |--------------------------------------------------------------------------
    | Present Registration Form
    |--------------------------------------------------------------------------
    |
    | This is the part where the registration form is sent/shown to the user
    |
    */

    public function showRegistration($token) {
        $invitation = RegistrationInvitation::where("token", "=", $token)->first();
        if ($invitation != null) {
            $email = $invitation->email;
            return view("auth.registration", ["token" => $token, "email" => $email]);
        } else {
            return view("auth.registration", ["token" => $token])->withErrors(["email" => "Ihre Einladung ist leider ungültig. Bitte fordern Sie eine neue Einladung unter " . config("contact.email") . " an (Sie können dieses Formular ausfüllen und abschicken, allerdings wird das zu dem gleichen Ergebnis führen)."]);
        }
    }

    public function showRegistrationAdmin($token) {
        $invitation = RegistrationInvitation::where("token", "=", $token)->first();
        if ($invitation != null) {
            $email = $invitation->email;
            return view("auth.admin-registration", ["token" => $token, "email" => $email]);
        } else {
            return view("auth.admin-registration", ["token" => $token])->withErrors(["email" => "Deine Einladung ist leider ungültig. Bitte fordere eine neue Einladung unter " . config("contact.email") . " an (Das Formular auszufüllen und abzuschicken wird übrigens zu dem gleichen Ergebnis führen, falls du dich das grad fragst)."]);
        }
    }


    /*
    |--------------------------------------------------------------------------
    | Registration
    |--------------------------------------------------------------------------
    |
    | This is the part where the actual registration happens (either for admins (down at the bottom) or for any other user roles)
    |
    */

    public function register(Request $request) {
        $request->validate([
            "token" => "required",
            "name" => "bail|required|max:255",
            "username" => "bail|required|unique:users,username|max:255",
            "email" => "bail|required|email|unique:users,email|max:255",
            "password" => ["bail", "required", Password::min(8)->letters()->mixedCase()->numbers()->symbols()],
            "password-confirmation" => "required|same:password",
        ]);

        $token = $request->input("token");
        $email = $request->input("email");

        $invitation = RegistrationInvitation::where("token", "=", $token)->first();

        if ($invitation === null) {
            return view("auth.registration", ["token" => $token, "email" => $email])->withErrors(["token" => "Leider liegt für Sie keine Einladung vor. Sie können sich daher nicht registrieren. Sollten Sie der Meinung sein, dass hier ein Fehler vorliegt, dann melden Sie sich bitte bei: " . config("contact.email")]);
        }

        $date = Carbon::parse($invitation->updated_at);
        $diffInDays = $date->diffInDays(now());
        if ($diffInDays > config("registration.invitation_timeout")) {
            $invitation->delete();
            return view("auth.registration", ["token" => $token, "email" => $email])->withErrors(["token" => "Ihre Einladung ist leider abgelaufen. Bitte fordern Sie eine neue Einladung an (zum Beispiel unter " . config("contact.email") . ")."]);
        }

        if ($invitation->email !== $request->input("email")) {
            return view("auth.registration", ["token" => $token, "email" => $email])->withErrors(["error" => "Die Einladung ist nur für diese E-Mail-Adresse gültig: " . $invitation->email . ". Bitte registrieren Sie sich daher ausschließlich mit dieser E-Mail Adresse!"]);
        }

        $newUser = User::create([
            "name" => $request->input("name"),
            "username" => $request->input("username"),
            "email" => $request->input("email"),
            "password" => Hash::make($request->input("password")),
            "role_id" => Role::getRoleId(Roles::REGULAR),
        ]);

        $invitation->delete();

        $credentials = $request->only("email", "password");

        if (Auth::attempt($credentials)) {
            session(["username" => Auth::user()["username"]]);
            $request->session()->regenerate();
            return redirect()->route("dashboard");
        }

        return view("auth.registration", ["token" => $token, "email" => $email])->withErrors(["error" => "Leider ist ein Fehler aufgetreten. Bitte wenden Sie sich an: " . config("contact.email")]);

    }

    public function registerAdmin(Request $request) {
        $request->validate([
            "token" => "required",
            "name" => "bail|required|max:255",
            "username" => "bail|required|unique:users,username|max:255",
            "email" => "bail|required|email|unique:users,email|max:255",
            "password" => ["bail", "required", Password::min(8)->letters()->mixedCase()->numbers()->symbols()],
            "password-confirmation" => "required|same:password",
        ]);

        $token = $request->input("token");
        $email = $request->input("email");

        $invitation = RegistrationInvitation::where("token", "=", $token)->first();

        if ($invitation === null) {
            return view("auth.admin-registration", ["token" => $token, "email" => $email])->withErrors(["token" => "Es sieht so aus, als ob für dich keine Einladung vorliegt. Solltest du der Meinung sein, dass das ein Fehler ist, melde dich bitte bei: " . config("contact.email")]);
        }

        $date = Carbon::parse($invitation->updated_at);
        $diffInDays = $date->diffInDays(now());
        if ($diffInDays > config("registration.invitation_timeout")) {
            $invitation->delete();
            return view("auth.admin-registration", ["token" => $token, "email" => $email])->withErrors(["token" => "Deine Einladung ist leider abgelaufen. Bitte forder eine neue Einladung an (zum Beispiel unter " . config("contact.email") . ")."]);
        }

        if ($invitation->email !== $request->input("email")) {
            return view("auth.admin-registration", ["token" => $token, "email" => $email])->withErrors(["email" => "Die Einladung ist nur für diese E-Mail-Adresse gültig: " . $invitation->email . ". Bitte nutze daher nur diese E-Mail Adresse!"]);
        }

        if ($invitation->role->name !== Roles::ADMIN) {
            return view("auth.admin-registration", ["token" => $token, "email" => $email])->withErrors(["error" => "Ihre Einladung ist nicht für diese Seite gültig (diese Seite ist nur für die Registrierung von Administratoren). Probieren Sie es unter " . route("registration", ["token" => $invitation->token])]);
        }

        $newAdmin = User::create([
            "name" => $request->input("name"),
            "username" => $request->input("username"),
            "email" => $request->input("email"),
            "password" => Hash::make($request->input("password")),
            "role_id" => Role::getRoleId(Roles::ADMIN),
        ]);

        $newAdmin->permissions()->sync(Permission::all()->pluck("id"));

        $invitation->delete();

        $credentials = $request->only("email", "password");

        if (Auth::attempt($credentials)) {
            session(["username" => Auth::user()->username]);
            $request->session()->regenerate();
            return redirect()->route("dashboard");
        }

        return view("auth.admin-registration", ["token" => $token, "email" => $email])->withErrors(["error" => "Leider ist ein Fehler aufgetreten. Bitte wende dich an: " . config("contact.email")]);
    }

}
