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
     * Array contains all the mail addresses of the receivers
     *
     * @var Array
     */
    public Array $receivers;

    /**
     * Contains the content of the mail
     *
     * @var String
     */
    public String $content;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($subject, $receivers, $content)
    {
        $this->customSubject = $subject;
        $this->receivers = $receivers;
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
            ->markdown('emails.generic-mail');
    }
}
