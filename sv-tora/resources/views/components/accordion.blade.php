<div {{ $attributes->merge(["class" => "accordion"]) }}>
    @foreach($bars as $bar)
        <div class="accordion-bar">
            <div class="bar-header clearfix">
                <i class="material-icons open-indicator">keyboard_arrow_down</i>
                {!! $bar["heading"] !!}
            </div>
            <div class="bar-content">
                {!! $bar["content"] !!}
            </div>
        </div>
    @endforeach
</div>
