@extends("layouts.layout", ["title" => "Wettkampf Dashboard"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/tournament-dashboard.css") }}" type="text/css" />
@endpush

@push("scripts")
<!-- Specific scripts -->
<script src="{{ asset("js/sites/tournament-dashboard.js") }}" defer></script>
@endpush

@section("content")

    <main class="tournament clearfix">
        <h1>Wettkampf-Dashboard</h1>

        <div data-progress="1" class="status-container">
            <h3 class="heading">Status: <span class="status">Anmeldung freigeschalten</span></h3>
            <div class="step-container">
                <p class="step selectable">Wettkampf erstellt</p>
                <p class="step selectable">Anmeldung freigeschalten</p>
                <p class="step selectable">Anmeldung geschlossen</p>
                <p class="step">Wettkampftag</p>
                <p class="step">Wettkampf abgeschlossen</p>
            </div>
            <div class="progress-container">
                <div class="progress-bar"></div>
                <div class="progress"></div>
                <span class="handle"></span>
            </div>
        </div>

        <div class="tournament-container">
            <h3 data-name="tournament" class="tournament-name">{{ $tournament->tournamentTemplate->tournament_name }}</h3>
            <p>am <span data-name="date" class="tournament-date">{{ \Carbon\Carbon::parse($tournament->date)->format("d.m.Y") }}</span> um <span data-name="time" class="tournament-time">{{ \Carbon\Carbon::parse($tournament->time)->format("H:i") }}</span> Uhr</p>
            <p class="more-spacing">Anmeldezeitraum:</p>
            <p><span data-name="enrollment-start" class="enrollment-start">{{ \Carbon\Carbon::parse($tournament->enrollment_start)->format("d.m.Y") }}</span> - <span data-name="enrollment-end" class="enrollment-end">{{ \Carbon\Carbon::parse($tournament->enrollment_end)->format("d.m.Y") }}</span></p>
            <p class="more-spacing">Ort:</p>
            <p><span data-name="place" class="tournament-place">{{ $tournament->place }}</span></p>
        </div>

        <div class="column-container">

            <div class="category-administration topic-container dashboard-container">
                <h3>Kategorien</h3>
                <p><span class="count-exams">2</span> Prüfungsformen</p>
                <p><span class="count-kata-categories">6</span> Kata Kategorien</p>
                <p><span class="count-kumite-categories">4</span> Kumite Kategorien</p>
            </div>

            <div class="fighting-systems topic-container dashboard-container">
                <h3>Kampfsysteme</h3>
                <p><span class="count-prepared">2</span> Kampfsysteme zugeordnet</p>
                <p><span class="count-not-prepared">8</span> verbleibend</p>
            </div>

            <div class="fight-places topic-container dashboard-container">
                <h3>Pools</h3>
                <p><span class="count-places">4</span> aktive Pools</p>
            </div>

            <div class="schedule topic-container dashboard-container">
                <h3>Zeitplan</h3>
                <p><span class="duration duration-place-1">3:25h</span> auf Wettkampffläche 1</p>
                <p><span class="duration duration-place-2">3:05h</span> auf Pool 2</p>
                <p><span class="duration duration-place-3">1:45h</span> auf Pool 3</p>
                <p><span class="duration duration-place-4">0:00h</span> auf Pool 4</p>
            </div>

            <div class="info dashboard-container">
                <h3>Info</h3>
                <p class="clearfix"><span class="left">Graduierungen</span><span class="right">{{ $tournament->tournamentTemplate->graduation_min . " - " . $tournament->tournamentTemplate->graduation_max }}</span></p>
            </div>

            <div class="persons-container dashboard-container">
                <h3>Personen Anmeldungen</h3>
                <div class="grid-container">
                    <a class="starter group" href="#">
                        <p class="text">Starter</p>
                        <span class="circle">
                            <span class="number">117</span>
                        </span>
                    </a>
                    <a class="referees group" href="#">
                        <p class="text">Kampf&shy;richter</p>
                        <span class="circle">
                            <span class="number">3</span>
                        </span>
                    </a>
                    <a class="coaches group" href="#">
                        <p class="text">Coaches</p>
                        <span class="circle">
                            <span class="number">5</span>
                        </span>
                    </a>
                    <a class="helper group" href="#">
                        <p class="text">Helfer</p>
                        <span class="circle">
                            <span class="number">2</span>
                        </span>
                    </a>
                </div>
            </div>

            <div class="teams-container dashboard-container">
                <h3>Team Anmeldungen</h3>
                <a class="teams" href="#">
                    <span class="circle">
                        <span class="number">13</span>
                    </span>
                </a>
            </div>

        </div>

    </main>

@endsection
