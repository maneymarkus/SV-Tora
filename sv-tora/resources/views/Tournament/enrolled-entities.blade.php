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
        @if(\Illuminate\Support\Facades\Auth::user()->isAdmin() && !$tournament->active)
            <p class="error"><strong>Warnung:</strong> Dieser Wettkampf ist schon abgeschlossen. Du kannst als Admin zwar noch Änderungen vornehmen, aber solltest dir diese genau überlegen, da du damit die Historie verfälschen könntest.</p>
        @endif

        <a class="link" href="{{ url("/tournaments/" . $tournament->id) }}">zurück</a>

        @php
            $editable = $enrollmentActive ? "true" : "false";
        @endphp
        <x-table :columns="$columns" :rows="$rows" actions="false" filter="true" editable="{{ $editable }}" deletable="{{ $editable }}" selectable="false">
            <x-slot name="heading">
                Angemeldete <span class="highlighted-span">{{ $entities }}</span> zum {{ $tournament->tournamentTemplate->tournament_name }}
                <p style="font-size: 1.2rem; font-weight: normal;"><strong>Hinweis</strong>: Die Aktion "Löschen" löscht hier nicht die angelegten {{ $entities }} komplett, sondern entfernt sie nur von diesem Wettkampf.</p>
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
