<a {{ $attributes->merge(["class" => "info-card tilt"]) }}>
    <div class="image-container">
        <img src="{{ $imagePath ?? asset("images/placeholder.png") }}" alt="Vereinsbild" />
    </div>
    <p class="club-name">{{ $name }}</p>
    <p class="e-mail">{{ $mail }}</p>
</a>
