<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Helper\Roles;
use App\Mail\InformAdminsAboutNoClub;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class ErrorController extends Controller
{
    public function informAdminsAboutNoClub(Request $request) {
        $user = Auth::user();
        $preferredClub = $request->input("preferredClub");

        $admins = User::all()->reject(function ($user) {
            return $user->role->name !== Roles::ADMIN;
        });

        Mail::to($admins)->send(new InformAdminsAboutNoClub($user, $preferredClub));

        if (Mail::failures()) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Leider konnte die Mail nicht versendet werden. Bitte versuchen Sie es später erneut.");
        }

        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Die Administratoren wurden soeben erfolgreich benachrichtigt. Sobald wie möglich werden Sie Ihrem gewünschten Verein zugeordnet.");
    }
}
