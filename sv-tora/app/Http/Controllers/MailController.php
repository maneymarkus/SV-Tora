<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Mail\GenericMail;
use App\Mail\TournamentInvitationMail;
use App\Models\Tournament;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
        $files = array();

        if ($request->hasFile("attached-files")) {
            foreach ($request->file("attached-files") as $file) {
                $attachmentFile = [];
                $path = $file->store("/public/temp");
                $attachmentFile["path"] = storage_path("app/" . $path);
                $attachmentFile["name"] = $file->getClientOriginalName();
                $files[] = $attachmentFile;
            }
        }

        $includeButton = $request->input("include-button") ?? false;
        foreach ($receiverMails as $receiverMail) {
            if (session("tournamentInvitation")) {
                Mail::to($receiverMail)->send(new TournamentInvitationMail($subject, $content, $files));
                session()->forget("tournamentInvitation");
            } else {
                Mail::to($receiverMail)->send(new GenericMail($subject, $content, $includeButton, $files));
            }
        }

        if (Mail::failures()) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Leider konnte die Mail nicht versendet werden. Bitte versuch es später erneut.");
        }

        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Die Mail wurde erfolgreich versendet!");

    }

    public function inviteClubsToTournament(Tournament $tournament) {
        $subject = "Neuer Wettkampf des SV Tora Berlin e.V. am " . Carbon::parse($tournament->date)->format("d.m.Y");
        $content = "Der SV Tora Berlin e.V. lädt zum Wettkampf " . $tournament->tournamentTemplate->tournament_name . " am " . Carbon::parse($tournament->date)->format("d.m.Y") . " ein.\n";
        $content .= "Alle weiteren wichtigen Infos finden Sie im Wettkampf System auf dem Wettkampf Dashboard.";
        session(["tournamentInvitation" => true]);
        return response()->view("mail", ["subject" => $subject, "content" => $content]);
    }

    public function informClubsAboutTournamentCancellation() {
        $tournamentInfo = session("tournamentInfo");
        $enrolledClubs = $tournamentInfo["enrolledClubs"];
        $subject = "Absage des SV Tora Berlin e.V. Wettkampfes vom " . $tournamentInfo["date"] . " um " . $tournamentInfo["time"];
        $content = "Leider muss der geplante Wettkampf des SV Tora Berlin e.V. unerwartet ausfallen.";
        return response()->view("mail", ["emails" => $enrolledClubs, "subject" => $subject, "content" => $content]);
    }

    public function informClubsAboutTournamentChange(Tournament $tournament) {
        $enrolledClubs = app(UserController::class)->getMailsFromUsersFromEnrolledClubs();
        $subject = "Änderung des SV Tora Berlin e.V. Wettkampfes";
        $date = Carbon::parse($tournament->date)->format("d.m.Y");
        $content = "Der am " . $date . " stattfindende " . $tournament->tournamentTemplate->tournament_name . " wurde geändert.";
        return response()->view("mail", ["emails" => $enrolledClubs, "subject" => $subject, "content" => $content]);
    }

}
