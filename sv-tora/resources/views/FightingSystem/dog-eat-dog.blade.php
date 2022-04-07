@extends("FightingSystem.print-fighting-system")

@section("fightingSystem")
    <h3>Kampfreihenfolge:</h3>
    <div class="dog-eat-dog clearfix">
        <div class="fight-order">
            @foreach($fights as $fight)
                <div class="fight">
                    <span class="square first"></span>
                    <span class="fighter first" data-fighter-id="{{ $fight->fighter1->id }}">{{ $fight->fighter1->person->fullName() }}</span>
                    <span class="number">{{ $fight->fightNumber }}</span>
                    <span class="fighter second" data-fighter-id="{{ $fight->fighter2->id }}">{{ $fight->fighter2->person->fullName() }}</span>
                    <span class="square second"></span>
                </div>
            @endforeach
        </div>
    </div>

    <table class="participants">
        <thead>
            <tr>
                <th>Teilnehmer</th>
                <th>Gewonnen</th>
                <th>Verloren</th>
            </tr>
        </thead>
        <tbody>
            @foreach($category->fighters as $enrolledFighter)
                <tr>
                    <td>{{ $enrolledFighter->fighter->person->fullName() }}</td>
                    <td class="points"></td>
                    <td class="points"></td>
                </tr>
            @endforeach
        </tbody>
    </table>

@endsection
