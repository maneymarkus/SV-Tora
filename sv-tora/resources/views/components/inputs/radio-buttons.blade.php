@php

    use \App\Helper\GeneralHelper;

    $check = false;

@endphp

<div {{ $attributes->merge(["class" => "radio-group input-container"]) }}>
    @foreach($options as $option)
        @php
            $id = GeneralHelper::uniqueRandomIdentifier();
            if ($option["checked"] && !$check) {
                $checked = "checked";
                $check = true;
            } else {
                $checked = "";
            }
            if ($option["disabled"]) {
                $disabled = "disabled";
            } else {
                $disabled = "";
            }
        @endphp
        <label class="radio-input-container {{ $disabled }}" for="{{ $id }}">
            {{ $option["text"] }}
            <input type="radio" id="{{ $id }}" value="{{ $option["value"] }}" name="{{ $name }}" {{ $checked }} {{ $disabled }} />
            <span class="checkmark"></span>
        </label>
    @endforeach
</div>
