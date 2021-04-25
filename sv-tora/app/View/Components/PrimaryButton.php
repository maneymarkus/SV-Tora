<?php

namespace App\View\Components;

use Illuminate\View\Component;

class PrimaryButton extends Component
{

    /**
     * PrimaryButton can have several styles (which are managed by adding the respective classes):
     * /no additional class/ (standard blue theme)
     * close, warning (red theme)
     * accent-1 (green theme)
     * accent-2 (purple theme)
     * accent-3 (yellow theme)
     * disabled (grayish and disables button)
     */

    /**
     * The text that should be displayed on hovering
     * @var string
     */
    public $text;

    /**
     * THe name of the icon for the button
     * @var string
     */
    public $iconName;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($text, $iconName)
    {
        $this->text = $text;
        $this->iconName = $iconName;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.primary-button');
    }
}
