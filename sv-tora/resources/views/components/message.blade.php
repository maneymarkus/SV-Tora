<div class="message">
    <p class="timestamp">{{ $timestamp }}</p>
    <p class="sender">{{ $sender }}</p>
    <div {{ $attributes->merge(["class" => "notification clearfix ".$type]) }}>
        <i class="material-icons symbol">
            @if($type === "error")
                error_outline
            @elseif($type === "warning")
                warning
            @elseif($type === "success")
                done
            @else
                info
            @endif
        </i>
        <p class="message-content">{{ $message }}</p>
    </div>
</div>
