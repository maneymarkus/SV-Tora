<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Mail\GenericMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{

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

}
