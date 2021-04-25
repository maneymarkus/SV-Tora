<?php

namespace App\View\Components\inputs;

use Illuminate\View\Component;

class RadioButtons extends Component
{

    /**
     * The name of the input field for backend identification
     * @var string
     */
    public $name;

    /**
     * This 2-dimensional array determines the different selectable options that should be available.
     * The first array contains a configuration for a single radio button
     * Each configuration is a map containing 4 indexes:
     * "value": string | Will be the value of the value attribute
     * "text": string | This text will be displayed
     * "checked": boolean | Determines if this radio button should be checked
     * "disabled": boolean | Determines if this radio button should be disabled
     * @var string[[]]
     */
    public $options;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name, $options)
    {
        $this->name = $name;
        $this->options = $options;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.inputs.radio-buttons');
    }
}
