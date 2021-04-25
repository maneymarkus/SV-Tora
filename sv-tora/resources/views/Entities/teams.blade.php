@php

$columns = [
    ["heading" => "Nr.", "sortable" => true],
    ["heading" => "Name", "sortable" => true],
    ["heading" => "Verein", "sortable" => true],
    ["heading" => "Mitglieder", "sortable" => false],
];

$rows = [
    ["1", "Die Zerstörer", "SV Tora", "Link"],
    ["2", "Team 1", "Du denkst", "Link"],
    ["3", "Die Letzten", "SV Tora", "Link"],
    ["4", "Team 1 ist doof", "SV Tora", "Link"],
    ["5", "13", "SV Tora", "Link"],
    ["6", "Das Team", "Nicht SV Tora", "Link"],
];

@endphp

@extends("layouts.layout", ["title" => "Teams"])

@section("content")

    <main>

        <x-table class="smartphone-optimized" :columns="$columns" :rows="$rows" actions="true" filter="true" editable="true" deletable="true" selectable="false">
            <x-slot name="heading">Teams</x-slot>
            <x-slot name="entity">Team</x-slot>
        </x-table>

    </main>

@endsection
