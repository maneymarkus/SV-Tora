@extends("layouts.layout", ["title" => "Wettkampf Dashboard"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/tournament-dashboard.css") }}" type="text/css" />
@endpush

@push("scripts")
<!-- Specific scripts -->
<script src="{{ asset("js/sites/no-tournament.js") }}" defer></script>
@endpush

@section("content")

    <main class="no-tournament">
        <a class="link" href="{{ url()->previous() }}">zurück</a>
        <h1>Zur Zeit findet kein Wettkampf statt.</h1>
        <a class="host-tournament tilt" href="{{ url("/tournaments") }}">
            <i class="material-icons">add</i>
            <p>Wettkampf veranstalten</p>
        </a>
    </main>

@endsection
