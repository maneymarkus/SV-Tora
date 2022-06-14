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
                    @if(\Illuminate\Support\Facades\Gate::allows("admin"))
                        <a class="tournaments" href="{{ url("/tournaments") }}">
                            <h3 class="heading">Zum Wettkampf Dashboard</h3>
                            <div class="info">
                                <p class="subheading"><span>{{ $activeTournaments = \App\Models\Tournament::where("active", true)->get()->count() }}</span> {{ $activeTournaments === 1 ? "aktiver Wettkampf" : "aktive Wettkämpfe" }}</p>
                                <p class="subheading"><span>{{ \App\Models\Tournament::where("active", false)->get()->count() }}</span> erfolgreich veranstaltete Wettkämpfe (bisher)</p>
                            </div>
                        </a>
                    @else
                        <a class="tournaments" href="{{ url("/tournaments") }}">
                            <h3 class="heading">Zum Wettkampf Dashboard</h3>
                            <div class="info">
                                <p class="subheading"><span>{{ $activeTournaments = \App\Models\Tournament::where("active", true)->get()->count() }}</span> {{ $activeTournaments === 1 ? "aktiver Wettkampf" : "aktive Wettkämpfe" }}</p>
                            </div>
                        </a>
                    @endif

                </div>

                <div class="container-medium">
                    <x-horizontal-card title="Personen" href="/entities/people" number="{{ $personCount }}"></x-horizontal-card>
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

                    {{-- <x-primary-button class="messages" text="Nachrichten" icon-name="message" href="/messages"></x-primary-button> --}}
                    <x-primary-button class="settings" text="Einstellungen" icon-name="settings" href="/settings"></x-primary-button>
                @endcan
                @php
                    $invitePermissions = \Illuminate\Support\Facades\Gate::allows("has-permission", \App\Helper\Permissions::INVITE_USERS);
                @endphp
                <x-primary-button class="invite" text="User einladen" icon-name="person_add" data-full-permission="{{ $invitePermissions }}"></x-primary-button>
                <x-primary-button target="_blank" href="https://www.sv-tora.de/" class="home" text="SV Tora Website" icon-name="home"></x-primary-button>
            </div>

        </div>

        {{--<a class="creator-button" href="{{ url("/creator") }}">?</a>--}}

    </main>


    {{-- <x-footer></x-footer> --}}

@endsection
