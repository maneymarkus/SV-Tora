<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class InvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The invitation token
     *
     * @var String
     */
    public String $token;

    /**
     * The receivers mail address
     *
     * @var String
     */
    public String $email;

    /**
     * The Url of the button
     *
     * @var String
     */
    public String $url;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($token, $email) {
        $this->token = $token;
        $this->email = $email;
        $this->url = "http:\\\\laravel.test/registration/" . $token . "?email=" . $email;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.registration-invitation');
    }
}
