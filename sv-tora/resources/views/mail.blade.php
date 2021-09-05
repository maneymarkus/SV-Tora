@extends("layouts.layout", ["title" => "E-Mail schreiben"])

@push("styles")
    <!-- Specific style -->
    <link rel="stylesheet" href="{{ asset("css/sites/mail.css") }}" type="text/css" />
@endpush

@push("scripts")
    <!-- Specific scripts -->
    <script src="{{ asset("js/sites/mail.js") }}" defer></script>
@endpush

@section("content")

    <main class="">

        <form class="mail-content clearfix">
            <h3>Wem willst du schreiben?</h3>
            <div class="receiver-container clearfix">
                <div class="receiver-selection">
                    <div class="radio-group input-container required">
                        <label class="radio-input-container">
                            Allen Vereinen
                            <input type="radio" name="receiver" value="all" data-url="{{ url("/mail/user-mails/all") }}" />
                            <span class="checkmark"></span>
                        </label>
                        <br />
                        <label class="radio-input-container">
                            Angemeldete Vereine zum aktuellen Wettkampf
                            <input type="radio" name="receiver" value="only-enrolled" data-url="{{ url("/mail/user-mails/enrolled") }}" />
                            <span class="checkmark"></span>
                        </label>
                        <br />
                        <label class="radio-input-container">
                            Ausgewählten Vereinen
                            <input type="radio" name="receiver" value="choose" data-url="{{ url("/mail/user-mails/selected") }}"  />
                            <span class="checkmark"></span>
                        </label>
                    </div>
                </div>
                <a class="secondary-button choose-receivers">
                    <span class="text">
                        Auswählen
                    </span>
                </a>
                <br />
                <a class="secondary-button free-text">
                    <span class="text">
                        Freitexteingabe
                    </span>
                </a>
                <div class="chosen-receivers">
                    <span class="to">An:</span>
                    @isset($emails)
                        @foreach($emails as $email)
                            <x-tag class="receiver">
                                @isset($email["name"])
                                    <x-slot name="key">{{ $email["name"] }}</x-slot>
                                @endisset
                                <x-slot name="value">{{ $email["mail"] }}</x-slot>
                            </x-tag>
                        @endforeach
                    @endisset
                </div>
            </div>
            <h3>Worum geht's?</h3>
            <span class="text-input-container input-container subject required">
                <label class="icon" for="subject"><i class="material-icons">person</i></label>
                @isset($subject)
                    <input class="text-input" type="text" id="subject" name="subject" value="{{ $subject }}" />
                @else
                    <input class="text-input" type="text" id="subject" name="subject" />
                @endisset
                <label class="text" for="subject">Betreff</label>
                <span class="underline"></span>
            </span>
            <h3>Was willst du genau mitteilen?</h3>
            <textarea class="textarea input-container required" name="content" placeholder="Deine Nachricht...">@isset($content){{ $content }}@endisset</textarea>
            <h3>Senden?</h3>
            <a class="primary-button send" href="{{ url("/mail") }}">
                <i class="material-icons">mail</i>
                <p>Senden</p>
            </a>
            <a class="primary-button cancel warning" href="{{ redirect()->back()->getTargetUrl() === route("login") ? url("/dashboard") : redirect()->back()->getTargetUrl() }}">
                <i class="material-icons">close</i>
                <p>Abbrechen</p>
            </a>
        </form>

        <i class="envelope material-icons">drafts</i>

@endsection
