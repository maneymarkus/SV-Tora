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
        <a class="link cancel-configuration" href="{{ url("/tournaments/" . $tournament->id . "/enrolled/fighters") }}">zurück</a>
        <h1>Kämpfer für <span class="highlighted-span">{{ $tournament->tournamentTemplate->name }}</span> konfigurieren</h1>

        <div class="fighter-cards-container">
            @php
              $counter = 1;
            @endphp
            @foreach($fighters as $fighter)
                <div class="fighter-card">
                    <h2 class="fighter-name"><span class="first-name">{{ $fighter->first_name }}</span> <span class="family-name">{{ $fighter->last_name }}</span></h2>

                    @php
                        $properties = $fighter->properties;
                    @endphp
                    <x-property-information :properties="$properties"></x-property-information>

                    @php
                        $enrolledFighter = $fighter["enrolledFighter"];
                    @endphp

                    <div class="configuration">
                        <h3>Optionen</h3>
                        @foreach($fighter->examinationTypes as $examinationType => $options)
                            <div class="exam-type-container">
                                <div class="exam-type">
                                    <h4>{{ $examinationType }}:</h4>
                                </div>
                                <div class="exam-type-configuration {{ strtolower($examinationType) }}">

                                    @if(isset($options["error"]))
                                        <p>{{ $options["error"] }}</p>
                                    @else
                                        @php
                                            $participationRadioOptions = $options["participationRadioOptions"];
                                        @endphp
                                        <x-inputs.radio-buttons class="required" name="{{ $examinationType }}" :options="$participationRadioOptions"></x-inputs.radio-buttons>
                                        @if(isset($options["configurationSelectOptions"]))
                                            @php
                                                $configurationSelectOptions = $options["configurationSelectOptions"];
                                                $name = $examinationType . " Kategorie";
                                                if (isset($options["enabled"])) {
                                                    $disabledClass = null;
                                                } else {
                                                    $disabledClass = "disabled";
                                                }
                                            @endphp
                                            <x-inputs.select-input class="{{ $disabledClass }}" name="{{ $name }}" :options="$configurationSelectOptions">
                                                <x-slot name="placeholder">Kategorie auswählen</x-slot>
                                            </x-inputs.select-input>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        @endforeach
                    </div>

                    @php
                        $unenrollText = "Kämpfer nicht anmelden";
                        $enrollText = "Kämpfer anmelden";
                        $enrollUrl = $fighter["enrollUrl"];
                        $unenrollUrl = "#";
                        if(isset($fighter["unenrollUrl"])) {
                            $unenrollUrl = $fighter["unenrollUrl"];
                            $unenrollText = "Kämpfer abmelden";
                            $enrollText = "Kämpfer ändern";
                        }
                    @endphp
                    <div class="actions">
                        <x-primary-button href="{{ $unenrollUrl }}"  class="unenroll-fighter warning" text="{{ $unenrollText }}" icon-name="close"></x-primary-button>
                        <x-primary-button href="{{ $enrollUrl }}" class="enroll-fighter" text="{{ $enrollText }}" icon-name="add"></x-primary-button>
                    </div>

                    <div class="progress-indicator"><span class="current">{{ $counter++ }}</span> von <span class="total">{{ count($fighters) }}</span></div>
                </div>
            @endforeach
        </div>

    </main>

@endsection
