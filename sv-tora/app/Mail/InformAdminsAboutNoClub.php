<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InformAdminsAboutNoClub extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The user that has a problem
     *
     * @var String
     */
    public String $username;

    /**
     * The club he wants to be added to
     *
     * @var String
     */
    public String $preferredClub;

    /**
     * The url to the user overview where admins can actually update the necessary info
     *
     * @var String
     */
    public String $url;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($username, $preferredClub) {
        $this->username = $username;
        $this->preferredClub = $preferredClub;
        $this->url = url("/entities/users");
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->subject("Es gibt Nutzer ohne einen zugeordnetem Verein!")
            ->markdown('emails.no-club')
            ->priority(1);
    }
}
