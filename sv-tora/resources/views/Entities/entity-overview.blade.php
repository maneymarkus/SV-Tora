@extends("layouts.layout", ["title" => $entities])

@section("content")

    <main>
        <a class="link" href="{{ url()->previous("/dashboard") }}">zurück</a>

        <x-table :columns="$columns" :rows="$rows" actions="true" filter="true" editable="true" deletable="true" selectable="false">
            <x-slot name="heading">{{ $entities }}</x-slot>
            <x-slot name="entity">{{ $entity }}</x-slot>
            <x-slot name="addEntityUrl">{{ $addEntityUrl ?? ""}}</x-slot>
        </x-table>

    </main>

@endsection
