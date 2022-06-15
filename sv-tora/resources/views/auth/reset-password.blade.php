@php

    use App\Helper\GeneralHelper;

    $confirm_id = GeneralHelper::uniqueRandomIdentifier();

@endphp

@extends("layouts.layout", ["title" => "Passwort zurücksetzen"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/registration.css") }}" type="text/css" />
@endpush

@section("content")

    <main class="limited">

        <h1>Passwort zurücksetzen</h1>

        @if ($errors->any())
            <p class="form-error">
                {{ $errors->first() }}
            </p>
        @endif

        <div class="form-container small">
            <h2>Passwort ändern</h2>
            <form class="password-reset clearfix" action="/password/reset" method="post">
                @csrf
                <input name="token" value="{{ $token }}" type="hidden"/>
                <x-inputs.text-input type="default" name="email" class="required" label="E-Mail-Adresse"></x-inputs.text-input>
                <x-inputs.text-input type="password" name="password" class="password-check required {{ $confirm_id }}" label="Neues Passwort"></x-inputs.text-input>
                <x-inputs.text-input type="password" name="password-confirmation" class="required confirm" data-confirm="{{ $confirm_id }}" label="Neues Passwort wiederholen"></x-inputs.text-input>
                <button type="submit" class="secondary-button change-password-button submit-button">
                    <span class="text">Passwort ändern!</span>
                </button>
            </form>
        </div>

    </main>

    <x-footer></x-footer>

@endsection
