<div {{ $attributes->merge(["class" => "property-information"]) }}>
    @foreach ($properties as $property => $value)
        <p data-property="{{ $property }}">{{ $value }}</p>
    @endforeach
</div>
