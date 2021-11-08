@extends("layouts.layout", ["title" => $entities . " anmelden"])

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
        <a class="link cancel-configuration" href="{{ url()->previous("/tournament/dashboard") }}">zurück</a>

        <x-table class="smartphone-optimized" :columns="$columns" :rows="$rows" actions="true" filter="true" editable="false" deletable="false" selectable="true">
            <x-slot name="heading">{{ $entities }} zum <span class="tournament-name highlighted-span">{{ $tournament->tournamentTemplate->tournament_name }}</span> am <span class="tournament-date highlighted-span">{{ \Carbon\Carbon::parse($tournament->date)->format("d.m.Y") }}</span> anmelden</x-slot>
            <x-slot name="entity">{{ $entity }}</x-slot>
            <x-slot name="addEntityUrl">{{ $addEntityUrl }}</x-slot>
        </x-table>

    </main>

    <div class="primary-button-floating-container cancel-control">
        @php
            $backUrl = url()->previous("/tournament/dashboard");
        @endphp
        <x-primary-button class="cancel warning" text="Abbrechen" icon-name="close" href="{{ $backUrl }}"></x-primary-button>
    </div>

    <div class="primary-button-floating-container confirm-control">
        <x-primary-button class="confirm" text="Ausgewählte anmelden" icon-name="add" href="{{ $enrollUrl }}"></x-primary-button>
    </div>

@endsection
