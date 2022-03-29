<div class="range-input-container input-container">
    <label class="range-label" for="{{ $id }}">Anzahl Kampfrichter: <span class="range-value">{{ $numberReferees }}</span></label>
    <input class="range-input" name="number-referees" value="{{ $numberReferees }}" type="range" id="{{ $id }}" min="1" max="15" step="1">
</div>
