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
            <a class="link" href="/settings/categories">Anzeigen</a>

            <h3>Wettkämpfe</h3>
            <a class="link" href="/settings/tournament-templates">Bearbeiten</a>

            <h3>Rechteverwaltung (Auch: Administrator hinzufügen)</h3>
            <a class="link" href="/entities/admins">Bearbeiten</a>

            <h3 class="margin-bottom">Wettkampf Parameter</h3>
            <h4>Zeit pro Kampf in Sekunden: <span class="time-for-one-fight">{{ \App\Models\GlobalSetting::getSetting("fight_time_in_seconds") }}</span>s</h4>
            <a class="link fight-time-in-seconds">Bearbeiten</a>

        </div>
    </main>

@endsection
