@php

    use App\Helper\GeneralHelper;

    if (!isset($id)) {
        $id = GeneralHelper::uniqueRandomIdentifier();
    }

@endphp

<label for="{{ $id }}" {{ $attributes->merge(["class" => "file-input-container input-container"]) }}>
    <input class="file-input" type="file" name="{{ $name }}[]" id="{{ $id }}" multiple />
    <i class="material-icons">publish</i>
    <span class="file-name">Datei auswählen...</span>
</label>
