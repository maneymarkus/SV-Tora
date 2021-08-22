<nav class="nav">
    <a class="primary-button close">
        <i class="material-icons">close</i>
        <p>Schließen</p>
    </a>
    <p class="bg-text">
    </p>
    <ul>
        <li>
            <a href="{{ url("/dashboard") }}">
                <span class="text">Dashboard</span>
            </a>
            <span class="bg"></span>
        </li>
        <li>
            <a href="{{ url("/entities/persons") }}">
                <span class="text">Personen</span>
            </a>
            <span class="bg"></span>
        </li>
        <li>
            <a href="{{ url("/entities/teams") }}">
                <span class="text">Teams</span>
            </a>
            <span class="bg"></span>
        </li>
        @can("admin")
            <li>
                <a href="{{ url("/entities/clubs") }}">
                    <span class="text">Vereine</span>
                </a>
                <span class="bg"></span>
            </li>
        @elseif(auth()->user())
            <li>
                <a href="{{ url("/entities/clubs/" . auth()->user()->club->id) }}">
                    <span class="text">Verein</span>
                </a>
                <span class="bg"></span>
            </li>
        @endcan
        @if(\App\Models\Tournament::latest()->first()?->active || \Illuminate\Support\Facades\Gate::allows("admin"))
            <li>
                <a href="{{ url("/tournaments/dashboard") }}">
                    <span class="text">Wettkampf-Dashboard</span>
                </a>
                <span class="bg"></span>
            </li>
        @endif
    </ul>
    <div class="image-container">
        <img alt="Symbol eines Kämpfers" src="{{ asset("images/fighter-symbol-white.png") }}" />
    </div>
</nav>
