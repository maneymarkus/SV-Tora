<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class GenericMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Contains the subject of the mail
     *
     * @var String
     */
    public String $customSubject;

    /**
     * Contains the content of the mail
     *
     * @var String
     */
    public String $content;

    /**
     * Determines if a button linking to the dashboard should be included
     *
     * @var bool
     */
    public bool $includeButton;

    /**
     * The url the button should link to
     *
     * @var string
     */
    public string $buttonUrl;

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
    public function __construct($subject, $content, $includeButton = false, $attachmentFiles = null)
    {
        $this->customSubject = $subject;
        $this->content = $content;
        $this->includeButton = $includeButton;
        $this->buttonUrl = url("/dashboard");
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
            ->markdown('emails.generic-mail');

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
