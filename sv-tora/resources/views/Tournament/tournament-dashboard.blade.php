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
        <a class="link" href="{{ url("/tournaments") }}">zurück</a>
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
            <h3 data-name="tournament" class="tournament-name">{{ $tournament->tournamentTemplate->tournament_name }}</h3>
            <p>am <span data-name="date" class="tournament-date">{{ \Carbon\Carbon::parse($tournament->date)->format("d.m.Y") }}</span> um <span data-name="time" class="tournament-time">{{ \Carbon\Carbon::parse($tournament->time)->format("H:i") }}</span> Uhr</p>
            <p>
                Voraussichtliches Ende des Wettkampfes: <span class="duration">{{ $tournament->calculateEstimatedEnd()->format("H:i") }}h</span>
                <br />
                <span style="font-size: 0.8em; color: inherit;">(Hierbei handelt es sich um eine Schätzung. Diese Schätzung kann sich durchaus noch verändern und hängt vom Fortschritt der Planung des Wettkampfes ab.)</span>
            </p>
            <p class="more-spacing">Anmeldezeitraum:</p>
            <p><span data-name="enrollment-start" class="enrollment-start">{{ \Carbon\Carbon::parse($tournament->enrollment_start)->format("d.m.Y") }}</span> - <span data-name="enrollment-end" class="enrollment-end">{{ \Carbon\Carbon::parse($tournament->enrollment_end)->format("d.m.Y") }}</span></p>
            <p class="more-spacing">Ort:</p>
            <p><span data-name="place" class="tournament-place">{{ $tournament->place }}</span></p>
            @if($tournament->additional_information != "")
                <p class="more-spacing">Zusätzliche Informationen:</p>
                <p style="text-align: left; padding: 0 2rem"><span data-name="additional_information" class="tournament-additional-info">{{ $tournament->additional_information }}</span></p>
            @endif
        </div>

        <div class="column-container">

            <div class="topic-container dashboard-container data-privacy">
                <h3>Datenschutz-Info</h3>
                <p class="clearfix">
                    Bei Wettkämpfen des Vereins werden durch beauftragte Fotografen Fotos angefertigt, die zur Öffentlichkeitsarbeit und für die Erstellung von Bildergalerien auf der Webseite des SV Tora Berlin e.V. verwendet werden.
                    Sollten Sie nicht mit der Abbildung Ihrer Person oder Ihrer Angehörigen einverstanden sein, teilen Sie dies bitte unverzüglich dem Veranstalter mit, um nachträgliche Einsprüche zu vermeiden.
                </p>
            </div>

            <div class="info dashboard-container">
                <h3>Info</h3>
                <p class="clearfix"><span class="left">Graduierungen</span><span class="right">{{ $tournament->tournamentTemplate->graduation_min . " - " . $tournament->tournamentTemplate->graduation_max }}</span></p>
                <p class="clearfix" style="text-align: center"><a class="link" href="{{ url("/tournaments/" . $tournament->id . "/categories/overview") }}" style="font-size: inherit">Kategorienübersicht</a></p>
            </div>

            @php
                $enrolledPersons = \App\Models\EnrolledPerson::join("people", "people.id", "=", "enrolled_people.person_id")
                    ->select("enrolled_people.*", "people.type as type", "people.id as person_id", "people.club_id as club_id")
                    ->where("club_id", "=", \Illuminate\Support\Facades\Auth::user()->club->id)
                    ->where("tournament_id", "=", $tournament->id);
                $enrolledFighters = \App\Models\EnrolledFighter::join("fighters", "fighters.id", "=", "enrolled_fighters.fighter_id")
                    ->join("people", "people.id", "=", "fighters.person_id")
                    ->where("club_id", "=", \Illuminate\Support\Facades\Auth::user()->club->id)
                    ->where("tournament_id", "=", $tournament->id);
                $enrolledTeams = \App\Models\EnrolledTeam::with("team")
                    ->where("tournament_id", "=", $tournament->id)
                    ->get()
                    ->where("team.club_id", "=", \Illuminate\Support\Facades\Auth::user()->club->id);
            @endphp
            <div class="persons-container dashboard-container">
                <h3>Personen Anmeldungen</h3>
                <div class="grid-container">
                    <a class="enrollment helper group" href="{{ url("/tournaments/" . $tournament->id . "/enrolled/desk-supporters") }}">
                        <p class="text">Tisch&shy;besetzung</p>
                        <span class="circle">
                            <span class="number">{{ $enrolledPersons->get()->where("type", "=", \App\Helper\PersonTypes::DESK_SUPPORTER)->count() }}</span>
                        </span>
                    </a>
                    <a class="enrollment referees group" href="{{ url("/tournaments/" . $tournament->id . "/enrolled/referees") }}">
                        <p class="text">Kampf&shy;&shy;richter</p>
                        <span class="circle">
                            <span class="number">{{ $enrolledPersons->get()->where("type", "=", \App\Helper\PersonTypes::REFEREE)->count() }}</span>
                        </span>
                    </a>
                    <a class="enrollment coaches group" href="{{ url("/tournaments/" . $tournament->id . "/enrolled/coaches") }}">
                        <p class="text">Coaches/<wbr>Helfer</p>
                        <span class="circle">
                            <span class="number">{{ $enrolledPersons->get()->where("type", "=", \App\Helper\PersonTypes::COACH)->count() }}</span>
                        </span>
                    </a>
                    <a class="enrollment starter group" href="{{ url("/tournaments/" . $tournament->id . "/enrolled/fighters") }}">
                        <p class="text">Kämpfer</p>
                        <span class="circle">
                            <span class="number">{{ $enrolledFighters->where("tournament_id", "=", $tournament->id)->get()->count() }}</span>
                        </span>
                    </a>
                </div>
            </div>

            @if($tournament->tournamentTemplate->team)
                <div class="teams-container dashboard-container">
                    <h3>Team Anmeldungen</h3>
                    <a class="enrollment teams" href="{{ url("/tournaments/" . $tournament->id . "/enrolled/teams") }}">
                        <span class="circle">
                            <span class="number">{{ $enrolledTeams->where("tournament_id", "=", $tournament->id)->count() }}</span>
                        </span>
                    </a>
                </div>
            @endif

        </div>

    </main>

@endsection
