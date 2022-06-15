@extends("layouts.layout", ["title" => "Personen"])

@section("content")

    <main>

        <a class="link" href="{{ url()->previous("/dashboard") }}">zurück</a>
        <h1>Registrierte Personen</h1>

        @can("admin")
            <x-card title="Nutzer" number="{{ $counter = 1 }}" href="/entities/users"></x-card>
            <x-card title="Adminis&shy;tratoren" number="{{ ++$counter }}" href="/entities/admins"></x-card>
        @endcan
        <x-card title="Tisch&shy;besetzung" number="{{ isset($counter) ? ++$counter : $counter = 1 }}" href="/entities/desk-supporters"></x-card>
        <x-card title="Kampf&shy;richter" number="{{ ++$counter }}" href="/entities/referees"></x-card>
        <x-card title="Kämpfer" number="{{ ++$counter }}" href="/entities/fighters"></x-card>
        <x-card title="Coaches/<wbr>Helfer" number="{{ ++$counter }}" href="/entities/coaches"></x-card>

    </main>

@endsection
