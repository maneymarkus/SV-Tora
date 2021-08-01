@extends("layouts.layout", ["title" => "Nutzer"])

@section("content")

    <main>

        <x-table :columns="$columns" :rows="$rows" actions="false" filter="true" editable="true" deletable="true" selectable="false">
            <x-slot name="heading">Nutzer</x-slot>
        </x-table>

    </main>

@endsection
