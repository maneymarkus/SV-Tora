@php

$columns = [
    ["heading" => "Nr.", "sortable" => true],
    ["heading" => "Name", "sortable" => true],
    ["heading" => "Vorname", "sortable" => true],
    ["heading" => "Alter", "sortable" => true],
    ["heading" => "Geschlecht", "sortable" => true],
    ["heading" => "Graduierung", "sortable" => true],
    ["heading" => "Verein", "sortable" => true],
];

$rows = [
    ["1", "Popov", "Marcus", "22", "m", "6. Dan.", "SV Tora"],
    ["2", "Städler", "Markus", "22", "m", "7. Dan.", "Du denkst"],
    ["3", "Reichenberg", "Florian", "21", "m", "4. Dan.", "SV Tora"],
    ["4", "Dude", "Some other", "18", "m", "2. Dan.", "SV Tora"],
    ["5", "Schildt", "Veronika", "17", "w", "5. Dan.", "SV Tora"],
    ["6", "Meyer", "Franziska", "21", "w", "6. Dan.", "Nicht SV Tora"],
];

@endphp


@extends("layouts.layout", ["title" => "Entitäten anmelden"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/enroll-entities.css") }}" type="text/css" />
@endpush

@push("scripts")
<!-- Specific scripts -->
<script src="{{ asset("js/sites/enroll-entities.js") }}" defer></script>
@endpush

@section("content")

    <main>

        <x-table class="smartphone-optimized" :columns="$columns" :rows="$rows" actions="true" filter="true" editable="true" deletable="true" selectable="true">
            <x-slot name="heading">Starter zum <span class="tournament-name highlighted-span">Tora-Pokal</span> am <span class="tournament-date highlighted-span">21.04.2021</span> anmelden</x-slot>
            <x-slot name="entity">Kämpfer</x-slot>
        </x-table>

    </main>

    <div class="primary-button-floating-container cancel-control">
        <x-primary-button class="cancel warning" text="Abbrechen" icon-name="close" href="/tournament/dashboard"></x-primary-button>
    </div>

    <div class="primary-button-floating-container enroll-control">
        <x-primary-button class="enroll" text="Ausgewählte anmelden" icon-name="add" href="#{{-- TODO --}}"></x-primary-button>
    </div>

@endsection
