<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Tag extends Component
{

    /**
     * The value of the tag (is necessary in contrast to the key value of the tag)
     * @var string
     */
    public $value;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($value)
    {
        $this->value = $value;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.tag');
    }
}
