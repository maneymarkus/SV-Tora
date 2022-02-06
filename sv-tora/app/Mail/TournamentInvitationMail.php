<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TournamentInvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Contains the subject of the mail
     *
     * @var string
     */
    public string $customSubject;

    /**
     * Contains the content of the mail
     *
     * @var string
     */
    public string $content;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($subject, $content)
    {
        $this->customSubject = $subject;
        $this->content = $content;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->subject($this->customSubject)
            ->markdown('emails.tournament-invitation');
    }
}
