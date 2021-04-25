@php

$columns = [
    ["heading" => "Nr.", "sortable" => true],
    ["heading" => "Name", "sortable" => true],
    ["heading" => "Vorname", "sortable" => true],
    ["heading" => "Verein", "sortable" => true],
];

$rows = [
    ["1", "Popov", "Marcus", "SV Tora"],
    ["2", "Städler", "Markus", "Du denkst"],
    ["3", "Reichenberg", "Florian", "SV Tora"],
    ["4", "Dude", "Some other", "SV Tora"],
    ["5", "Schildt", "Veronika", "SV Tora"],
    ["6", "Meyer", "Franziska", "Nicht SV Tora"],
];

@endphp

@extends("layouts.layout", ["title" => "Kampfrichter"])

@section("content")

    <main>

        <x-table class="smartphone-optimized" :columns="$columns" :rows="$rows" actions="true" filter="true" editable="true" deletable="true" selectable="false">
            <x-slot name="heading">Kampfrichter</x-slot>
            <x-slot name="entity">Kampfrichter</x-slot>
        </x-table>

    </main>

@endsection
