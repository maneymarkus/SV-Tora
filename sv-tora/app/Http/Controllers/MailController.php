<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Mail\GenericMail;
use App\Models\Tournament;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{

    public function createMail() {
        return response()->view("mail");
    }

    public function sendMail(Request $request) {
        $receiverMails = $request->input("receivers");
        $subject = $request->input("subject");
        $content = $request->input("content");
        foreach ($receiverMails as $receiverMail) {
            Mail::to($receiverMail)->send(new GenericMail($subject, $receiverMails, $content));
        }

        if (Mail::failures()) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Leider konnte die Mail nicht versendet werden. Bitte versuch es später erneut.");
        }

        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Die Mail wurde erfolgreich versendet!");

    }

    public function informClubsAboutTournamentCancellation() {
        $invitedClubs = app(UserController::class)->getMailsFromUsersFromInvitedClubs();
        $subject = "Absage des SV Tora Berlin e.V. Wettkampfes";
        $content = "Leider muss der geplante Wettkampf des SV Tora Berlin e.V. aufgrund ungünsiger Umstände ausfallen.";
        return response()->view("mail", ["emails" => $invitedClubs, "subject" => $subject, "content" => $content]);
    }

    public function informClubsAboutTournamentChange(Tournament $tournament) {
        $invitedClubs = app(UserController::class)->getMailsFromUsersFromInvitedClubs();
        $subject = "Änderung des SV Tora Berlin e.V. Wettkampfes";
        $date = Carbon::parse($tournament->date)->format("d.m.Y");
        $content = "Der am " . $date . " stattfindende " . $tournament->tournamentTemplate->tournament_name . " wurde geändert.";
        return response()->view("mail", ["emails" => $invitedClubs, "subject" => $subject, "content" => $content]);
    }

}
