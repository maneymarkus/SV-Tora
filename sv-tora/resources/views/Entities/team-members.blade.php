@extends("layouts.layout", ["title" => "Team-Mitglieder von Team" . $teamName])

@section("content")

    <main>

        <x-table class="smartphone-optimized" :columns="$columns" :rows="$rows" actions="true" filter="true" editable="true" deletable="true" selectable="false">
            <x-slot name="heading">Kämpfer des Teams <span class="highlighted-span">{{ $teamName }}</span></x-slot>
            <x-slot name="entity">Kämpfer</x-slot>
            <x-slot name="addEntityUrl">{{ $addEntityUrl }}</x-slot>
        </x-table>

    </main>

@endsection
