@extends("layouts.base-template", ["title" => "Login"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/login.css") }}" type="text/css" />
@endpush

@push("scripts")
<!-- Specific scripts -->
<script src="{{ asset("js/sites/login.js") }}" defer></script>
@endpush

@section("body-content")

    <header class="header">
        <div class="logo"></div>
    </header>

    <img class="light-fighter" src="{{ asset("images/fighter-symbol-white.png") }}" alt="fighter image"/>
    <span class="shadow"></span>

    <main>

        <p class="info">Noch nicht <span>registriert</span>? Klicken Sie hier und <span>registrieren</span> Sie sich erst.</p>
        <img class="arrow" alt="arrow pointing to registration form" src="{{ asset("images/arrow.png") }}" />


        <div class="login-change-container">

            <div class="login-container ">
                <h2>Login</h2>
                <form class="login clearfix" action="/dashboard" method="get">
                    <x-inputs.text-input type="email" name="user" class="required" label="Benutzername/E-Mail"></x-inputs.text-input>
                    <x-inputs.text-input type="password" name="password" class="required" label="Passwort"></x-inputs.text-input>
                    <a class="link password-forgotten">Passwort vergessen</a>
                    <button type="submit" class="secondary-button disabled login-button" >
                        <span class="text">Login</span>
                    </button>
                </form>
            </div>

            <div class="registration-container small">
                <h2>Registrieren</h2>
                <form class="registration clearfix" action="/dashboard" method="get">
                    <x-inputs.text-input type="default" name="username" class="required" label="Benutzername">
                        <x-slot name="icon">person</x-slot>
                    </x-inputs.text-input>
                    <x-inputs.text-input type="email" name="mail" class="required" label="E-Mail"></x-inputs.text-input>
                    <x-inputs.text-input type="password" name="password" class="required repeat-1" label="Passwort"></x-inputs.text-input>
                    <x-inputs.text-input type="password" name="password-repeat" class="required repeat-2" label="Passwort wiederholen"></x-inputs.text-input>
                    <button type="submit" class="secondary-button disabled register-button">
                        <span class="text">Registrieren</span>
                    </button>
                </form>
            </div>

        </div>

    </main>

@endsection
