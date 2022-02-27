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
        <a class="link" href="{{ url("/dashboard") }}">zurück</a>
        <h1>Wettkampf-Dashboard</h1>

        <div data-progress="{{ $progressStep }}" class="status-container">
            <h3 class="heading">Status: <span class="status">{{ config("tournament.tournament_statuus")[$tournament->status] }}</span></h3>
            <div class="step-container">
                @foreach(config("tournament.tournament_statuus") as $tournamentStatus)
                    <p class="step">{{ $tournamentStatus }}</p>
                @endforeach
            </div>
            <div class="progress-container">
                <div class="progress-bar"></div>
                <div class="progress"></div>
                <span class="handle"></span>
            </div>
        </div>

        <div class="tournament-container">
            <h3 data-name="Wettkampf-Vorlage" class="tournament-name">{{ $tournament->tournamentTemplate->tournament_name }}</h3>
            <p>am <span data-name="Datum" class="tournament-date">{{ \Carbon\Carbon::parse($tournament->date)->format("d.m.Y") }}</span> um <span data-name="Uhrzeit" class="tournament-time">{{ \Carbon\Carbon::parse($tournament->time)->format("H:i") }}</span> Uhr</p>
            <p class="more-spacing">Anmeldezeitraum:</p>
            <p><span data-name="Anmeldezeitraum Start" class="enrollment-start">{{ \Carbon\Carbon::parse($tournament->enrollment_start)->format("d.m.Y") }}</span> - <span data-name="Anmeldezeitraum Ende" class="enrollment-end">{{ \Carbon\Carbon::parse($tournament->enrollment_end)->format("d.m.Y") }}</span></p>
            <p class="more-spacing">Ort:</p>
            <p><span data-name="Ort" class="tournament-place">{{ $tournament->place }}</span></p>
            @if($tournament->additional_information != "")
                <p class="more-spacing">Zusätzliche Informationen:</p>
                <p style="text-align: left; padding: 0 2rem"><span data-name="additional_information" class="tournament-additional-info">{{ $tournament->additional_information }}</span></p>
            @endif
        </div>

        <div class="column-container clearfix">

            <a class="category-administration topic-container dashboard-container" href="{{ $changeCategoriesUrl }}">
                <h3>Kategorien</h3>
                <p><span class="count-exams">{{ count(explode(";", $tournament->tournamentTemplate->examination_types)) }}</span> Prüfungsformen</p>
                @if($tournament->tournamentTemplate->kihon)
                    <p><span class="count-kihon-categories">{{ $tournament->categories()->where("examination_type", "=", "Kihon")->get()->count() }}</span> Kihon Kategorie(n)</p>
                @endif
                <p><span class="count-kata-categories">{{ $tournament->categories()->where("examination_type", "=", "Kata")->get()->count() }}</span> Kata Kategorie(n)</p>
                <p><span class="count-kumite-categories">{{ $tournament->categories()->where("examination_type", "=", "Kumite")->get()->count() }}</span> Kumite Kategorie(n)</p>
                @if($tournament->tournamentTemplate->team)
                    <p><span class="count-team-categories">{{ $tournament->categories()->where("examination_type", "=", "Team")->get()->count() }}</span> Team Kategorie(n)</p>
                @endif
            </a>

            <a class="fighting-systems topic-container dashboard-container {{ $tournament->categories()->where("prepared", "=", false)->get()->count() === 0 ? "prepared" : "" }}" href="{{ $changeFightingSystemsUrl }}">
                <h3>Kampfsysteme</h3>
                <p><span class="count-prepared">{{ $tournament->categories()->where("prepared", "=", true)->get()->count() }}</span> Kampfsystem(e) zugeordnet</p>
                <p><span class="count-not-prepared">{{ $tournament->categories()->where("prepared", "=", false)->get()->count() }}</span> verbleibend</p>
            </a>

            <a class="excluded-clubs topic-container dashboard-container" href="{{ $excludeClubsUrl }}">
                <h3>Ausgeschlossene Vereine</h3>
                <p><span class="count-excluded">{{ $tournament->excludedClubs->count() }}</span> Vereine ausgeschlossen</p>
            </a>

            <a class="fight-places topic-container dashboard-container" href="{{ $changeFightingPlacesUrl }}">
                <h3>Pools</h3>
                <p><span class="count-places">{{ $tournament->fightPlaces->count() }}</span> aktive Pools</p>
            </a>

            <a class="schedule topic-container dashboard-container" href="{{ $changeScheduleUrl }}">
                <h3>Zeitplan</h3>
                <p>Voraussichtliches Ende des Wettkampfes: <span class="duration">{{ $tournament->calculateEstimatedEnd()->format("H:i") }}h</span></p>
                @foreach(\App\Models\FightPlace::all() as $fightPlace)
                    <p><span class="duration">{{ \Carbon\Carbon::today()->set("second", $fightPlace->calculateTimeInSeconds())->format("H:i") }}h</span> auf {{ $fightPlace->name }}</p>
                @endforeach
            </a>

            <div class="info dashboard-container">
                <h3>Info</h3>
                <p class="clearfix"><span class="left">Graduierungen</span><span class="right">{{ $tournament->tournamentTemplate->graduation_min . " - " . $tournament->tournamentTemplate->graduation_max }}</span></p>
            </div>

            <div class="actions clearfix dashboard-container">
                <div class="change-actions">
                    <x-primary-button class="change-status" href="{{ $changeTournamentStatusUrl }}" text="Status ändern" icon-name="build"></x-primary-button>
                    <x-primary-button class="change-tournament" href="{{ $changeTournamentUrl }}" text="Wettkampf ändern" icon-name="settings"></x-primary-button>
                    <x-primary-button class="change-category" href="{{ $changeCategoriesUrl }}" text="Kategorien administrieren" icon-name="group"></x-primary-button>
                    <x-primary-button class="change-fight-system" href="{{ $changeFightingSystemsUrl }}" text="Kampfsysteme wählen" icon-name="view_carousel"></x-primary-button>
                    <x-primary-button class="exclude-clubs" href="{{ $excludeClubsUrl }}" text="Verein ausschließen" icon-name="block"></x-primary-button>
                    <x-primary-button class="change-places" href="{{ $changeFightingPlacesUrl }}"  text="Pools verwalten" icon-name="space_bar"></x-primary-button>
                    <x-primary-button class="change-schedule" href="{{ $changeScheduleUrl }}"  text="Zeitplan managen" icon-name="schedule"></x-primary-button>
                    <x-primary-button class="invite-clubs" href="{{ $inviteClubsUrl }}"  text="Vereine zum Wettkampf einladen" icon-name="group_add"></x-primary-button>
                </div>
                @if($progressStep == 4)
                    <x-primary-button class="complete-tournament accent-1" href="{{ $completeTournamentUrl }}" text="Wettkampf abschließen" icon-name="done"></x-primary-button>
                @else
                    <x-primary-button class="warning cancel-tournament" href="{{ $deleteTournamentUrl }}" text="Wettkampf absagen" icon-name="close"></x-primary-button>
                @endif
            </div>

            @php
                $enrolledPersons = \App\Models\EnrolledPerson::join("people", "people.id", "=", "enrolled_people.person_id")
                    ->select("enrolled_people.*", "people.type as type", "people.id as person_id")
                    ->where("tournament_id", "=", $tournament->id);
            @endphp
            <div class="persons-container dashboard-container">
                <h3>Personen Anmeldungen</h3>
                <div class="grid-container">
                    <a class="enrollment starter group {{ $enrollment }}" href="{{ url("/tournaments/" . $tournament->id . "/enrolled/fighters") }}">
                        <p class="text">Starter</p>
                        <span class="circle">
                            <span class="number">{{ \App\Models\EnrolledFighter::where("tournament_id", "=", $tournament->id)->get()->count() }}</span>
                        </span>
                    </a>
                    <a class="enrollment referees group {{ $enrollment }}" href="{{ url("/tournaments/" . $tournament->id . "/enrolled/referees") }}">
                        <p class="text">Kampf&shy;richter</p>
                        <span class="circle">
                            <span class="number">{{ $enrolledPersons->where("type", "=", \App\Helper\PersonTypes::REFEREE)->get()->count() }}</span>
                        </span>
                    </a>
                    <a class="enrollment coaches group {{ $enrollment }}" href="{{ url("/tournaments/" . $tournament->id . "/enrolled/coaches") }}">
                        <p class="text">Coaches</p>
                        <span class="circle">
                            <span class="number">{{ $enrolledPersons->where("type", "=", \App\Helper\PersonTypes::COACH)->get()->count() }}</span>
                        </span>
                    </a>
                    <a class="enrollment helper group {{ $enrollment }}" href="{{ url("/tournaments/" . $tournament->id . "/enrolled/helper") }}">
                        <p class="text">Helfer</p>
                        <span class="circle">
                            <span class="number">{{ $enrolledPersons->where("type", "=", \App\Helper\PersonTypes::HELPER)->get()->count() }}</span>
                        </span>
                    </a>
                </div>
            </div>

            @if($tournament->tournamentTemplate->team)
                <div class="teams-container dashboard-container">
                    <h3>Team Anmeldungen</h3>
                    <a class="enrollment teams  {{ $enrollment }}" href="{{ url("/tournaments/" . $tournament->id . "/enrolled/teams") }}">
                        <span class="circle">
                            <span class="number">{{ \App\Models\EnrolledTeam::where("tournament_id", "=", $tournament->id)->get()->count() }}</span>
                        </span>
                    </a>
                </div>
            @endif

        </div>

    </main>

    <div class="primary-button-floating-container mode-control">
        <a class="primary-button fight-mode">
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
            <p>Ausgeschlossene Vereine dürfen sich nicht zu diesem Wettkampf anmelden. Vereine, die von euch ausgeschlossen wurden, bekommen erstens keine Informationen (via E-Mail) zum aktuellen Wettkampf und zweitens sehen sie diesen nicht im Dashboard.</p>
            <div class="excluded-clubs">
                @if($tournament->excludedClubs->count() > 0)
                    @foreach($tournament->excludedClubs as $excludedClub)
                        <x-tag class="excluded-club" value="{{ $excludedClub->name }}"></x-tag>
                    @endforeach
                @else
                    <span class="no-exclusion">Keiner</span>
                @endif
            </div>
        </div>

        <hr class="separator" />

        <div class="exclude-container clearfix">
            <h4>Weitere Vereine ausschließen</h4>
            <span class="text-input-container input-container">
                <label class="icon" for="exclude-entity"><i class="material-icons">person</i></label>
                <input name="exclude-entity" class="text-input" type="text" id="exclude-entity"/>
                <label class="text" for="exclude-entity">Suche</label>
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
