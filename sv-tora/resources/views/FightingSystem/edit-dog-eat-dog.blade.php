<div class="dog-eat-dog clearfix">
    <div class="fight-order droppable">
        @foreach($fights as $fight)
            <div class="fight draggable">
                <span class="fighter" data-fighter-id="{{ $fight->fighter1->id }}">{{ $fight->fighter1->person->fullName() }}</span>
                <span class="number">{{ $fight->fightNumber }}</span>
                <span class="fighter" data-fighter-id="{{ $fight->fighter2->id }}">{{ $fight->fighter2->person->fullName() }}</span>
            </div>
        @endforeach
    </div>
</div>
