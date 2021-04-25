@php

    use App\Helper\GeneralHelper;

    if (!isset($id)) {
        $id = GeneralHelper::uniqueRandomIdentifier();
    }

@endphp

<div {{ $attributes->merge(["class" => "date-input-container input-container"]) }}>
    <label class="icon" for="{{ $id }}"><i class="material-icons">today</i></label>
    <input class="date-input" type="text" id="{{ $id }}" name="{{ $name }}" value="{{ $value ?? "" }}" />
    <label class="text" for="{{ $id }}">{{ $label ?? "Datum" }}</label>
    <span class="underline"></span>
</div>
