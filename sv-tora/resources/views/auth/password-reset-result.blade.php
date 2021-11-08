@extends("layouts.layout", ["title" => "Passwort"])

@section("content")

    <main class="limited">

        <h1>Passwort zurücksetzen</h1>

        @if(isset($error) && $error)
            <p class="error">
                Leider konnte Ihr Passwort nicht zurückgesetzt werden. Bitte versuchen Sie es später erneut. Sollte dies öfter auftreten, dann wenden Sie sich bitte an: {{ config("global.help-mail") }}
            </p>
        @else
            <p class="success">
                Ihr Passwort wurde erfolgreich zurückgesetzt!
            </p>
        @endif

        <a class="link" href="{{ route("login") }}">Zurück zum Login</a>

    </main>

    <x-footer></x-footer>

@endsection
