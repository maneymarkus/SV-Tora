<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPassword extends Notification
{
    use Queueable;

    /**
     * The reset password token
     *
     * @var String
     */
    public String $token;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject("Passwort Zurücksetzen")
            ->greeting("Hallo,")
            ->line("über den folgenden Link können Sie Ihr Passwort zurücksetzen:")
            ->action("Passwort zurücksetzen!", url("/password/reset", $this->token))
            ->line("Dieser Link wird in 60 Minuten ablaufen.")
            ->line("Sollten Sie diesen Link nicht angefordert haben, ignorieren Sie diese E-Mail bitte einfach.")
            ->salutation("Sport frei,\n" . config("mail.from.name"));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
