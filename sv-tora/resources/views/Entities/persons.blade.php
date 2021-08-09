@extends("layouts.layout", ["title" => "Personen"])

@section("content")

    <main>

        <h1>Registrierte Personen</h1>

        @can("admin")
            <x-card title="Nutzer" number="{{ $counter = 1 }}" href="/entities/users"></x-card>
            <x-card title="Adminis&shy;tratoren" number="{{ $counter += 1 }}" href="/entities/admins"></x-card>
        @endcan
        <x-card title="Kämpfer" number="{{ isset($counter) ? $counter += 1 : $counter = 1 }}" href="/entities/fighters"></x-card>
        <x-card title="Coaches" number="{{ $counter += 1 }}" href="/entities/coaches"></x-card>
        <x-card title="Kampf&shy;richter" number="{{ $counter += 1 }}" href="/entities/referees"></x-card>
        <x-card title="Helfer" number="{{ $counter += 1 }}" href="/entities/helpers"></x-card>

    </main>

@endsection
