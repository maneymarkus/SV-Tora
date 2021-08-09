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

        <div class="setting">
            <h3>Name</h3>
            <p class="current-name">{{ \Illuminate\Support\Facades\Auth::user()->name }}</p>
            <a class="link change-name" href="{{ url("/entities/users/" . \Illuminate\Support\Facades\Auth::user()->id) }}">Ändern</a>
        </div>
        <div class="setting">
            <h3>Passwort</h3>
            <a class="link change-password">Ändern</a>
        </div>
        <div class="setting">
            <label for="darkmode" class="switch-container input-container darkmode-switch">
                <span class="text">Dunkler Modus</span>
                <span class="tt-trigger darkmode"><i class="material-icons">help_outline</i></span>
                @if(\Illuminate\Support\Facades\Auth::user()->dark_mode)
                    <input type="checkbox" id="darkmode" name="dark_mode" checked="">
                @else
                    <input type="checkbox" id="darkmode" name="dark_mode">
                @endif
                <span class="switch"></span>
            </label>
        </div>
        <div class="setting">
            <label for="table-optimization" class="switch-container input-container table-optimization-switch">
                <span class="text">Smartphone-optimierte Tabellen Darstellung</span>
                <span class="tt-trigger table-optimization"><i class="material-icons">help_outline</i></span>
                @if(\Illuminate\Support\Facades\Auth::user()->smartphone_optimized_tables)
                    <input type="checkbox" id="table-optimization" name="smartphone_optimized_tables" checked="">
                @else
                    <input type="checkbox" id="table-optimization" name="smartphone_optimized_tables">
                @endif
                <span class="switch"></span>
            </label>
        </div>
    </main>

@endsection
