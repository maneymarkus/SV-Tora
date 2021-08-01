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

    <span class="username no-display">{{ session("username", "User") }}</span>

    <h1 class="greeting">Dashboard</h1>

    <main class="dashboard">

        <div class="fade-wrapper">
            <div class="clearfix">
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

            <div class="actions">
                <h2>Aktionen & spezielle Bereiche</h2>
                @can("admin")
                    <x-primary-button class="mail" text="E-Mail schreiben" icon-name="mail" href="/mail"></x-primary-button>
                    <x-primary-button class="documents" text="Dokumente" icon-name="description" href="/documents"></x-primary-button>
                    <x-primary-button class="messages" text="Nachrichten" icon-name="message" href="/messages"></x-primary-button>
                    <x-primary-button class="settings" text="Einstellungen" icon-name="settings" href="/settings"></x-primary-button>
                @endcan
                <x-primary-button class="invite" text="User einladen" icon-name="person_add"></x-primary-button>
            </div>

        </div>

        <a class="creator-button" href="/creator">?</a>

    </main>

    <x-footer></x-footer>

@endsection
