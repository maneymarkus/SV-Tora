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
            <h3 data-name="tournament" class="tournament-name">{{ $tournament->tournamentTemplate->tournament_name }}</h3>
            <p>am <span data-name="date" class="tournament-date">{{ \Carbon\Carbon::parse($tournament->date)->format("d.m.Y") }}</span> um <span data-name="time" class="tournament-time">{{ \Carbon\Carbon::parse($tournament->time)->format("H:i") }}</span> Uhr</p>
            <p class="more-spacing">Anmeldezeitraum:</p>
            <p><span data-name="enrollment-start" class="enrollment-start">{{ \Carbon\Carbon::parse($tournament->enrollment_start)->format("d.m.Y") }}</span> - <span data-name="enrollment-end" class="enrollment-end">{{ \Carbon\Carbon::parse($tournament->enrollment_end)->format("d.m.Y") }}</span></p>
            <p class="more-spacing">Ort:</p>
            <p><span data-name="place" class="tournament-place">{{ $tournament->place }}</span></p>
        </div>

        <div class="column-container">

            <div class="info dashboard-container">
                <h3>Info</h3>
                <p class="clearfix"><span class="left">Graduierungen</span><span class="right">{{ $tournament->tournamentTemplate->graduation_min . " - " . $tournament->tournamentTemplate->graduation_max }}</span></p>
            </div>

            @php
                $enrolledPersons = \App\Models\EnrolledPerson::join("people", "people.id", "=", "enrolled_people.person_id")
                    ->select("enrolled_people.*", "people.type as type", "people.id as person_id", "people.club_id as club_id")
                    ->where("club_id", "=", \Illuminate\Support\Facades\Auth::user()->club->id);
                $enrolledFighters = \App\Models\EnrolledFighter::join("fighters", "fighters.id", "=", "enrolled_fighters.fighter_id")
                    ->join("people", "people.id", "=", "fighters.person_id")
                    ->where("club_id", "=", \Illuminate\Support\Facades\Auth::user()->club->id);
            @endphp
            <div class="persons-container dashboard-container" style="margin-top: 7rem !important;">
                <h3>Personen Anmeldungen</h3>
                <div class="grid-container">
                    <a class="enrollment starter group {{ $enrollment }}" href="{{ url("/tournaments/" . $tournament->id . "/enrolled/fighters") }}">
                        <p class="text">Starter</p>
                        <span class="circle">
                            <span class="number">{{ $enrolledFighters->where("tournament_id", "=", $tournament->id)->get()->count() }}</span>
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
                    <a class="enrollment teams {{ $enrollment }}" href="{{ url("/tournaments/" . $tournament->id . "/enrolled/teams") }}">
                        <span class="circle">
                            <span class="number">13</span>
                        </span>
                    </a>
                </div>
            @endif

        </div>

    </main>

@endsection
