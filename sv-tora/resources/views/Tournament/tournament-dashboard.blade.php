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

    <main class="no-tournament">
        <h1>Zur Zeit findet kein Wettkampf statt.</h1>
        <a class="host-tournament tilt">
            <i class="material-icons">add</i>
            <p>Wettkampf veranstalten</p>
        </a>
    </main>

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
            <h3 data-name="tournament" class="tournament-name">Tora-Pokal</h3>
            <p>am <span data-name="date" class="tournament-date">24.04.2021</span> um <span data-name="time" class="tournament-time">13:00</span> Uhr</p>
            <p class="more-spacing">Anmeldezeitraum:</p>
            <p><span data-name="enrollment-start" class="enrollment-start">01.04.2021</span> - <span data-name="enrollment-end" class="enrollment-end">20.04.2021</span></p>
            <p class="more-spacing">Ort:</p>
            <p><span data-name="place" class="tournament-place">Turnhalle hier</span></p>
        </div>

        <div class="column-container">

            <a class="category-administration topic-container container" href="/tournament/category-administration">
                <h3>Kategorien</h3>
                <p><span class="count-exams">2</span> Prüfungsformen</p>
                <p><span class="count-kata-categories">6</span> Kata Kategorien</p>
                <p><span class="count-kumite-categories">4</span> Kumite Kategorien</p>
            </a>

            <a class="fighting-systems topic-container container" href="/tournament/category-fighting-systems">
                <h3>Kampfsysteme</h3>
                <p><span class="count-prepared">2</span> Kampfsysteme zugeordnet</p>
                <p><span class="count-not-prepared">8</span> verbleibend</p>
            </a>

            <a class="excluded-clubs topic-container container">
                <h3>Ausgeschlossene Vereine</h3>
                <p><span class="count-excluded">2</span> Vereine ausgeschlossen ausgeschlossen</p>
            </a>

            <a class="fight-places topic-container container" href="/tournament/fight-place-administration">
                <h3>Pools</h3>
                <p><span class="count-places">4</span> aktive Pools</p>
            </a>

            <a class="schedule topic-container container" href="/tournament/time-schedule">
                <h3>Zeitplan</h3>
                <p><span class="duration duration-place-1">3:25h</span> auf Wettkampffläche Wettkampffläche 1</p>
                <p><span class="duration duration-place-2">3:05h</span> auf Pool 2</p>
                <p><span class="duration duration-place-3">1:45h</span> auf Pool 3</p>
                <p><span class="duration duration-place-4">0:00h</span> auf Pool 4</p>
            </a>

            <div class="info container">
                <h3>Info</h3>
                <p class="clearfix"><span class="left">Graduierungen</span><span class="right">7. Kyu - 6. Dan</span></p>
            </div>

            <div class="actions clearfix container">
                <div class="change-actions">
                    <a class="primary-button change-status">
                        <i class="material-icons">build</i>
                        <p>Status ändern</p>
                    </a>
                    <a class="primary-button change-tournament">
                        <i class="material-icons">settings</i>
                        <p>Wettkampf ändern</p>
                    </a>
                    <a class="primary-button change-category" href="/tournament/category-administration">
                        <i class="material-icons">group</i>
                        <p>Kategorien administrieren</p>
                    </a>
                    <a class="primary-button change-fight-system" href="/tournament/category-fighting-systems">
                        <i class="material-icons">view_carousel</i>
                        <p>Kampfsysteme wählen</p>
                    </a>
                    <a class="primary-button exclude-clubs">
                        <i class="material-icons">block</i>
                        <p>Verein ausschließen</p>
                    </a>
                    <a class="primary-button change-places" href="/tournament/fight-place-administration">
                        <i class="material-icons">space_bar</i>
                        <p>Pools verwalten</p>
                    </a>
                    <a class="primary-button change-schedule" href="/tournament/time-schedule">
                        <i class="material-icons">schedule</i>
                        <p>Zeitplan managen</p>
                    </a>
                </div>
                <a class="primary-button warning cancel-tournament">
                    <i class="material-icons">close</i>
                    <p>Wettkampf absagen</p>
                </a>
            </div>

            <div class="persons-container container">
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

            <div class="teams-container container">
                <h3>Team Anmeldungen</h3>
                <a class="teams" href="#">
                    <span class="circle">
                        <span class="number">13</span>
                    </span>
                </a>
            </div>

        </div>

    </main>

    <div class="primary-button-floating-container mode-control">
        <a class="primary-button fight-mode" href="#">
            <i class="material-icons">whatshot</i>
            <p>Wettkampf-Modus</p>
        </a>
    </div>

    <div class="exclude-clubs-modal clearfix">
        <a class="primary-button close">
            <i class="material-icons">close</i>
            <p>Schließen</p>
        </a>
        <h3>Vereine ausschließen</h3>

        <div class="exclude-container">
            <h4>Ausgeschlossene Vereine</h4>
            <div class="excluded-clubs">
                <span class="no-exclusion">Keiner</span>
            </div>
        </div>

        <hr class="separator" />

        <div class="exclude-container clearfix">
            <h4>Weitere Vereine ausschließen</h4>
            <span class="text-input-container input-container">
                <label class="icon" for="exclude-entity"><i class="material-icons">person</i></label>
                <input name="exclude-entity" class="text-input" type="text" id="exclude-entity"/>
                <label class="text" for="exclude-entity">Suche/Freitexteingabe</label>
                <span class="underline"></span>
            </span>
            <div class="club-selection">

            </div>
            <a class="secondary-button accent-1 exclude">
                <span class="text">
                    Ausschließen
                </span>
            </a>
        </div>
    </div>

@endsection
