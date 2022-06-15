@php

$fight_place_options = ["Pool 1", "Pool 2", "Pool 3"];

@endphp

@extends("layouts.layout", ["title" => "Wettkampfmodus"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/competition-mode.css") }}" type="text/css" />
@endpush

@push("scripts")
<!-- Specific scripts -->
<script src="{{ asset("js/sites/competition-mode.js") }}" defer></script>
@endpush

@section("content")

    <main>

        <div class="page-container complete-overview active">

            <h1>Wettkampftag! - Gesamt&shy;übersicht</h1>

            <div class="oversize-container">
                <div class="main time-schedule-container">
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
                        <div class="location-column fight-place" data-name="pool 1">
                            <h2>Pool 1</h2>
                            <div class="category time-block" data-category="1" style="height: 2.66rem">
                                <h3>Kategorie <span class="category-name">1</span></h3>
                                <p><span class="duration">16</span> Minuten</p>
                            </div>
                            <div class="category time-block" data-category="3" style="height: 7.5rem">
                                <h3>Kategorie <span class="category-name">3</span></h3>
                                <p><span class="duration">44</span> Minuten</p>
                            </div>
                            <div class="category time-block" data-category="9" style="height: 11rem">
                                <h3>Kategorie <span class="category-name">9</span></h3>
                                <p><span class="duration">66</span> Minuten</p>
                            </div>
                            <div class="category time-block" data-category="12" style="height: 6rem">
                                <h3>Kategorie <span class="category-name">12</span></h3>
                                <p><span class="duration">36</span> Minuten</p>
                            </div>
                        </div>
                        <div class="location-column fight-place" data-name="pool 2">
                            <h2>Pool 2</h2>
                            <div class="category time-block" data-category="2" style="height: 5.33rem">
                                <h3>Kategorie <span class="category-name">2</span></h3>
                                <p><span class="duration">32</span> Minuten</p>
                            </div>
                            <div class="category time-block" data-category="6" style="height: 1.33rem">
                                <h3>Kategorie <span class="category-name">6</span></h3>
                                <p><span class="duration">8</span> Minuten</p>
                            </div>
                            <div class="category time-block" data-category="7" style="height: 2rem">
                                <h3>Kategorie <span class="category-name">7</span></h3>
                                <p><span class="duration">12</span> Minuten</p>
                            </div>
                            <div class="category time-block" data-category="8" style="height: 4.66rem">
                                <h3>Kategorie <span class="category-name">8</span></h3>
                                <p><span class="duration">28</span> Minuten</p>
                            </div>
                            <div class="category time-block" data-category="10" style="height: 9rem">
                                <h3>Kategorie <span class="category-name">10</span></h3>
                                <p><span class="duration">54</span> Minuten</p>
                            </div>
                            <div class="category time-block" data-category="13" style="height: 1.66rem">
                                <h3>Kategorie <span class="category-name">13</span></h3>
                                <p><span class="duration">10</span> Minuten</p>
                            </div>
                        </div>
                        <div class="location-column fight-place" data-name="pool 3">
                            <h2>Pool 3</h2>
                            <div class="category time-block" data-category="4" style="height: 12rem">
                                <h3>Kategorie <span class="category-name">4</span></h3>
                                <p><span class="duration">72</span> Minuten</p>
                            </div>
                            <div class="category time-block" data-category="5" style="height: 2.33rem">
                                <h3>Kategorie <span class="category-name">5</span></h3>
                                <p><span class="duration">14</span> Minuten</p>
                            </div>
                            <div class="category time-block" data-category="11" style="height: 6.33rem">
                                <h3>Kategorie <span class="category-name">11</span></h3>
                                <p><span class="duration">38</span> Minuten</p>
                            </div>
                            <div class="break time-block" style="height: 6rem">
                                <h3>Pause</h3>
                                <p><span class="duration">36</span> Minuten</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tournament-progress">
                <span class="start">Start:<br /><span class="time time-start">15:00</span> Uhr</span>
                <span class="estimated-end">Geschätztes Ende:<br /><span class="time time-end">17:43</span> Uhr</span>
                <span class="progress">59%</span>
                <span class="progress-bar"></span>
            </div>

        </div>

        <div class="page-container fight-place-detail-view">

            <h1>Wettkampftag! - Pool&shy;übersicht</h1>

            <x-inputs.select-input name="fight-place" :selectable-options="$fight_place_options">
                <x-slot name="placeholder">Wähle einen Pool</x-slot>
            </x-inputs.select-input>

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

                </div>
            </div>

        </div>

    </main>

    <div class="category-detail-view">
        <a class="previous-category category-control">
            <i class="material-icons">chevron_left</i>
        </a>
        <div class="category-detail-modal">
            <x-primary-button class="close" text="Schließen" icon-name="close"></x-primary-button>
            <h3 class="category">Kategorie <span class="category-name">5</span></h3>
            <p class="category-status">Status: <span class="current-status active">Aktiv</span></p>
            <div class="property-information">
                <p class="examinationType" data-property="Prüfungsform">Kumite</p>
                <p class="fighting-system space-below" data-property="Kampfsystem">Brasilianisches KO-System</p>
                <p class="graduation" data-property="Graduierung">1. Kyu</p>
                <p class="age" data-property="Alter">12-14</p>
                <p class="sex space-below" data-property="Geschlecht">Männlich</p>
                <p class="fighter" data-property="Kämpfer"><a class="link">13</a></p>
                <p class="referees" data-property="Kampfrichter"><a class="link">1</a></p>
                <p class="helper" data-property="Helfer"><a class="link">0</a></p>
            </div>
            <a class="secondary-button category-status-control finish-category">
                <span class="text">
                    <i class="material-icons">check_circle</i>
                    Kategorie abschließen
                </span>
            </a>
            <div class="category-actions">
                <x-primary-button class="print" text="Drucken" icon-name="print" href="#"></x-primary-button>
                <x-primary-button class="execute-fighting-system" text="Kampfsystem öffnen" icon-name="device_hub" href="#"></x-primary-button>
                <x-primary-button class="positioning disabled" text="Platzierung" icon-name="filter_1" href="#"></x-primary-button>
            </div>
        </div>
        <a class="next-category category-control">
            <i class="material-icons">chevron_right</i>
        </a>
    </div>

    <div class="page-control">
        <a class="complete-overview page-switcher active" data-page="complete-overview">
            <i class="material-icons">dashboard</i>
        </a>
        <a class="fight-place-overview page-switcher" data-page="fight-place-detail-view">
            <i class="material-icons">view_array</i>
        </a>
    </div>

@endsection
