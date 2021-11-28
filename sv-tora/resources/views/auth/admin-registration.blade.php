@php

    use App\Helper\GeneralHelper;

    $confirm_id = GeneralHelper::uniqueRandomIdentifier();

@endphp

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
        <p class="introduction">Du wurdest eingeladen, im SV-Tora Wettkampf Management System als Administrator teilzunehmen. Bitte schließe deine Registrierung hier ab. Danach steht dir direkt das Dashboard zur Verfügung (Deine E-Meil-Adresse musst du nicht noch einmal angeben, da du über diese eingeladen wurdest und die Einladung nur für diese E-Mail-Adresse gültig ist)</p>

        @if ($errors->any())
            <p class="form-error">
                {{ $errors->first() }}
            </p>
        @endif

        <div class="registration-container form-container small">
            <h2>Registrieren</h2>
            <form class="registration clearfix" action="{{ url("/admin/registration") }}" method="POST">
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
                <x-inputs.text-input type="password" name="password" class="password-check required {{ $confirm_id }}" label="Passwort"></x-inputs.text-input>
                <x-inputs.text-input type="password" name="password-confirmation" class="required confirm" data-confirm="{{ $confirm_id }}" label="Passwort wiederholen"></x-inputs.text-input>
                <p>
                    Hinweis: Das Passwort muss mindestens 8 Zeichen lang sein, Groß- und Kleinbuchstaben, mindestens eine Zahl und mindestens ein Symbol (Sonderzeichen) enthalten.
                </p>
                <button type="submit" class="secondary-button register-button submit-button">
                    <span class="text">Registrieren</span>
                </button>
            </form>
        </div>

    </main>

@endsection
