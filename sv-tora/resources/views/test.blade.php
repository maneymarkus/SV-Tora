@extends("layouts.layout", ["title" => "Test"])

@push("styles")
    <!-- Specific style -->
@endpush

@push("scripts")
    <!-- Specific scripts -->
@endpush

@php

$slides = [];
array_push($slides, "Tafelsystem");

$imagePath = asset("something_else.jpg");

$properties = ["key" => "value"];

$selectoptions = ["Option 1", "Option 2", "Option 3"];

$radiooptions = [
    ["text" => "Text 1", "value" => "Value 1", "checked" => false, "disabled" => true],
    ["text" => "Text 2", "value" => "Value 2", "checked" => false, "disabled" => false],
    ["text" => "Text 3", "value" => "Value 3", "checked" => true, "disabled" => false]
];

$checkboxoptions = [
    ["text" => "Text 1", "value" => "Value 1", "checked" => true, "disabled" => true],
    ["text" => "Text 2", "value" => "Value 2", "checked" => false, "disabled" => false],
    ["text" => "Text 3", "value" => "Value 3", "checked" => true, "disabled" => false]
];

$columns = [
    ["heading" => "Überschrift 1", "sortable" => true],
    ["heading" => "Überschrift 2", "sortable" => false]
];

$rows = [
    [
        "Wert 1",
        "Wert 2"
    ],
    [
        "Wert 3",
        "Wert 4"
    ],
    [
        "Wert 5",
        "Wert 6"
    ],
];


@endphp

@section("content")

    <x-card class="some-card" title="Karte" number="1" href="#"></x-card>

    <x-carousel :slides="$slides"></x-carousel>

    <x-horizontal-card title="Horizontale Karte" number="213"></x-horizontal-card>

    <x-info-card name="Huren & Söhne" mail="some@address.com">
        <x-slot name="imagePath">{{ $imagePath }}</x-slot>
    </x-info-card>

    <x-property-information :properties="$properties"></x-property-information>

    <x-primary-button text="Button" icon-name="mail"></x-primary-button>

    <x-secondary-button text="Sekundär Button" href="#"></x-secondary-button>

    <x-tag value="Wert">
        <x-slot name="key">Schlüssel</x-slot>
    </x-tag>

    <x-message type="info" message="Nachricht" timestamp="15.04.2021 14:04" sender="System"></x-message>

    <x-inputs.text-input type="email" name="text_input" label="Just some input">
        <x-slot name="value">Some other value</x-slot>
    </x-inputs.text-input>

    <x-inputs.switch-input name="switch" text="Some accompanying text">
        <x-slot name="checked">checked</x-slot>
    </x-inputs.switch-input>

    <x-inputs.file-input name="file"></x-inputs.file-input>

    <x-inputs.text-area name="text-arena">
        <x-slot name="value">Value</x-slot>
    </x-inputs.text-area>

    <x-inputs.range-input name="Range" min="0" max="100">
        <x-slot name="step">5</x-slot>
        <x-slot name="value">105</x-slot>
    </x-inputs.range-input>

    <x-inputs.select-input name="Selektieren" :options="$selectoptions">
        <x-slot name="placeholder">Hier auswählen...</x-slot>
    </x-inputs.select-input>

    <x-inputs.radio-buttons name="Radio Knöpfe" :options="$radiooptions"></x-inputs.radio-buttons>

    <x-inputs.check-boxes name="Check Boxen" :options="$checkboxoptions"></x-inputs.check-boxes>

    <x-inputs.date-input name="Datum"></x-inputs.date-input>

    <x-inputs.time-input name="Zeit"></x-inputs.time-input>

    <x-table class="smartphone-optimized" :columns="$columns" :rows="$rows" actions="true" filter="true" editable="false" deletable="true" selectable="false">
    </x-table>

@endsection
