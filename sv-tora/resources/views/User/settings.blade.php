@extends("layouts.layout", ["title" => "Profil-Einstellungen"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/profile-settings.css") }}" type="text/css" />
@endpush

@push("scripts")
    <!-- Specific scripts -->
    <script src="{{ asset("js/sites/profile-settings.js") }}" defer></script>
@endpush

@section("content")

    <main class="limited clearfix">

        <h1>Profil</h1>

        <div class="col">
            <label for="darkmode" class="switch-container">
                <input type="checkbox" id="darkmode" name="darkmode" checked="">
                <span class="switch"></span>
                <span class="text">Dunkler Modus</span>
            </label>
            <label for="table-optimization" class="switch-container">
                <input type="checkbox" id="table-optimization" name="table-optimization" checked="">
                <span class="switch"></span>
                <span class="text">Smartphone-optimierte Tabellen Darstellung</span>
            </label>

        </div>
        <div class="col">
            <h3>Profilbild</h3>
            <a class="pic-container" href="#"><img src="{{ asset("/images/Karate_Trainer_Markus_Popov.jpg") }}" alt="Profilbild" /></a>
        </div>
    </main>

@endsection
