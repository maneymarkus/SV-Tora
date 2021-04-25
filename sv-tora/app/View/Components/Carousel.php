<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Carousel extends Component
{

    /**
     * The slides/pages that should be available in this carousel (this is basically only a heading for each slide)
     * @var string[]
     */
    public $slides;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($slides)
    {
        $this->slides = $slides;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.carousel');
    }
}
