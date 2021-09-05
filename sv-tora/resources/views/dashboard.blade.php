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
                    @if(\App\Models\Tournament::latest()->first()?->active)
                        <a class="tournaments" href="{{ url("/tournaments/dashboard") }}">
                            <h3 class="heading">Wettkampf</h3>
                            <span class="tournament-name">{{ \App\Models\Tournament::latest()->first()?->tournamentTemplate->tournament_name }}</span>
                            <p class="subheading">Zum Wettkampf-Dashboard</p>
                        </a>
                    @else
                        @if(\Illuminate\Support\Facades\Gate::allows("admin"))
                            <a class="tournaments no-tournament" href="{{ url("/tournaments/dashboard") }}">
                                <h3 class="heading">Zum Wettkampf Dashboard</h3>
                                <p class="subheading">{{ \App\Models\Tournament::all()->count() }} erfolgreich veranstaltete Wettkämpfe</p>
                            </a>
                        @else
                            <div class="no-tournament">
                                <h3 class="heading">Wettkampf</h3>
                                <p>Zur Zeit findet kein Wettkampf statt</span>
                            </div>
                        @endif
                    @endif
                </div>

                @php
                    $personCount = \App\Models\Person::all()->count();
                    $teamCount = \App\Models\Team::all()->count();
                    $clubCount = \App\Models\Club::all()->count();
                @endphp

                <div class="container-medium">
                    <x-horizontal-card title="Personen" href="/entities/persons" number="{{ $personCount }}"></x-horizontal-card>
                    <x-horizontal-card title="Teams" href="/entities/teams" number="{{ $teamCount }}"></x-horizontal-card>
                    @can("admin")
                        <x-horizontal-card title="Vereine" href="/entities/clubs" number="{{ $clubCount }}"></x-horizontal-card>
                    @endcan
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

        <a class="creator-button" href="{{ url("/creator") }}">?</a>

    </main>

    <x-footer></x-footer>

@endsection
