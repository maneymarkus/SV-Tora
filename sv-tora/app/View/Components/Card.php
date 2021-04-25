<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Card extends Component
{

    /**
     * The displayed title of the card
     * @var string
     */
    public $title;

    /**
     * The number this card should display
     * @var string
     */
    public $number;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($title, $number)
    {
        $this->title = $title;
        $this->number = $number;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.card');
    }
}
