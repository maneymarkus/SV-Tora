<nav class="nav">
    <a class="primary-button close">
        <i class="material-icons">close</i>
        <p>Schließen</p>
    </a>
    <p class="bg-text">
    </p>
    <ul>
        <li>
            <a href="/dashboard">
                <span class="text">Dashboard</span>
            </a>
            <span class="bg"></span>
        </li>
        <li>
            <a href="/entities/persons">
                <span class="text">Personen</span>
            </a>
            <span class="bg"></span>
        </li>
        <li>
            <a href="/entities/teams">
                <span class="text">Teams</span>
            </a>
            <span class="bg"></span>
        </li>
        @can("admin")
            <li>
                <a href="/entities/clubs">
                    <span class="text">Vereine</span>
                </a>
                <span class="bg"></span>
            </li>
        @else
            <li>
                <a href="{{ url("/entities/clubs/" . auth()->user()->club->id) }}">
                    <span class="text">Verein</span>
                </a>
                <span class="bg"></span>
            </li>
        @endcan
        <li>
            <a href="/tournament/dashboard">
                <span class="text">Wettkampf-Dashboard</span>
            </a>
            <span class="bg"></span>
        </li>
    </ul>
    <div class="image-container">
        <img alt="Symbol eines Kämpfers" src="{{ asset("images/fighter-symbol-white.png") }}" />
    </div>
</nav>
