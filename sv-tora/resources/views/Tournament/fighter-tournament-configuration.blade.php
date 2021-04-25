@php

$properties = [
    "Alter" => "21 Jahre",
    "Geschlecht" => "Männlich",
    "Graduierung" => "6. Dan",
    "Verein" => "SV Tora",
];

$participation_radio_options = [
    ["text" => "Teilnehmen", "value" => "1", "checked" => false, "disabled" => false],
    ["text" => "Nicht Teilnehmen", "value" => "0", "checked" => false, "disabled" => false],
];

@endphp


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
        <h1>Kämpfer hinzufügen</h1>

        {{--
        @foreach($fighters as $fighter)
            TODO
        @endforeach
        --}}

        <div class="fighter-cards-container">
            <div class="fighter-card">
                <h2 class="fighter-name"><span class="first-name">Marcus</span> <span class="family-name">Popopov</span></h2>

                <x-property-information :properties="$properties"></x-property-information>

                <div class="configuration">
                    <h3>Optionen</h3>
                    <div class="exam-type-container">
                        <div class="exam-type">
                            <h4>Kata:</h4>
                        </div>
                        <div class="exam-type-configuration kata">
                            <x-inputs.radio-buttons class="required" name="kata" :options="$participation_radio_options"></x-inputs.radio-buttons>
                        </div>
                    </div>
                    <div class="exam-type-container kumite">
                        <div class="exam-type">
                            <h4>Kumite:</h4>
                        </div>
                        <div class="exam-type-configuration kumite">
                            <x-inputs.radio-buttons class="required" name="kumite" :options="$participation_radio_options"></x-inputs.radio-buttons>
                        </div>
                    </div>
                </div>

                <div class="actions">
                    <x-primary-button class="unenroll-fighter warning" text="Kämpfer nicht hinzufügen" icon-name="close"></x-primary-button>
                    <x-primary-button class="enroll-fighter" text="Kämpfer anmelden" icon-name="add"></x-primary-button>
                </div>

                <div class="progress-indicator"><span class="current">1</span> von <span class="total">4</span></div>
            </div>

            <div class="fighter-card">
                <h2 class="fighter-name"><span class="first-name">Jemandine</span> <span class="family-name">Anderes</span></h2>

                <div class="info">
                    <p data-property="Alter">12 Jahre</p>
                    <p data-property="Geschlecht">Weiblich</p>
                    <p data-property="Graduierung">6. Kyu</p>
                    <p data-property="Verein">SV Tora</p>
                </div>

                <div class="configuration">
                    <h3>Optionen</h3>
                    <div class="exam-type-container kata">
                        <div class="exam-type">
                            <h4>Kata:</h4>
                        </div>
                        <div class="exam-type-configuration">
                            <div class="radio-group input-container required">
                                <label class="radio-input-container">
                                    Teilnehmen
                                    <input type="radio" name="kata" value="yes" />
                                    <span class="checkmark"></span>
                                </label>
                                <label class="radio-input-container">
                                    Nicht Teilnehmen
                                    <input type="radio" name="kata" value="no" />
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="exam-type-container kumite">
                        <div class="exam-type">
                            <h4>Kumite:</h4>
                        </div>
                        <div class="exam-type-configuration">
                            <div class="radio-group input-container required">
                                <label class="radio-input-container">
                                    Teilnehmen
                                    <input type="radio" name="kumite" value="yes" />
                                    <span class="checkmark"></span>
                                </label>
                                <label class="radio-input-container">
                                    Nicht Teilnehmen
                                    <input type="radio" name="kumite" value="no" />
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                        </div>
                        <div class="category">
                            <p>Kategorie:</p>
                        </div>
                        <div class="category-configuration">
                            <div class="select-input-container input-container disabled">
                                <label class="icon"><i class="material-icons">list</i></label>
                                <span data-name="topic" class="select-input chosen placeholder">Auswählen</span>
                                <i class="material-icons">expand_more</i>
                                <div class="options">
                                    <div class="option">Kihon Ippon Kumite</div>
                                    <div class="option">Jiyu Ippon Kumite</div>
                                    <div class="option">Shobu Ippon Kumite</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="actions">
                    <a class="primary-button unenroll-fighter warning">
                        <i class="material-icons">close</i>
                        <p>Kämpfer nicht hinzufügen</p>
                    </a>
                    <a class="primary-button enroll-fighter">
                        <i class="material-icons">add</i>
                        <p>Kämpfer anmelden</p>
                    </a>
                </div>

                <div class="progress-indicator"><span class="current">2</span> von <span class="total">4</span></div>
            </div>

            <div class="fighter-card">
                <h2 class="fighter-name"><span class="first-name">Jemand</span> <span class="family-name">Anderes</span></h2>

                <div class="info">
                    <p data-property="Alter">13 Jahre</p>
                    <p data-property="Geschlecht">Männlich</p>
                    <p data-property="Graduierung">6. Kyu</p>
                    <p data-property="Verein">SV Tora</p>
                </div>

                <div class="configuration">
                    <h3>Optionen</h3>
                    <div class="exam-type-container kata">
                        <div class="exam-type">
                            <h4>Kata:</h4>
                        </div>
                        <div class="exam-type-configuration">
                            <div class="radio-group input-container required">
                                <label class="radio-input-container">
                                    Teilnehmen
                                    <input type="radio" name="kata" value="yes" />
                                    <span class="checkmark"></span>
                                </label>
                                <label class="radio-input-container">
                                    Nicht Teilnehmen
                                    <input type="radio" name="kata" value="no" />
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="exam-type-container kumite">
                        <div class="exam-type">
                            <h4>Kumite:</h4>
                        </div>
                        <div class="exam-type-configuration">
                            <div class="radio-group input-container required">
                                <label class="radio-input-container">
                                    Teilnehmen
                                    <input type="radio" name="kumite" value="yes" />
                                    <span class="checkmark"></span>
                                </label>
                                <label class="radio-input-container">
                                    Nicht Teilnehmen
                                    <input type="radio" name="kumite" value="no" />
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                        </div>
                        <div class="category">
                            <p>Kategorie:</p>
                        </div>
                        <div class="category-configuration">
                            <div class="select-input-container input-container disabled">
                                <label class="icon"><i class="material-icons">list</i></label>
                                <span data-name="topic" class="select-input chosen placeholder">Auswählen</span>
                                <i class="material-icons">expand_more</i>
                                <div class="options">
                                    <div class="option">Jiyu Ippon Kumite</div>
                                    <div class="option">Shobu Ippon Kumite</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="actions">
                    <a class="primary-button unenroll-fighter warning">
                        <i class="material-icons">close</i>
                        <p>Kämpfer nicht hinzufügen</p>
                    </a>
                    <a class="primary-button enroll-fighter">
                        <i class="material-icons">add</i>
                        <p>Kämpfer anmelden</p>
                    </a>
                </div>

                <div class="progress-indicator"><span class="current">3</span> von <span class="total">4</span></div>
            </div>

            <div class="fighter-card">
                <h2 class="fighter-name"><span class="first-name">Jemand</span> <span class="family-name">Ganz Anderes</span></h2>

                <div class="info">
                    <p data-property="Alter">11 Jahre</p>
                    <p data-property="Geschlecht">Männlich</p>
                    <p data-property="Graduierung">5. Kyu</p>
                    <p data-property="Verein">SV Tora</p>
                </div>

                <div class="configuration">
                    <h3>Optionen</h3>
                    <div class="exam-type-container kata">
                        <div class="exam-type">
                            <h4>Kata:</h4>
                        </div>
                        <div class="exam-type-configuration">
                            <div class="radio-group input-container required">
                                <label class="radio-input-container">
                                    Teilnehmen
                                    <input type="radio" name="kata" value="yes" />
                                    <span class="checkmark"></span>
                                </label>
                                <label class="radio-input-container">
                                    Nicht Teilnehmen
                                    <input type="radio" name="kata" value="no" />
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="exam-type-container kumite">
                        <div class="exam-type">
                            <h4>Kumite:</h4>
                        </div>
                        <div class="exam-type-configuration">
                            <div class="radio-group input-container required">
                                <label class="radio-input-container">
                                    Teilnehmen
                                    <input type="radio" name="kumite" value="yes" />
                                    <span class="checkmark"></span>
                                </label>
                                <label class="radio-input-container">
                                    Nicht Teilnehmen
                                    <input type="radio" name="kumite" value="no" />
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                        </div>
                        <div class="category">
                            <p>Kategorie:</p>
                        </div>
                        <div class="category-configuration">
                            <div class="select-input-container input-container disabled">
                                <label class="icon"><i class="material-icons">list</i></label>
                                <span data-name="topic" class="select-input chosen placeholder">Auswählen</span>
                                <i class="material-icons">expand_more</i>
                                <div class="options">
                                    <div class="option">Jiyu Ippon Kumite</div>
                                    <div class="option">Shobu Ippon Kumite</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="actions">
                    <a class="primary-button unenroll-fighter warning">
                        <i class="material-icons">close</i>
                        <p>Kämpfer nicht hinzufügen</p>
                    </a>
                    <a class="primary-button enroll-fighter">
                        <i class="material-icons">add</i>
                        <p>Kämpfer anmelden</p>
                    </a>
                </div>

                <div class="progress-indicator"><span class="current">4</span> von <span class="total">4</span></div>
            </div>

        </div>

    </main>

@endsection
