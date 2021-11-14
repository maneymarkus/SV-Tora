<?php

namespace App\Http\Middleware;

use App\Models\Tournament;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class EnsureTournamentIsActive
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @param Tournament $tournament
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $tournament = $request->route()->parameter("tournament");
        if (!$tournament->active) {
            if (Gate::allows("admin")) {
                return redirect("/tournament/dashboard");
            } else {
                return redirect()->route("dashboard");
            }
        }

        return $next($request);
    }
}
