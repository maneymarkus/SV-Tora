<?php

namespace App\View\Components\inputs;

use Illuminate\View\Component;

class SwitchInput extends Component
{

    /**
     * The name of the input field for backend identification
     * @var string
     */
    public $name;

    /**
     * The accompanying text that describes what the switch does
     * @var string
     */
    public $text;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name, $text)
    {
        $this->name = $name;
        $this->text = $text;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.inputs.switch-input');
    }
}
