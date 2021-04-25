@extends("layouts.layout", ["title" => "Pools des aktuellen Wettkampfes"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/fight-place-administration.css") }}" type="text/css" />
@endpush

@push("scripts")
<!-- Specific scripts -->
<script src="{{ asset("js/sites/fight-place-administration.js") }}" defer></script>
@endpush

@section("content")

    <main class="limited">
        <h1>Pools</h1>

        <div class="fight-places-container">

            <div class="fight-place">
                <h2 class="fight-place-name">Pool 1</h2>
                <x-primary-button class="rename" text="Namen ändern" icon-name="edit"></x-primary-button>
                <x-primary-button class="delete warning" text="Pool löschen" icon-name="delete"></x-primary-button>
                <p class="fights"><span class="count-fights">4</span> Kämpfe</p>
            </div>

            <div class="fight-place">
                <h2 class="fight-place-name">Pool 2</h2>
                <x-primary-button class="rename" text="Namen ändern" icon-name="edit"></x-primary-button>
                <x-primary-button class="delete warning" text="Pool löschen" icon-name="delete"></x-primary-button>
                <p class="fights"><span class="count-fights">0</span> Kämpfe</p>
            </div>

            <div class="fight-place">
                <h2 class="fight-place-name">Pool 3</h2>
                <x-primary-button class="rename" text="Namen ändern" icon-name="edit"></x-primary-button>
                <x-primary-button class="delete warning" text="Pool löschen" icon-name="delete"></x-primary-button>
                <p class="fights"><span class="count-fights">0</span> Kämpfe</p>
            </div>

        </div>

        <div class="primary-button-floating-container add-container">
            <x-primary-button class="add" text="Pool hinzufügen" icon-name="add"></x-primary-button>
        </div>

    </main>


@endsection
