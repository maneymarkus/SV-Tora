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

@extends("layouts.layout", ["title" => "Kämpfer"])

@section("content")

    <main>

        <x-table class="smartphone-optimized" :columns="$columns" :rows="$rows" actions="true" filter="true" editable="true" deletable="true" selectable="false">
            <x-slot name="heading">Kämpfer</x-slot>
            <x-slot name="entity">Kämpfer</x-slot>
        </x-table>

    </main>

@endsection
