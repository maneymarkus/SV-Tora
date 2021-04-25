@php

    use App\Helper\GeneralHelper;

    if (!isset($id)) {
        $id = GeneralHelper::uniqueRandomIdentifier();
    }

@endphp


<div {{ $attributes->merge(["class" => "range-input-container input-container"]) }}>
    <label class="range-label" for="{{ $id }}">Range: <span class="range-value">{{ $value }}</span></label>
    <input class="range-input" name="{{ $name }}" value="{{ $value ?? "" }}" type="range" id="{{ $id }}" min="{{ $min }}" max="{{ $max }}" step="{{ $step ?? 1 }}">
</div>
