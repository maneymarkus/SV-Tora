<?php

namespace App\View\Components;

use Illuminate\View\Component;

class InfoCard extends Component
{

    /**
     * The name of the asset
     * @var string
     */
    public $name;

    /**
     * The mail address of the asset
     * @var string
     */
    public $mail;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name, $mail)
    {
        $this->name = $name;
        $this->mail = $mail;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.info-card');
    }

}
