@extends("layouts.layout", ["title" => "Pools des aktuellen Wettkampfes"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/fight-places.css") }}" type="text/css" />
@endpush

@push("scripts")
<!-- Specific scripts -->
<script src="{{ asset("js/sites/fight-places.js") }}" defer></script>
@endpush

@section("content")

    <main class="limited">
        <a class="link" href="{{ url()->previous("/tournament/dashboard") }}">zurück</a>
        <h1>Pools</h1>

        <div class="fight-places-container">

            @foreach($fightPlaces as $fightPlace)
                @php
                    $editUrl = url("/tournaments/" . $tournament->id . "/fight-places/" . $fightPlace->id . "/");
                    $deleteUrl = url("/tournaments/" . $tournament->id . "/fight-places/" . $fightPlace->id);
                @endphp
                <div class="fight-place">
                    <h2 class="fight-place-name">{{ $fightPlace->name }}</h2>
                    <x-primary-button class="rename" href="{{ $editUrl }}" text="Namen ändern" icon-name="edit"></x-primary-button>
                    <x-primary-button class="delete warning" href="{{ $deleteUrl }}" text="Pool löschen" icon-name="delete"></x-primary-button>
                    <p class="fights"><span class="count-fights">0</span> Kämpfe</p>
                </div>
            @endforeach

        </div>

        <div class="primary-button-floating-container add-container">
            <x-primary-button href="{{ $addPoolUrl }}" class="add" text="Pool hinzufügen" icon-name="add"></x-primary-button>
        </div>

    </main>


@endsection
