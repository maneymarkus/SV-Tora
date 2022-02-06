<div class="carousel-container">
    <div class="page-wrapper">
        {{-- Iterate over the given pages/slides and insert them into the carousel --}}
        @each("components.carousel.slide", $slides, "fightingSystem")
    </div>
</div>
