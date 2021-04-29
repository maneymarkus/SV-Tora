@extends("layouts.layout", ["title" => "Dashboard"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/dashboard.css") }}" type="text/css" />
@endpush

@push("scripts")
<!-- Specific scripts -->
<script src="{{ asset("js/sites/dashboard.js") }}" defer></script>
@endpush

@section("content")

    <h1 class="greeting">Dashboard</h1>

    <main class="dashboard">

        <div class="fade-wrapper clearfix">
            <div class="container-medium">
                <a class="tournaments" href="/tournament/dashboard">
                    <h3 class="heading">Wettkampf</h3>
                    <span class="tournament-name">Tora-Pokal</span>
                    <p class="subheading">Zum Wettkampf-Dashboard</p>
                </a>
            </div>

            <div class="container-medium">
                <a data-bg="Personen" class="horizontal-card" href="/entities/persons">
                    <h3 class="district">
                        Personen
                    </h3>
                    <span class="count">
                    513
                </span>
                </a>
                <a data-bg="Teams" class="horizontal-card" href="/entities/teams">
                    <h3 class="district">
                        Teams
                    </h3>
                    <span class="count">
                    107
                </span>
                </a>
                <a data-bg="Vereine" class="horizontal-card" href="/entities/clubs">
                    <h3 class="district">
                        Vereine
                    </h3>
                    <span class="count">
                    29
                </span>
                </a>
            </div>
        </div>

        <a class="creator-button" href="/creator">?</a>

    </main>

    <x-footer></x-footer>

@endsection
