@extends("layouts.layout", ["title" => "Wettkampf-Einstellungen"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/tournaments-administration.css") }}" type="text/css" />
@endpush

@push("scripts")
    <!-- Specific scripts -->
    <script src="{{ asset("js/sites/tournaments-administration.js") }}" defer></script>
@endpush

@section("content")

    <div class="primary-button-floating-container flip-control">
        <x-primary-button class="flip" text="Karten umdrehen" icon-name="flip_to_back"></x-primary-button>
    </div>

    <div class="primary-button-floating-container add-tournament-control">
        <x-primary-button class="add-tournament" text="Wettkampf hinzufügen" icon-name="add"></x-primary-button>
    </div>

    <main class="limited clearfix">
        <h1>Wettkämpfe</h1>
        <div class="oversize-container">
            <div class="perspective-container">

                <div class="tournament-card">
                    <x-card class="front" title="Tora-Pokal" number="1"></x-card>
                    <div class="back">
                        <h3 data-name="tournament-name" data-key="Wettkampfname">
                            Tora-Pokal
                        </h3>
                        <p data-name="age-range" data-key="Alter">
                            8-16
                        </p>
                        <p data-name="graduations" data-key="Graduierungen">
                            7. Kyu - 6. Dan
                        </p>
                        <p data-name="teams" data-key="Teams">
                            Ja
                        </p>
                        <p data-name="kihon" data-key="Kihon">
                            Nein
                        </p>
                        <x-secondary-button class="edit" text="Bearbeiten"></x-secondary-button>
                        <x-secondary-button class="delete" text="Löschen"></x-secondary-button>
                    </div>
                </div>

                <div class="tournament-card">
                    <x-card class="front" title="Weihnachts&shy;turnier" number="2"></x-card>
                    <div class="back">
                        <h3 data-name="tournament-name" data-key="Wettkampfname">
                            Weihnachtsturnier
                        </h3>
                        <p data-name="age-range" data-key="Alter">
                            8-16
                        </p>
                        <p data-name="graduations" data-key="Graduierungen">
                            7. Kyu - 6. Dan
                        </p>
                        <p data-name="teams" data-key="Teams">
                            Ja
                        </p>
                        <p data-name="kihon" data-key="Kihon">
                            Nein
                        </p>
                        <x-secondary-button class="edit" text="Bearbeiten"></x-secondary-button>
                        <x-secondary-button class="delete" text="Löschen"></x-secondary-button>
                    </div>
                </div>
                <div class="tournament-card">
                    <x-card class="front" title="Nachwuchs&shy;turnier" number="3"></x-card>
                    <div class="back">
                        <h3 data-name="tournament-name" data-key="Wettkampfname">
                            Nachwuchsturnier
                        </h3>
                        <p data-name="age-range" data-key="Alter">
                            6-12
                        </p>
                        <p data-name="graduations" data-key="Graduierungen">
                            9. Kyu - 8. Kyu
                        </p>
                        <p data-name="teams" data-key="Teams">
                            Nein
                        </p>
                        <p data-name="kihon" data-key="Kihon">
                            Ja
                        </p>
                        <x-secondary-button class="edit" text="Bearbeiten"></x-secondary-button>
                        <x-secondary-button class="delete" text="Löschen"></x-secondary-button>
                    </div>
                </div>

            </div>

        </div>
    </main>

@endsection
