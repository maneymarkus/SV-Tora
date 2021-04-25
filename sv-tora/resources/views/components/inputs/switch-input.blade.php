@php
    use App\Helper\GeneralHelper;

    if (!isset($id)) {
        $id = GeneralHelper::uniqueRandomIdentifier();
    }

@endphp

<label for="{{ $id }}" {{ $attributes->merge(["class" => "switch-container input-container"]) }}>
    <input type="checkbox" id="{{ $id }}" name="{{ $name }}" {{ $checked ?? "" }}>
    <span class="switch"></span>
    <span class="text">{{ $text }}</span>
</label>
