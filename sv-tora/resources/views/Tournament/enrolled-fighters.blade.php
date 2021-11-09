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
        <a class="link" href="{{ url("/tournament/dashboard") }}">zurück</a>

        <x-table :columns="$columns" :rows="$rows" actions="false" filter="true" editable="true" deletable="true" selectable="false">
            <x-slot name="heading">
                Angemeldete <span class="highlighted-span">{{ $entities }}</span> zum {{ $tournament->tournamentTemplate->tournament_name }}
                <p style="font-size: 1.2rem; font-weight: normal;"><strong>Hinweis</strong>: Die Aktion "Löschen" löscht hier nicht die angelegten {{ $entities }} komplett, sondern entfernt sie nur von diesem Wettkampf.</p>
                <p style="font-size: 1.2rem; font-weight: normal;">Bitte beachte außerdem, dass dir beim Hinzufügen von Startern/Kämpfern nur jene angezeigt werden, die den Kriterien des Wettkampfes entsprechen (in Bezug auf erlaubte Graduierungen und Altersgrenzen).</p>
            </x-slot>
            <x-slot name="entity">{{ $entity }}</x-slot>
            <x-slot name="addEntityUrl">{{ $addUrl ?? ""}}</x-slot>
        </x-table>

    </main>

    <div class="primary-button-floating-container enroll-entities">
        <x-primary-button class="enroll" text="{{ $entities }} anmelden" icon-name="add" href="{{ $addUrl }}"></x-primary-button>
    </div>

@endsection
