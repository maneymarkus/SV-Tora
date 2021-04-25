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
                <div class="notification clearfix">
                    <i class="material-icons symbol">info</i>
                    <p class="message-content">Irgendetwas super duper mega krass wichtiges!</p>
                </div>
            </div>
            <div class="message">
                <p class="time">15.11.2020 12:36</p>
                <p class="sender">System</p>
                <div class="notification interactive clearfix">
                    <i class="material-icons symbol">info</i>
                    <p class="message-content">Irgendetwas super duper mega krass wichtiges! <a class="interaction" href="#">Link</a></p>
                </div>
            </div>
            <div class="message">
                <p class="time">15.11.2020 12:36</p>
                <p class="sender">System</p>
                <div class="notification warning clearfix">
                    <i class="material-icons symbol">warning</i>
                    <p class="message-content">Irgendetwas super duper mega krass wichtiges!</p>
                </div>
            </div>
            <div class="message">
                <p class="time">15.11.2020 12:36</p>
                <p class="sender">System</p>
                <div class="notification interactive clearfix">
                    <i class="material-icons symbol">info</i>
                    <p class="message-content">Irgendetwas super duper mega krass wichtiges!</p>
                </div>
            </div>
            <div class="message">
                <p class="time">15.11.2020 12:36</p>
                <p class="sender">System</p>
                <div class="notification clearfix">
                    <i class="material-icons symbol">info</i>
                    <p class="message-content">Irgendetwas super duper mega krass wichtiges!</p>
                </div>
            </div>
            <div class="message">
                <p class="time">15.11.2020 12:36</p>
                <p class="sender">System</p>
                <div class="notification error clearfix">
                    <i class="material-icons symbol">error_outline</i>
                    <p class="message-content">Irgendetwas super duper mega krass wichtiges!</p>
                </div>
            </div>
            <div class="message">
                <p class="time">15.11.2020 12:36</p>
                <p class="sender">System</p>
                <div class="notification clearfix">
                    <i class="material-icons symbol">info</i>
                    <p class="message-content">Irgendetwas super duper mega krass wichtiges!</p>
                </div>
            </div>
            <div class="message">
                <p class="time">15.11.2020 12:36</p>
                <p class="sender">System</p>
                <div class="notification success clearfix">
                    <i class="material-icons symbol">done</i>
                    <p class="message-content">Irgendetwas super duper mega krass wichtiges!</p>
                </div>
            </div>
            <div class="message">
                <p class="time">15.11.2020 12:36</p>
                <p class="sender">System</p>
                <div class="notification clearfix">
                    <i class="material-icons symbol">info</i>
                    <p class="message-content">Irgendetwas super duper mega krass wichtiges!</p>
                </div>
            </div>
            <div class="message">
                <p class="time">15.11.2020 12:36</p>
                <p class="sender">System</p>
                <div class="notification clearfix">
                    <i class="material-icons symbol">info</i>
                    <p class="message-content">Irgendetwas super duper mega krass wichtiges!</p>
                </div>
            </div>
        </div>
        <span class="shadow"></span>
    </main>

@endsection
