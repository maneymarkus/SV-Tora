@extends("layouts.layout", ["title" => "Kein zugeordneter Verein!"])

@push("scripts")
    <!-- Specific scripts -->
    <script src="{{ asset("js/sites/no-club.js") }}" defer></script>
@endpush

@section("content")

    <main class="limited">

        <p class="error">
            Achtung! Sie sind aktuell keinem Verein zugeordnet! Dies kann unter anderem dadurch passiert sein, dass ein Administrator Ihren Verein gelöscht hat.
            <br />
            Bitte wenden Sie sich an {{ config("global.help-mail") }}. Ein Administrator wird Sie dann Ihrem gewünschten Verein zuordnen und Sie können dieses Tool wie gewohnt benutzen.
            <br />
            Alternativ nutzen Sie die bequeme Methode über den Button unten, um die Administratoren über das Problem aufzuklären.
            Nachdem Sie Ihren gewünschten Verein eingegeben haben, werden die Administratoren dieser App informiert und ordnen Sie sobald wie möglich Ihrem gewünschten Verein zu.
            <br />
            Vielen Dank für Ihr Verständnis.
        </p>

        <x-secondary-button class="inform-admins" text="Administratoren informieren"></x-secondary-button>

    </main>

    <x-footer></x-footer>

@endsection
