<div {{ $attributes->merge(["class" => "select-input-container input-container"]) }}>
    <label class="icon"><i class="material-icons">list</i></label>
    <span data-name="{{ $name }}" class="select-input chosen placeholder">{{ $placeholder ?? "Auswählen..." }}</span>
    <i class="material-icons">expand_more</i>
    <div class="options">
        @foreach($selectableOptions as $option)
            <div class="option">{{ $option }}</div>
        @endforeach
    </div>
</div>
