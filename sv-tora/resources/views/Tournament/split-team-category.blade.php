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
        <h1>Kategorie <span class="old-category-name">{{ $category->name }}</span> Teilen</h1>

        <div class="left-category category-container">
            <span class="left-category-name category-name">{{ $category->name . "a" }}</span>
        </div>

        <div class="right-category category-container">
            <span class="right-category-name category-name">{{ $category->name . "b" }}</span>
        </div>

        <div class="commands clearfix">

            @php
                $splitUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/split");
                $cancelUrl = url("/tournaments/" . $tournament->id . "/categories");
            @endphp

            <x-primary-button href="{{ $splitUrl }}" class="split" text="Kategorie teilen!" icon-name="done"></x-primary-button>

            <x-primary-button href="{{ $cancelUrl }}" class="cancel warning" text="Abbrechen" icon-name="close"></x-primary-button>

        </div>

    </main>

    @if($category->teams !== null && $category->teams->count() > 0)
        @foreach($category->teams as $enrolledTeam)
            <div class="fighter-card">
                <h2 class="fighter-name">{{ $enrolledTeam->team->name }}</h2>
                <p class="clearfix">Maximales Alter: <span class="age">{{ $enrolledTeam->team->getHighestAge() }}</span></p>
                <p class="clearfix">Verein: <span class="club">{{ $enrolledTeam->team->club->name }}</span></p>
                <p class="no-display member_id">{{ $enrolledTeam->team->id }}</p>
            </div>
        @endforeach
    @endif

    <div class="assigning-commands active">
        <a class="to-left">
            <i class="material-icons">keyboard_arrow_left</i>
        </a>
        <a class="to-right">
            <i class="material-icons">keyboard_arrow_right</i>
        </a>
    </div>

@endsection
