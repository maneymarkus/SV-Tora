<?php

namespace App\View\Components\inputs;

use Illuminate\View\Component;

class TimeInput extends Component
{

    /**
     * The name of the input field for backend identification
     * @var string
     */
    public $name;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name)
    {
        $this->name = $name;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.inputs.time-input');
    }
}
