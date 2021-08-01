@extends("layouts.layout", ["title" => "Dokumente"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/documents.css") }}" type="text/css" />
@endpush

@push("scripts")
<!-- Specific scripts -->
<script src="{{ asset("js/sites/documents.js") }}" defer></script>
@endpush

@section("content")

    <main class="limited">
        <h1>Dokumente</h1>
        @isset ($error)
            <p class="form-error">
                {{ $error }}
            </p>
        @endisset
        <div class="document-reservoir">
            @if(sizeof($documents) > 0)
                @foreach($documents as $document)
                    <div class="document" id="{{ $document->id }}" data-url="{{ url("/documents") }}">
                        <i class="material-icons icon">description</i>
                        <p>{{ $document->name }}</p>
                    </div>
                @endforeach
            @else
                <h3 style="text-align: center">Aktuell gibt es noch keine Dokumente</h3>
            @endif
        </div>
        <form class="document-upload" method="POST" action="{{ url("/documents") }}" enctype="multipart/form-data">
            @csrf
            <label for="document-input" class="file-input-container input-container">
                <input type="file" name="document" id="document-input" multiple />
                <i class="material-icons">publish</i>
                <span class="file-name">Datei auswählen...</span>
            </label>
            <br />
            <button type="submit" class="secondary-button disabled upload-button" >
                <span class="text">Upload</span>
            </button>
        </form>
    </main>

    <i class="document-bg material-icons">description</i>

    <div class="document-interaction">
        <div class="document-meta">
            <a class="primary-button rename">
                <i class="material-icons">edit</i>
                <p>Dokument umbenennen</p>
            </a>
            <span class="document-name">Irgendeine Liste</span>
            <span class="document-type">.pdf</span>
            <a class="primary-button delete warning">
                <i class="material-icons">clear</i>
                <p>Dokument löschen</p>
            </a>
        </div>
        <a class="primary-button download">
            <i class="material-icons">get_app</i>
            <p>Dokument runterladen</p>
        </a>
    </div>

@endsection
