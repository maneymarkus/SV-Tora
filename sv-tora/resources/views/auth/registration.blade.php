@php

    use App\Helper\GeneralHelper;

    $confirm_id = GeneralHelper::uniqueRandomIdentifier();

@endphp

@extends("layouts.layout", ["title" => "Registrierung"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/registration.css") }}" type="text/css" />
@endpush

@push("scripts")
<!-- Specific scripts -->
<script src="{{ asset("js/sites/registration.js") }}" defer></script>
@endpush

@section("content")

    <main>

        <h1>Registrierung</h1>

        <p class="info">Sie wurden eingeladen, sich beim SV Tora Berlin e.V. Wettkampf-Management-System zu <span class="highlighted-span">registrieren</span>, um sich zu von SV Tora veranstalteten <span class="highlighted-span">Wettkämpfen</span> selbstständig anzumelden (Bei weiteren Fragen wenden Sie sich gerne an <span class="highlighted-span">{{ config("contact.email") }}</span>).</p>

        @if ($errors->any())
            <p class="form-error">
                {{ $errors->first() }}
            </p>
        @endif

        <div class="registration-container small form-container">
            <h2>Registrieren</h2>
            <form class="registration clearfix" action="{{ url("/registration") }}" method="POST">
                @csrf
                <input name="token" value="{{ $token }}" type="hidden"/>
                <x-inputs.text-input type="default" name="name" class="required" label="Name">
                    <x-slot name="value">{{ old("name") }}</x-slot>
                </x-inputs.text-input>
                <x-inputs.text-input type="default" name="username" class="required" label="Benutzername">
                    <x-slot name="icon">person</x-slot>
                    <x-slot name="value">{{ old("username") }}</x-slot>
                </x-inputs.text-input>
                <x-inputs.text-input type="email" name="email" class="required" label="E-Mail">
                    <x-slot name="value">{{ old("email") ?? $email ?? "" }}</x-slot>
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

    <x-footer></x-footer>

@endsection
