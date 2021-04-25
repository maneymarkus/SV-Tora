@extends("layouts.base-template", ["title" => "Anmeldung"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/landing-page.css") }}" type="text/css" />
@endpush

@push("scripts")
    <!-- Specific scripts -->
    <script src="{{ asset("js/sites/landing-page.js") }}" defer></script>
@endpush

@section("body-content")

    <header class="header">
        <div class="logo"></div>
    </header>

    <main class="limited clearfix">

        <h1 id="heading">Willkommen auf der <span class="highlighted-span">Wettkampf</span>-Management Seite vom SV Tora.</h1>
        <p id="subtext">Hier können Sie Personen und Teams zum <span class="competition highlighted-span">Tora-Pokal</span> am <span class="date highlighted-span">03.03.2021</span> anmelden.</p>

        <a class="enroll" href="/tournament/dashboard">Jetzt anmelden <i class="material-icons">chevron_right</i></a>

    </main>

@endsection
