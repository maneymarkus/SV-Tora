@extends("layouts.layout", ["title" => "Konfiguration der anzumeldenden Kämpfer"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/fighter-tournament-configuration.css") }}" type="text/css" />
@endpush

@push("scripts")
<!-- Specific scripts -->
<script src="{{ asset("js/sites/fighter-tournament-configuration.js") }}" defer></script>
@endpush

@section("content")

    <main class="limited">
        <a class="link cancel-configuration" href="{{ url()->previous("/tournament/dashboard") }}">zurück</a>
        <h1>Kämpfer für <span class="highlighted-span">{{ $tournament->tournamentTemplate->name }}</span> konfigurieren</h1>

        <div class="fighter-cards-container">
            @php
              $counter = 1;
            @endphp
            @foreach($fighters as $fighter)
                <div class="fighter-card">
                    <h2 class="fighter-name"><span class="first-name">{{ $fighter->first_name }}</span> <span class="family-name">{{ $fighter->last_name }}</span></h2>

                    @php
                        $properties = [
                            "Alter" => $fighter->age(),
                            "Geschlecht" => $fighter->sex,
                            "Graduierung" => $fighter->graduation,
                            "Verein" => $fighter->person->club->name,
                        ];
                    @endphp

                    <x-property-information :properties="$properties"></x-property-information>

                    @php
                        $enrolledFighter = $fighter->enrolledConfigurations()->where("tournament_id", "=", $tournament->id)->first();
                    @endphp

                    <div class="configuration">
                        <h3>Optionen</h3>
                        @foreach(explode(";", $tournament->tournamentTemplate->examination_types) as $examinationType)
                            @if($examinationType === "Team")
                                @continue
                            @endif
                            @php
                                $participationRadioOptions = [
                                    ["text" => "Teilnehmen", "value" => "1", "checked" => false, "disabled" => false],
                                    ["text" => "Nicht Teilnehmen", "value" => "0", "checked" => false, "disabled" => false],
                                ];
                                $examinationTypeLowerCase = strtolower($examinationType);
                            @endphp
                            <div class="exam-type-container">
                                <div class="exam-type">
                                    <h4>{{ $examinationType }}:</h4>
                                </div>
                                <div class="exam-type-configuration {{ $examinationTypeLowerCase }}">
                                    <x-inputs.radio-buttons class="required" name="{{ $examinationType }}" :options="$participationRadioOptions"></x-inputs.radio-buttons>
                                    @php
                                    try {
                                        $categories = \App\Helper\GeneralHelper::determineCategoryOfFighter($fighter, $examinationType);
                                    } catch (Exception $e) {
                                        $error = $e->getMessage();
                                    }
                                    if (is_array($categories)) {
                                        $configurationSelectOptions = array_keys(\App\Helper\GeneralHelper::determineCategoryOfFighter($fighter, $examinationType));
                                        $name = $examinationType . " Kategorie";
                                    }
                                    @endphp

                                    @if(isset($error))
                                        <p>{{ $error }}</p>
                                    @elseif(is_array($categories))
                                        <x-inputs.select-input class="disabled" name="{{ $name }}" :options="$configurationSelectOptions" placeholder="Kategorie auswählen"></x-inputs.select-input>
                                    @endif
                                </div>
                            </div>
                        @endforeach
                    </div>

                    @php
                        $enrollUrl = url("/tournaments/" . $tournament->id . "/enrolled/fighters/" . $fighter->id . "/enroll");
                    @endphp
                    <div class="actions">
                        <x-primary-button class="unenroll-fighter warning" text="Kämpfer nicht hinzufügen" icon-name="close"></x-primary-button>
                        <x-primary-button href="{{ $enrollUrl }}" class="enroll-fighter" text="Kämpfer anmelden" icon-name="add"></x-primary-button>
                    </div>

                    <div class="progress-indicator"><span class="current">{{ $counter++ }}</span> von <span class="total">{{ count($fighters) }}</span></div>
                </div>
            @endforeach
        </div>

    </main>

@endsection
