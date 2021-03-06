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

    <main>

        <form class="mail-content clearfix">
            <h3>Wem willst du schreiben?</h3>
            <div class="receiver-container clearfix">
                <div class="receiver-selection">
                    <div class="radio-group input-container required">
                        <label class="radio-input-container">
                            Allen Vereinen
                            <input type="radio" name="receiver" value="all" />
                            <span class="checkmark"></span>
                        </label>
                        <br />
                        <label class="radio-input-container">
                            Angemeldete Vereine zum aktuellen Wettkampf
                            <input type="radio" name="receiver" value="only-enrolled" />
                            <span class="checkmark"></span>
                        </label>
                        <br />
                        <label class="radio-input-container">
                            Ausgewählten Vereinen
                            <input type="radio" name="receiver" value="choose" />
                            <span class="checkmark"></span>
                        </label>
                    </div>
                </div>
                <a class="secondary-button disabled choose-receivers">
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
                </div>
            </div>
            <h3>Worum geht's?</h3>
            <span class="text-input-container required">
            <label class="icon" for="subject"><i class="material-icons">person</i></label>
            <input class="text-input" type="text" id="subject" name="subject" />
            <label class="text" for="subject">Betreff</label>
            <span class="underline"></span>
        </span>
            <h3>Was willst du genau mitteilen?</h3>
            <textarea class="textarea input-container required" placeholder="Deine Nachricht..."></textarea>
            <h3>Senden?</h3>
            <a class="primary-button send" href="#">
                <i class="material-icons">mail</i>
                <p>Senden</p>
            </a>
            <a class="primary-button cancel warning" href="/dashboard">
                <i class="material-icons">close</i>
                <p>Abbrechen</p>
            </a>
        </form>

        <i class="envelope material-icons">drafts</i>

@endsection
