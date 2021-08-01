@extends("layouts.layout", ["title" => $entities . " auswählen"])

@push("styles")
    <!-- Specific style -->
    <link rel="stylesheet" href="{{ asset("css/sites/select-entities.css") }}" type="text/css" />
@endpush

@push("scripts")
    <!-- Specific scripts -->
    <script src="{{ asset("js/sites/select-entities.js") }}" defer></script>
@endpush

@section("content")

    <main>

        <x-table class="smartphone-optimized" :columns="$columns" :rows="$rows" actions="false" filter="true" editable="false" deletable="false" selectable="true">
            <x-slot name="heading">{{ $entities }} auswählen und <span class="highlighted-span">{{ $addTo }}</span> hinzufügen</x-slot>
            <x-slot name="selectLimit">{{ $selectLimit }}</x-slot>
        </x-table>

        <div class="primary-button-floating-container cancel-control">
           <x-primary-button class="cancel warning" href="{{ $backUrl }}" text="Abbrechen" icon-name="close"></x-primary-button>
        </div>

        <div class="primary-button-floating-container confirm-control">
            <x-primary-button class="confirm" href="{{ $addUrl }}" text="Ausgewählte hinzufügen" icon-name="add"></x-primary-button>
        </div>

    </main>

@endsection
