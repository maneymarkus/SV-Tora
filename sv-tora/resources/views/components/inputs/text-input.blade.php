@php

    use App\Helper\GeneralHelper;

    if (!isset($id)) {
        $id = GeneralHelper::uniqueRandomIdentifier();
    }

    if (!isset($icon)) {
        switch($type) {
            case "email":
                $icon = "email";
                break;
            case "password":
                $icon = "lock";
                break;
            default:
                $icon = "edit";
        }
    }

@endphp

<span {{ $attributes->merge(["class" => "text-input-container input-container " . $type]) }}>
    <label class="icon" for="{{ $id }}"><i class="material-icons">{{ $icon }}</i></label>
    <input name="{{ $name }}" class="text-input" type="{{ $type }}" id="{{ $id }}" value="{{ $value ?? "" }}"/>
    <label class="text" for="{{ $id }}">{{ $label }}</label>
    <span class="underline"></span>
</span>
