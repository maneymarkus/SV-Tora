@extends("layouts.layout", ["title" => "Administrator-Registrierung"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/admin-registration.css") }}" type="text/css" />
@endpush

@push("scripts")
<!-- Specific scripts -->
<script src="{{ asset("js/sites/admin-registration.js") }}" defer></script>
@endpush

@section("content")

    <main class="limited">

        <h1 class="greeting">Herzlich willkommen <span class="invited-mail highlighted-span">{{ $email ?? "neuer Admin" }}</span>!</h1>
        <p class="introduction">Du wurdest eingeladen, im SV-Tora Wettkampf Management System als Administrator teilzunehmen. Bitte schließe deine Registrierung hier ab. Danach steht dir direkt das Dashboard zur Verfügung (Deine E-Meil-Adresse musst du nicht noch einmal angeben, da du über diese eingeladen wurdest und die Einladung nur für diese E-Mail-Adresse gültig ist) </p>

        @if ($errors->any())
            <p class="form-error">
                {{ $errors->first() }}
            </p>
        @endif

        <div class="registration-container small">
            <h2>Registrieren</h2>
            <form class="registration clearfix" action="/dashboard" method="get">
                @csrf
                <input name="token" value="{{ $token }}" type="hidden"/>
                <input name="email" value="{{ $email ?? "" }}" type="hidden"/>
                <x-inputs.text-input type="default" name="name" class="required" label="Name">
                    <x-slot name="value">{{ old("name") }}</x-slot>
                </x-inputs.text-input>
                <x-inputs.text-input type="default" name="username" class="required" label="Benutzername">
                    <x-slot name="icon">person</x-slot>
                    <x-slot name="value">{{ old("username") }}</x-slot>
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
