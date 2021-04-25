@extends("layouts.layout", ["title" => "Vereins-Anmeldung"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/club-acceptance.css") }}" type="text/css" />
@endpush

@push("scripts")
    <!-- Specific scripts -->
    <script src="{{ asset("js/sites/club-acceptance.js") }}" defer></script>
@endpush

@section("content")

    <main class="limited clearfix">

        <h1 class="heading">Vereinsanmeldung</h1>
        <p class="subtext">Verein <span class="highlighted-span">Die Zerstörer</span> (E-Mail: <span class="highlighted-span">zerstörer@hotmail.de</span>) haben sich angemeldet.</p>
        <div class="decision clearfix">
            <p>Zulassen?</p>
            <x-primary-button class="accept accent-1" text="Akzeptieren" icon-name="done_all"></x-primary-button>
            <x-primary-button class="cancel warning" text="Ablehnen" icon-name="close"></x-primary-button>
        </div>
    </main>

@endsection
