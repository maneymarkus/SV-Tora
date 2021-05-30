@extends("layouts.layout", ["title" => "Creator"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/creator.css") }}" type="text/css" />
@endpush

@push("scripts")
    <!-- Specific scripts -->
    <script src="{{ asset("js/sites/creator.js") }}" defer></script>
@endpush

@section("content")

    <a class="go-back" href="{{ back() }}"></a>

    <main>
        <h1 class="heading">C<span>r</span>e<span>a</span>t<span>o</span>r</h1>
        <p class="p0 written">Wer hat das hier eigentlich alles geschrieben?</p>
        <p class="p1 written">Das war... ich.</p>
        <div class="creator-pic-container">
            <img src="{{ asset("images/placeholder.png") }}" alt="Bild von Markus Städler" />
        </div>
        <div class="fade-wrapper">
            <p>Ich bin Markus Städler.</p>
            <p>Ich gestalte und programmiere individuelle Websiten/Apps.</p>
            <p>Falls du mich näher kennen lernen möchtest, besuch mich doch auf meiner Website:</p>
            <a class="link" href="https://weberlin-design.de">Weberlin-Design.de</a>
        </div>
    </main>

    <span class="creator-bg">?</span>

@endsection
