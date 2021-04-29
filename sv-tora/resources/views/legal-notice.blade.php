@extends("layouts.base-template", ["title" => "Impressum"])

@section("body-content")

    <header class="header">
        <div class="logo"></div>
    </header>

    {{-- TODO: Link back to site previously visited --}}
    <a class="go-back" href="/dashboard">
        <i class="material-icons">arrow_back</i>
    </a>

    <main class="limited legal">

        <h1>Impressum</h1>

        {{-- TODO: Check if correct --}}

        <h2>SV Tora Berlin e.V.</h2>

        <h3>Vereinsnummer</h3>
        <p>Amtsgericht Berlin-Charlottenburg: 95 AR 2072/94</p>

        <h3>Vereinsvorstand</h3>
        <p>Jörg Kohl, Gyula Büki, Joachim Papenfuß</p>

        <h3>Geschäftsstelle</h3>
        <p>
            SV Tora Berlin e.V.<br/>
            Wotanstr. 14<br/>
            10365 Berlin<br/>
        </p>

        <h3>Kontakt</h3>
        <p>
            Telefon: (030) 75 52 01 10<br/>
            Fax: (030) 75 52 01 12<br/>
            E-Mail: <a class="link" href="mailto:kontakt@sv-tora.de">kontakt@sv-tora.de</a>
        </p>

        <img class="main-logo" src="{{ asset("images/SVToraLogo.png") }}" alt="Logo des SV Tora Berlin e.V." />

    </main>

    <x-footer></x-footer>

@endsection
