@extends("layouts.layout", ["title" => "Angemeldete " . $entities])

@section("content")

    <style>
        .enroll-entities {
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.6rem;
            top: auto;
            bottom: 2em;
        }
    </style>

    <main>
        <a class="link" href="{{ url("/tournaments/" . $tournament->id) }}">zurück</a>

        @php
            $editable = $enrollmentActive ? "true" : "false";
        @endphp
        <x-table :columns="$columns" :rows="$rows" actions="false" filter="true" editable="{{ $editable }}" deletable="{{ $editable }}" selectable="false">
            <x-slot name="heading">
                Angemeldete <span class="highlighted-span">{{ $entities }}</span> zum {{ $tournament->tournamentTemplate->tournament_name }}
                <p style="font-size: 1.2rem; font-weight: normal;"><strong>Hinweis</strong>: Die Aktion "Löschen" löscht hier nicht die angelegten {{ $entities }} komplett, sondern entfernt sie nur von diesem Wettkampf.</p>
                <p style="font-size: 1.2rem; font-weight: normal;">Bitte beachte außerdem, dass dir beim Hinzufügen von Startern/Kämpfern und Teams nur jene angezeigt werden, die den Kriterien des Wettkampfes entsprechen (in Bezug auf erlaubte Graduierungen und Altersgrenzen). Bei Teams erfolgt die Einteilung in die Kategorien anhand des Alters des Team-Ältesten.</p>
                @if(!$enrollmentActive)
                    <p style="font-size: 1.2rem; font-weight: normal;">Da der reguläre Anmeldezeitraum nicht aktiv ist, können die angemeldeten {{ $entities }} nur angesehen, aber nicht bearbeitet werden.</p>
                @endif
                <div style="display: flex; justify-content: flex-end; margin: 0 auto; max-width: 800px">
                    <x-primary-button class="print-enrolled" target="_blank" text="Angemeldete {{ $entities }} ausdrucken" icon-name="print" href="{{ $printEnrolledUrl }}"></x-primary-button>
                </div>
            </x-slot>
            <x-slot name="entity">{{ $entity }}</x-slot>
            <x-slot name="addEntityUrl">{{ $addUrl ?? ""}}</x-slot>
        </x-table>

    </main>

    @if($enrollmentActive)
        <div class="primary-button-floating-container enroll-entities">
            <x-primary-button class="enroll" text="{{ $entities }} anmelden" icon-name="add" href="{{ $addUrl }}"></x-primary-button>
        </div>
    @endif

@endsection
