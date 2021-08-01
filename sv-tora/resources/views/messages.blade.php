@extends("layouts.layout", ["title" => "Nachrichtencenter"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/messages.css") }}" type="text/css" />
@endpush

@section("content")

    <main class="limited">
        <h1>Nachrichten</h1>

        <div class="message-container">
            <div class="message">
                <p class="time">15.11.2020 12:36</p>
                <p class="sender">System</p>
                <div class="notification error clearfix">
                    <i class="material-icons symbol">error_outline</i>
                    <p class="message-content">Diese Funktion ist leider noch nicht implementiert.</p>
                </div>
            </div>
        </div>
        <span class="shadow"></span>
    </main>

@endsection
