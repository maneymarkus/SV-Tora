@extends("layouts.base-template", ["title" => "Registrierung"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/registration.css") }}" type="text/css" />
@endpush

@push("scripts")
<!-- Specific scripts -->
<script src="{{ asset("js/sites/registration.js") }}" defer></script>
@endpush

@section("body-content")

    <header class="header">
        <div class="logo"></div>
    </header>

    <main>

        <h1>Registrierung</h1>

        <p class="info">Sie wurden eingeladen, sich beim SV Tora Berlin e.V. Wettkampf-Management-System zu <span class="highlighted-span">registrieren</span>, um sich zu von SV Tora veranstalteten <span class="highlighted-span">Wettkämpfen</span> selbstständig anzumelden. Bitte beachten Sie, dass jeweils nur <span class="highlighted-span">ein Account</span> für einen Verein vorgesehen ist. Von Ihnen erstellte Personen und Wettkampf&shy;anmeldungen können nur von dem Account verwaltet werden, der diese erstellt hat (Bei weiteren Fragen wenden Sie sich gerne an <span class="highlighted-span">support@existiert.net</span>)</p>

        <div class="registration-container small">
            <h2>Registrieren</h2>
            <form class="registration clearfix" action="/register" method="post">
                @csrf
                <x-inputs.text-input type="default" name="username" class="required" label="Benutzername">
                    <x-slot name="icon">person</x-slot>
                </x-inputs.text-input>
                <x-inputs.text-input type="email" name="mail" class="required" label="E-Mail"></x-inputs.text-input>
                <x-inputs.text-input type="password" name="password" class="password-register required repeat-1" label="Passwort"></x-inputs.text-input>
                <x-inputs.text-input type="password" name="password-repeat" class="required repeat-2" label="Passwort wiederholen"></x-inputs.text-input>
                <button type="submit" class="secondary-button disabled register-button">
                    <span class="text">Registrieren</span>
                </button>
            </form>
        </div>

    </main>

    <x-footer></x-footer>

@endsection
