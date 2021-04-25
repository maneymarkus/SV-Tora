@php

    use App\Helper\GeneralHelper;

    if (!isset($id)) {
        $id = GeneralHelper::uniqueRandomIdentifier();
    }

@endphp

<div {{ $attributes->merge(["class" => "time-input-container input-container"]) }}>
    <label class="icon" for="{{ $id }}"><i class="material-icons">schedule</i></label>
    <input class="time-input" type="text" id="{{ $id }}" name="{{ $name }}" value="{{ $value ?? "" }}" />
    <label class="text" for="{{ $id }}">{{ $label ?? "Zeit" }}</label>
    <span class="underline"></span>
</div>
