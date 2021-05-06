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

        <h1 class="intro"><span class="highlighted-span">SV Tora Berlin e.V.</span> Wettkampf-Management-System</h1>

        <div class="login-container">
            <h2>Login</h2>
            <form class="login clearfix" action="/login" method="post">
                @csrf
                <x-inputs.text-input type="default" name="username" class="required" label="Benutzername/E-Mail">
                    <x-slot name="icon">person</x-slot>
                </x-inputs.text-input>
                <x-inputs.text-input type="password" name="password" class="required" label="Passwort"></x-inputs.text-input>
                <x-inputs.check-boxes name="remember" :options="$checkboxOptions"></x-inputs.check-boxes>
                <a class="link password-forgotten">Passwort vergessen</a>
                <button type="submit" class="secondary-button disabled login-button" >
                    <span class="text">Login</span>
                </button>
            </form>
        </div>

        <p class="made-with">Made with <i class="material-icons love">favorite</i> and <i class="material-icons education">school</i> in Berlin</p>

    </main>

    <x-footer></x-footer>

@endsection
