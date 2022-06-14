<?php

namespace App\Mail;

use App\Models\Tournament;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TournamentInvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The tournament the user is being invited to
     *
     * @var Tournament
     */
    public Tournament $tournament;

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
     * The path to possibly attached files
     *
     * @var array|null
     */
    public ?array $attachmentFiles;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($tournament, $subject, $content, $attachmentFiles = null)
    {
        $this->tournament = $tournament;
        $this->customSubject = $subject;
        $this->content = $content;
        $this->attachmentFiles = $attachmentFiles;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $email = $this
            ->subject($this->customSubject)
            ->markdown('emails.tournament-invitation');

        if ($this->attachmentFiles !== null) {
            foreach ($this->attachmentFiles as $attachmentFile) {
                $email->attach($attachmentFile["path"], [
                    "as" => $attachmentFile["name"],
                ]);
            }
        }

        return $email;
    }
}
