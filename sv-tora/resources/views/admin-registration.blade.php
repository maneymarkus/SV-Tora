@extends("layouts.base-template", ["title" => "Administrator-Registrierung"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/admin-registration.css") }}" type="text/css" />
@endpush

@push("scripts")
<!-- Specific scripts -->
<script src="{{ asset("js/sites/admin-registration.js") }}" defer></script>
@endpush

@section("body-content")

    <header class="header">
        <div class="logo"></div>
    </header>

    <main class="limited">

        <h1 class="greeting">Herzlich willkommen <span class="invited-mail highlighted-span">neuer.admin@mail.de</span>!</h1>
        <p class="introduction">Du wurdest eingeladen, im SV-Tora Wettkampf Management System als Administrator teilzunehmen. Bitte schließe deine Registrierung hier ab. Danach steht dir direkt das Dashboard zur Verfügung</p>
        <div class="registration-container small">
            <h2>Registrieren</h2>
            <form class="registration clearfix" action="/dashboard" method="get">
                <x-inputs.text-input type="default" name="username" class="required" label="Benutzername">
                    <x-slot name="icon">person</x-slot>
                </x-inputs.text-input>
                <x-inputs.text-input type="password" name="password" class="required repeat-1" label="Passwort"></x-inputs.text-input>
                <x-inputs.text-input type="password" name="password-repeat" class="required repeat-2" label="Passwort wiederholen"></x-inputs.text-input>
                <button type="submit" class="secondary-button disabled register-button">
                    <span class="text">Registrieren</span>
                </button>
            </form>
        </div>

    </main>

@endsection
