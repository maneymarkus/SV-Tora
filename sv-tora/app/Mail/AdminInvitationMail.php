<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AdminInvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The invitation token
     *
     * @var String
     */
    public String $token;

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
    public function __construct($token) {
        $this->token = $token;
        $this->url = "http:\\\\laravel.test/admin/registration/" . $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->subject("Einladung zum SV Tora Wettkampf-Management-System als Administrator")
            ->markdown('emails.admin-registration-invitation');
    }
}