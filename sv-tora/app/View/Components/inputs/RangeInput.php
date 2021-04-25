<?php

namespace App\View\Components\inputs;

use Illuminate\View\Component;

class RangeInput extends Component
{

    /**
     * The name of the input field for backend identification
     * @var string
     */
    public $name;

    /**
     * The integer minimum value for this range
     * @var int
     */
    public $min;

    /**
     * The integer maximum value for this range
     * @var int
     */
    public $max;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name, $min, $max)
    {
        $this->name = $name;
        $this->min = $min;
        $this->max = $max;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.inputs.range-input');
    }
}
