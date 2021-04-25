<?php

namespace App\View\Components\carousel;

use Illuminate\View\Component;

class Slide extends Component
{

    /**
     * The title of this particular slide/page
     * @var string
     */
    public $title;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($title)
    {
        $this->title = $title;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.carousel.slide');
    }
}
