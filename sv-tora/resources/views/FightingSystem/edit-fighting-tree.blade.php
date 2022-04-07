<div class="tree clearfix">
    @foreach($fights as $column)
        <div class="column">
            @foreach($column as $fight)
                @if($loop->parent->first && $loop->first)
                <div class="fight droppable" data-fight-number="{{ $fight?->fightNumber }}" style="margin-top: {{ $marginTopForFirstPreFight }}em;">
                @else
                <div class="fight droppable" data-fight-number="{{ $fight?->fightNumber }}">
                @endif
                    <span class="fighter draggable" data-fighter-id="{{ $fight->fighter1?->id }}">{{ $fight->fighter1?->person->fullName() }}</span>
                    <span class="fighter draggable" data-fighter-id="{{ $fight->fighter2?->id }}">{{ $fight->fighter2?->person->fullName() }}</span>
                </div>
            @endforeach
        </div>
    @endforeach
</div>
