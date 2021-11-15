<?php

namespace App\View\Components;

use App\Models\Tournament;
use Illuminate\View\Component;

class TournamentAdminInfo extends Component
{

    /**
     * The concerned Tournament
     *
     * @var Tournament
     */
    public Tournament $tournament;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(Tournament $tournament)
    {
        $this->tournament = $tournament;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.tournament-admin-info');
    }
}
