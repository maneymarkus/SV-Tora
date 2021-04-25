<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Message extends Component
{

    /**
     * Determines the type of the message/notification. There are currently 5 different types available:
     * error
     * warning
     * success
     * info (standard type)
     *
     * @var string
     */
    public $type;

    /**
     * The message
     * @var string
     */
    public $message;

    /**
     * Determines when this message has been created
     * @var string
     */
    public $timestamp;

    /**
     * Contains the sender of the message
     * @var string
     */
    public $sender;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($type, $message, $timestamp, $sender)
    {
        $this->type = $type;
        $this->message = $message;
        $this->timestamp = $timestamp;
        $this->sender = $sender;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.message');
    }

}
