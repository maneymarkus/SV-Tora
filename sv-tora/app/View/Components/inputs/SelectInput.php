<?php

namespace App\View\Components\inputs;

use Illuminate\View\Component;

class SelectInput extends Component
{

    /**
     * The name of the input field for backend identification
     * @var string
     */
    public string $name;

    /**
     * The available options in this select input
     * @var array
     */
    public array $selectableOptions;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(string $name, array $selectableOptions)
    {
        $this->name = $name;
        $this->selectableOptions = $selectableOptions;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.inputs.select-input');
    }
}
