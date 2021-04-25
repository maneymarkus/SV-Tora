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
        <div class="document-reservoir">
            <div class="document">
                <i class="material-icons icon">description</i>
                <p>Irgendeine Liste 1.pdf</p>
            </div>
            <div class="document">
                <i class="material-icons icon">description</i>
                <p>Irgendeine Liste 2.pdf</p>
            </div>
            <div class="document">
                <i class="material-icons icon">description</i>
                <p>Irgendeine Liste 3.pdf</p>
            </div>
            <div class="document">
                <i class="material-icons icon">description</i>
                <p>Irgendeine Liste 4.pdf</p>
            </div>
            <div class="document">
                <i class="material-icons icon">description</i>
                <p>Irgendwas Anderes.docx</p>
            </div>
        </div>
        <label for="file-input" class="file-input-container">
            <input type="file" name="file-input" value="value" id="file-input" multiple />
            <i class="material-icons">publish</i>
            <span class="file-name">Datei auswählen...</span>
        </label>
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
        <a class="primary-button download" href="#">
            <i class="material-icons">get_app</i>
            <p>Dokument runterladen</p>
        </a>
    </div>

@endsection
