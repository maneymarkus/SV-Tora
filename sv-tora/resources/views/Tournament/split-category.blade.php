@extends("layouts.layout", ["title" => "Kategorie teilen"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/split-category.css") }}" type="text/css" />
@endpush

@push("scripts")
<!-- Specific scripts -->
<script src="{{ asset("js/sites/split-category.js") }}" defer></script>
@endpush

@section("content")

    <main class="limited clearfix">
        <h1>Kategorie <span class="old-category-name">5</span> Teilen</h1>

        <div class="left-category category-container">
            <span class="left-category-name category-name">5a</span>
        </div>

        <div class="right-category category-container">
            <span class="right-category-name category-name">5b</span>
        </div>

        <div class="commands clearfix">

            <x-primary-button class="divide" text="Kategorie teilen!" icon-name="done"></x-primary-button>

            <x-primary-button class="cancel warning" text="Abbrechen" icon-name="close"></x-primary-button>

        </div>

    </main>

    <div class="fighter-card">
        <h2 class="fighter-name">Marcus Popopov</h2>
        <p class="clearfix">Alter: <span class="age">21</span></p>
        <p class="clearfix">Geschlecht: <span class="sex">Männlich</span></p>
        <p class="clearfix">Kategorie: <span class="category">5</span></p>
        <p class="clearfix">Graduierung: <span class="graduation">Obermeister</span></p>
        <p class="clearfix">Verein: <span class="club">SV Tora</span></p>
    </div>
    <div class="fighter-card">
        <h2 class="fighter-name">Florian Reichbürger</h2>
        <p class="clearfix">Alter: <span class="age">21 Jahre</span></p>
        <p class="clearfix">Geschlecht: <span class="sex">Männlich</span></p>
        <p class="clearfix">Kategorie: <span class="category">5</span></p>
        <p class="clearfix">Graduierung: <span class="graduation">Meister</span></p>
        <p class="clearfix">Verein: <span class="club">SV Tora</span></p>
    </div>
    <div class="fighter-card">
        <h2 class="fighter-name">Markus The Strong Städler</h2>
        <p class="clearfix">Alter: <span class="age">22 Jahre</span></p>
        <p class="clearfix">Geschlecht: <span class="sex">Super Männlich</span></p>
        <p class="clearfix">Kategorie: <span class="category">8</span></p>
        <p class="clearfix">Graduierung: <span class="graduation">Powerlifter</span></p>
        <p class="clearfix">Verein: <span class="club">Mein Verein e. V. </span></p>
    </div>
    <div class="fighter-card">
        <h2 class="fighter-name">Irgendein Anderer</h2>
        <p class="clearfix">Alter: <span class="age">20 Jahre</span></p>
        <p class="clearfix">Geschlecht: <span class="sex">Weiblich</span></p>
        <p class="clearfix">Kategorie: <span class="category">6</span></p>
        <p class="clearfix">Graduierung: <span class="graduation">Leutnant</span></p>
        <p class="clearfix">Verein: <span class="club">SV Tora</span></p>
    </div>

    <div class="assigning-commands active">
        <a class="to-left">
            <i class="material-icons">keyboard_arrow_left</i>
        </a>
        <a class="to-right">
            <i class="material-icons">keyboard_arrow_right</i>
        </a>
    </div>

@endsection
