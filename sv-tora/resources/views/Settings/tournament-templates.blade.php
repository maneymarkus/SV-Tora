@extends("layouts.layout", ["title" => "Wettkampf-Vorlagen"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/tournament-templates.css") }}" type="text/css" />
@endpush

@push("scripts")
    <!-- Specific scripts -->
    <script src="{{ asset("js/sites/tournament-templates.js") }}" defer></script>
@endpush

@section("content")

    <div class="primary-button-floating-container flip-control">
        <x-primary-button class="flip" text="Karten umdrehen" icon-name="flip_to_back"></x-primary-button>
    </div>
    <div class="primary-button-floating-container add-tournament-control">
        <x-primary-button class="add-tournament" text="Wettkampf hinzufügen" icon-name="add" href="{{ $addTournamentTemplateUrl }}" ></x-primary-button>
    </div>

    <main class="limited clearfix">
        <h1>Verfügbare Wettkampf-Vorlagen</h1>
        <div class="oversize-container">
            <div class="perspective-container">

                @foreach($tournamentTemplates as $tournamentTemplate)

                    @php
                        $editUrl = url("/settings/tournament-templates/" . $tournamentTemplate->id);
                        $deleteUrl = url("/settings/tournament-templates/" . $tournamentTemplate->id);
                    @endphp

                    <div class="tournament-card">
                        <x-card class="front" title="{{ $tournamentTemplate->tournament_name }}" number="{{ $loop->index + 1 }}"></x-card>
                        <div class="back">
                            <h3 data-name="tournament_name" data-key="Wettkampfname">
                                {{ $tournamentTemplate->tournament_name }}
                            </h3>
                            <p data-name="age-range" data-key="Alter">
                                {{ $tournamentTemplate->age_min . " - " . $tournamentTemplate->age_max }}
                            </p>
                            <p data-name="graduations" data-key="Graduierungen">
                                {{ $tournamentTemplate->graduation_min . " - " . $tournamentTemplate->graduation_max }}
                            </p>
                            <p data-name="teams" data-key="Teams">
                                {{ $tournamentTemplate->teams === true ? "Ja" : "Nein" }}
                            </p>
                            <p data-name="kihon" data-key="Kihon">
                                {{ $tournamentTemplate->kihon === true ? "Ja" : "Nein" }}
                            </p>
                            <x-secondary-button class="edit" text="Bearbeiten" href="{{ $editUrl }}"></x-secondary-button>
                            <x-secondary-button class="delete" text="Löschen" href="{{ $deleteUrl }}"></x-secondary-button>
                        </div>
                    </div>

                @endforeach

            </div>

        </div>
    </main>

@endsection
