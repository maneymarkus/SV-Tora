<?php

namespace App\View\Components\inputs;

use Illuminate\View\Component;

class TextInput extends Component
{

    /**
     * Determines the type of the text input. Each type has a different icons and different regular expression testing. There are currently 3 different types available:
     * default
     * email
     * password
     *
     * INFO: To make a text input required, add "required" as a class
     *
     * @var string
     */
    public $type;

    /**
     * The name of the input field for backend identification
     * @var string
     */
    public $name;

    /**
     * The label of the input field (description of the desired content of the input field)
     * @var string
     */
    public $label;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($type, $name, $label)
    {
        $this->type = $type;
        $this->name = $name;
        $this->label = $label;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.inputs.text-input');
    }
}
