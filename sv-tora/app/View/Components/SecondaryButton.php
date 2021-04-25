<?php

namespace App\View\Components;

use Illuminate\View\Component;

class SecondaryButton extends Component
{

    /**
     * SecondaryButton can have several styles (which are managed by adding the respective classes):
     * /no additional class/ (standard blue theme)
     * delete (heavy red theme)
     * accent-1 (red theme)
     * accent-2 (green theme)
     * disabled (grayish and disables button)
     */

    /**
     * The text that should be displayed on hovering
     * @var string
     */
    public $text;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($text)
    {
        $this->text = $text;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.secondary-button');
    }
}
