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
        <a class="link" href="{{ url("/tournament/dashboard") }}">zurück</a>
        <h1>Wettkampf Zeitplan</h1>
        <p>Falls du Parameter bezüglich der Wettkämpfe (z.B. die Standardlänge eines einzelnen Kampfes) einstellen willst, dann findest du das in den <a class="link" href="/settings">Einstellungen</a>.</p>

        <div class="oversize-container">
            <div class="time-schedule-container">
                <div class="time-scale">
                    <span class="time whole start"><span class="emphasize">15:00</span></span>
                    <span class="time">15:15</span>
                    <span class="time">15:30</span>
                    <span class="time">15:45</span>
                    <span class="time whole"><span class="emphasize">16:00</span></span>
                    <span class="time">16:15</span>
                    <span class="time">16:30</span>
                    <span class="time">16:45</span>
                    <span class="time whole"><span class="emphasize">17:00</span></span>
                    <span class="time">17:15</span>
                    <span class="time">17:30</span>
                    <span class="time">17:45</span>
                    <span class="time whole"><span class="emphasize">18:00</span></span>
                </div>
                <div class="locations">
                    <div class="fight-place" data-name="pool 1">
                        <h2>Pool 1</h2>
                    </div>
                    <div class="fight-place" data-name="pool 2">
                        <h2>Pool 2</h2>
                    </div>
                    <div class="fight-place" data-name="pool 3">
                        <h2>Pool 3</h2>
                    </div>
                </div>
            </div>
        </div>

        <div class="time-actions">
            <x-primary-button class="back" href="/tournament/dashboard" text="Zum Dashboard" icon-name="backspace"></x-primary-button>
            <x-primary-button class="reset warning" text="Zurücksetzen" icon-name="restore"></x-primary-button>
            <x-primary-button class="duration" text="Zeitdauer" icon-name="timelapse"></x-primary-button>
            <x-primary-button class="save" text="Speichern" icon-name="save"></x-primary-button>
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
                <div class="category time-block" data-category="1" style="height: 1.6rem">
                    <h3>Kategorie <span class="category-name">1</span></h3>
                    <p><span class="duration">16</span> Minuten</p>
                </div>
                <div class="category time-block" data-category="2" style="height: 2rem">
                    <h3>Kategorie <span class="category-name">2</span></h3>
                    <p><span class="duration">20</span> Minuten</p>
                </div>
                <div class="category time-block" data-category="3" style="height: 4.5rem">
                    <h3>Kategorie <span class="category-name">3</span></h3>
                    <p><span class="duration">45</span> Minuten</p>
                </div>
                <div class="category time-block" data-category="4" style="height: 0.8rem">
                    <h3>Kategorie <span class="category-name">4</span></h3>
                    <p><span class="duration">8</span> Minuten</p>
                </div>
            </div>
        </div>
    </div>

@endsection
