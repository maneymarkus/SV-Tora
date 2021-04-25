<textarea name="{{ $name }}" {{ $attributes->merge(["class" => "textarea input-container"]) }} placeholder="{{ $placeholder ?? "Hier kann Text stehen..." }}">{{ $value ?? "" }}</textarea>
