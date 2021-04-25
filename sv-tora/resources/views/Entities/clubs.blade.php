@php

$columns = [
    ["heading" => "Nr.", "sortable" => true],
    ["heading" => "Name", "sortable" => true],
    ["heading" => "Mitglieder", "sortable" => false],
];

$rows = [
    ["1", "SV Tora", "Link"],
    ["2", "Du denkst", "Link"],
    ["6", "Nicht SV Tora", "Link"],
];

@endphp

@extends("layouts.layout", ["title" => "Vereine"])

@section("content")

    <main>

        <x-table class="smartphone-optimized" :columns="$columns" :rows="$rows" actions="true" filter="true" editable="true" deletable="true" selectable="false">
            <x-slot name="heading">Vereine</x-slot>
            <x-slot name="entity">Verein</x-slot>
        </x-table>

    </main>

@endsection
