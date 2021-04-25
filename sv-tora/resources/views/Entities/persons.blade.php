@extends("layouts.layout", ["title" => "Personen"])

@section("content")

    <main>

        <h1>Registrierte Personen</h1>

        <x-card title="Kämpfer" number="1" href="/entities/fighters"></x-card>
        <x-card title="Coaches" number="2" href="/entities/coaches"></x-card>
        <x-card title="Kampf&shy;richter" number="3" href="/entities/referees"></x-card>
        <x-card title="Helfer" number="4" href="/entities/helpers"></x-card>

    </main>

@endsection
