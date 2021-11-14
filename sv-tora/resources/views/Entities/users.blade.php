@extends("layouts.layout", ["title" => "Nutzer"])

@section("content")

    <main>
        <a class="link" href="{{ url("/entities/people") }}">zurück</a>

        <x-table :columns="$columns" :rows="$rows" actions="false" filter="true" editable="true" deletable="true" selectable="false">
            <x-slot name="heading">Nutzer</x-slot>
        </x-table>

    </main>

@endsection
