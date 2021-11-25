@extends("layouts.base-template", ["title" => "Impressum"])

@section("body-content")

    <a class="go-back" href="{{ url("/dashboard") }}">
        <i class="material-icons">arrow_back</i>
    </a>

    <main class="limited legal">

        <h1>Impressum</h1>

        <h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
        <p>
            SV Tora Berlin e.V.<br />
            Wotanstra&szlig;e 14<br />
            10365 Berlin
        </p>

        <p>Vereinsregister: 95 AR 2072/94<br />
            Registergericht: Amtsgericht Berlin-Charlottenburg</p>

        <p>
            <strong>Vertreten durch:</strong><br />
            J&ouml;rg Kohl, Gyula B&uuml;ki
        </p>

        <h2>Kontakt</h2>
        <p>
            Telefon: 030 75 52 01 10<br />
            Telefax: 030 75 52 01 12<br />
            E-Mail: kontakt@sv-tora.de
        </p>

        <h2>Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle</h2>
        <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <p>Quelle: <a class="link" href="https://www.e-recht24.de">https://www.e-recht24.de</a></p>

        <img class="main-logo" src="{{ asset("images/SVToraLogo.png") }}" alt="Logo des SV Tora Berlin e.V." />

    </main>

    <x-footer></x-footer>

@endsection
