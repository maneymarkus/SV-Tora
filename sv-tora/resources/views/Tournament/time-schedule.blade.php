@extends("layouts.layout", ["title" => "Zeitplan bearbeiten"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/tournament-time-schedule.css") }}" type="text/css" />
@endpush

@push("scripts")
<!-- Specific scripts -->
<script src="{{ asset("js/sites/tournament-time-schedule.js") }}" defer></script>
@endpush

@section("content")

    <main class="limited">
        <x-tournament-admin-info :tournament="$tournament"></x-tournament-admin-info>

        <a class="link" href="{{ url("/tournament/dashboard") }}">zurück</a>
        <h1>Wettkampf Zeitplan</h1>
        <p>Falls du Parameter bezüglich der Wettkämpfe (z.B. die Standardlänge eines einzelnen Kampfes) einstellen willst, dann findest du das in den <a class="link" href="/settings">Einstellungen</a>.</p>

        <div class="oversize-container">
            <div class="time-schedule-container">
                {{ $timeline }}
                <div class="locations">
                    @foreach($fightPlaces as $fightPlace)
                        <div class="fight-place" data-fight-place-id="{{ $fightPlace->id }}">
                            <h2>{{ $fightPlace->name }}</h2>
                            @foreach($fightPlace->timeBlocks as $timeBlock)
                                @if (isset($timeBlock["id"]))
                                    @php
                                        $minutes = ceil($timeBlock["estimated_required_time_in_seconds"] / 60)
                                    @endphp
                                    <div class="category time-block" data-tippy-content="Kategorie {{ $timeBlock["name"] }} (Dauer: {{ $minutes }} Minuten)" data-category-id="{{ $timeBlock["id"] }}" style="height: {{ $timeBlock["height"] }}rem">
                                        <h3>Kategorie <span class="category-name">{{ $timeBlock["name"] }}</span></h3>
                                        <p><span class="duration">{{ $minutes }}</span> Minuten</p>
                                    </div>
                                @elseif (isset($timeBlock["duration"]))
                                    <div class="break time-block" style="height: {{ $timeBlock["height"] }}rem">
                                        <h3>Pause</h3>
                                        <p><span class="duration">{{ $timeBlock["duration"] }}</span> Minuten</p>
                                    </div>
                                @endif
                            @endforeach
                        </div>
                    @endforeach
                </div>
            </div>
        </div>

        <div class="time-actions">
            @php
                $saveUrl = url("/tournaments/" . $tournament->id . "/schedule");
            @endphp
            <x-primary-button class="back" href="/tournament/dashboard" text="Zum Dashboard" icon-name="backspace"></x-primary-button>
            <x-primary-button class="reset warning" text="Zurücksetzen" icon-name="restore"></x-primary-button>
            <x-primary-button class="duration" text="Zeitdauer" icon-name="timelapse"></x-primary-button>
            <x-primary-button class="save" href="{{ $saveUrl }}" text="Speichern" icon-name="save"></x-primary-button>
        </div>

    </main>

    <div class="time-blocks-container">
        <div class="break-section">
            <div class="break time-block">
                <h3>Pause</h3>
                <p><span class="duration">?</span> Minuten</p>
            </div>
        </div>
        <div class="category-section">
            <div class="category-container">
                @foreach($unrankedCategories as $category)
                    @php
                        $minutes = ceil($category->estimated_required_time_in_seconds / 60)
                    @endphp
                    <div class="category time-block" data-tippy-content="Kategorie {{ $category->name }} (Dauer: {{ $minutes }} Minuten)" data-category-id="{{ $category->id }}" style="height: {{ $category->calculateDisplayHeight() }}rem">
                        <h3>Kategorie <span class="category-name">{{ $category->name }}</span></h3>
                        <p><span class="duration">{{ $minutes }}</span> Minuten</p>
                    </div>
                @endforeach
            </div>
        </div>
    </div>

@endsection
