<span {{ $attributes->merge(["class" => "tag"]) }}>
    <span class="tag-details">
        @isset($key)
            <span class="tag-key">{{ $key }}</span>:
        @endif
        <span class="tag-value">{{ $value }}</span>
    </span>
    <a class="delete-button delete">
        <i class="material-icons">close</i>
    </a>
</span>
