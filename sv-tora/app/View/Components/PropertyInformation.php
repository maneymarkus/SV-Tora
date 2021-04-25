<?php

namespace App\View\Components;

use Illuminate\View\Component;

class PropertyInformation extends Component
{

    /**
     * A map of properties in the format of: key => value
     * @var string[]
     */
    public $properties;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($properties)
    {
        $this->properties = $properties;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.property-information');
    }
}
