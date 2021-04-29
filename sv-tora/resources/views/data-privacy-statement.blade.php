@extends("layouts.base-template", ["title" => "Datenschutzerklärung"])

@section("body-content")

    <header class="header">
        <div class="logo"></div>
    </header>

    {{-- TODO: Link back to site previously visited --}}
    <a class="go-back" href="/dashboard">
        <i class="material-icons">arrow_back</i>
    </a>

    <main class="limited legal">

        <h1>Datenschutzerklärung</h1>

        {{-- TODO --}}

    </main>

    <x-footer></x-footer>

@endsection
