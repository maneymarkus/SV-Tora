@extends("layouts.layout", ["title" => "Wettkampf Übersicht"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/tournament-overview.css") }}" type="text/css" />
@endpush

@push("scripts")
<!-- Specific scripts -->
<script src="{{ asset("js/sites/tournament-overview.js") }}" defer></script>
@endpush

@section("content")

    <main class="limited">
        <a class="link" href="{{ url()->previous("/dashboard") }}">zurück</a>
        <h1>Aktive Wettkämpfe</h1>
        <div class="active-tournaments">
            @if(\App\Models\Tournament::hasActiveTournament())
                @foreach($activeTournaments as $tournament)
                    <a class="tournament-card" href="{{ url("/tournaments/" . $tournament->id) }}">
                        <h3 class="tournament-name">
                            {{ $tournament->tournamentTemplate->tournament_name }}
                        </h3>
                        <div class="tournament-infos">
                            <p class="tournament-date"><span class="key">Datum</span><span class="value">{{ \Carbon\Carbon::parse($tournament->date)->format("d.m.Y") }}</span></p>
                            <p class="tournament-time"><span class="key">Zeit</span><span class="value">{{ \Carbon\Carbon::parse($tournament->time)->format("H:i") }}</span></p>
                            <p class="tournament-place"><span class="key">Ort</span><span class="value">{{ $tournament->place }}</span></p>
                            <p class="tournament-enrollment-dates"><span class="key">Anmelde&shy;zeitraum</span><span class="value">{{ \Carbon\Carbon::parse($tournament->enrollment_start)->format("d.m.Y") }} - {{ \Carbon\Carbon::parse($tournament->enrollment_end)->format("d.m.Y") }}</span></p>
                        </div>
                    </a>
                @endforeach
            @else
                <div class="no-tournament-card">
                    <h3 class="tournament-name">
                        Zur Zeit findet kein Wettkampf statt
                    </h3>
                </div>
            @endif
            @if(\Illuminate\Support\Facades\Auth::user()->isAdmin())
                <a class="host-tournament tilt" href="{{ url("/tournaments") }}">
                    <i class="material-icons">add</i>
                    <p>Wettkampf veranstalten</p>
                </a>
            @endif
        </div>
        @if(\Illuminate\Support\Facades\Auth::user()->isAdmin())
            <h2>Vergangene Wettkämpfe</h2>
            <div class="active-tournaments">
                @foreach($hostedTournaments as $tournament)
                    <a class="tournament-card" href="{{ url("/tournaments/" . $tournament->id) }}">
                        <h3 class="tournament-name">
                            {{ $tournament->tournamentTemplate->tournament_name }}
                        </h3>
                        <div class="tournament-infos">
                            <p class="tournament-date"><span class="key">Datum</span><span class="value">{{ \Carbon\Carbon::parse($tournament->date)->format("d.m.Y") }}</span></p>
                            <p class="tournament-time"><span class="key">Zeit</span><span class="value">{{ \Carbon\Carbon::parse($tournament->time)->format("H:i") }}</span></p>
                            <p class="tournament-place"><span class="key">Ort</span><span class="value">{{ $tournament->place }}</span></p>
                            <p class="tournament-enrollment-dates"><span class="key">Anmelde&shy;zeitraum</span><span class="value">{{ \Carbon\Carbon::parse($tournament->enrollment_start)->format("d.m.Y") }} - {{ \Carbon\Carbon::parse($tournament->enrollment_end)->format("d.m.Y") }}</span></p>
                        </div>
                    </a>
                @endforeach
            </div>
        @endif
    </main>

@endsection
