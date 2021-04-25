@extends("layouts.layout", ["title" => "Einstellungen"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/settings.css") }}" type="text/css" />
@endpush

@push("scripts")
    <!-- Specific scripts -->
    <script src="{{ asset("js/sites/settings.js") }}" defer></script>
@endpush

@section("content")

    <main class="limited clearfix">

        <h1>Einstellungen</h1>

        <div class="col">
            <h3>Kategorien</h3>
            <a class="link" href="/settings/categories">Bearbeiten</a>

            <h3>Wettkämpfe</h3>
            <a class="link" href="/settings/tournaments">Bearbeiten</a>

            <h3>Rechteverwaltung (Auch: Administrator hinzufügen)</h3>
            <a class="link" href="/entities/admins">Bearbeiten</a>

            <h3 class="margin-bottom">Wettkampf Parameter</h3>
            <div class="range-input-container input-container">
                <label class="range-label" for="fight-time">Zeit pro Kampf in Sekunden: <span class="range-value fight-time">0</span>s</label>
                <input class="range-input" type="range" id="fight-time" min="5" max="600" step="5" value="120">
            </div>

        </div>
    </main>

@endsection
