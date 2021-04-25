@php

    use \App\Helper\GeneralHelper;

@endphp

<div {{ $attributes->merge(["class" => "checkbox-group input-container"]) }}>
    @foreach($options as $option)
        @php
            $id = GeneralHelper::uniqueRandomIdentifier();
            if ($option["checked"]) {
                $checked = "checked";
            } else {
                $checked = "";
            }
            if ($option["disabled"]) {
                $disabled = "disabled";
            } else {
                $disabled = "";
            }
        @endphp
        <label class="checkbox-input-container {{ $disabled }}" for="{{ $id }}">
            {{ $option["text"] }}
            <input type="checkbox" id="{{ $id }}" value="{{ $option["value"] }}" name="{{ $name }}" {{ $checked }} {{ $disabled }} />
            <span class="checkmark"></span>
        </label>
    @endforeach
</div>
