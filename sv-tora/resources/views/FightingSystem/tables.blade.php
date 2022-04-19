@extends("FightingSystem.print-fighting-system")

@section("fightingSystem")

    <h3>Runde {{ $round = 1 }}</h3>

    <table>
        <thead>
            <tr>
                <th>Kämpfer</th>
                @for($i = 0; $i < $numberReferees; $i++)
                    <th>{{ $i + 1 }}</th>
                @endfor
                <th>Gesamt</th>
                <th>Platz</th>
            </tr>
        </thead>
        <tbody>
            @foreach($category->fighters as $enrolledFighter)
                <tr>
                    <td>{{ $enrolledFighter->fighter->person->fullName() }}</td>
                    @for($i = 0; $i < $numberReferees; $i++)
                        <td></td>
                    @endfor
                    <td></td>
                    <td></td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="page-break"></div>

    @if($category->fighters->count() > 12)

        <h3>Runde {{ ++$round }}</h3>

        <table>
            <thead>
            <tr>
                <th>Kämpfer</th>
                @for($i = 0; $i < $numberReferees; $i++)
                    <th>{{ $i + 1 }}</th>
                @endfor
                <th>Gesamt</th>
                <th>Platz</th>
            </tr>
            </thead>
            <tbody>
            @for($i = 0; $i < 12; $i++)
                <tr>
                    <td style="min-width: 10rem;"></td>
                    @for($r = 0; $r < $numberReferees; $r++)
                        <td>&nbsp;</td>
                    @endfor
                    <td></td>
                    <td></td>
                </tr>
            @endfor
            </tbody>
        </table>

    @endif

    <h3>Runde {{ ++$round }}</h3>

    <table>
        <thead>
        <tr>
            <th>Kämpfer</th>
            @for($i = 0; $i < $numberReferees; $i++)
                <th>{{ $i + 1 }}</th>
            @endfor
            <th>Gesamt</th>
            <th>Platz</th>
        </tr>
        </thead>
        <tbody>
        @if($category->fighters->count() <= 4)
            @foreach($category->fighters as $enrolledFighter)
                <tr>
                    <td>{{ $enrolledFighter->fighter->person->fullName() }}</td>
                    @for($i = 0; $i < $numberReferees; $i++)
                        <td></td>
                    @endfor
                    <td></td>
                    <td></td>
                </tr>
            @endforeach
        @else
            @for($i = 0; $i < 4; $i++)
                <tr>
                    <td style="min-width: 10rem;"></td>
                    @for($r = 0; $r < $numberReferees; $r++)
                        <td>&nbsp;</td>
                    @endfor
                    <td></td>
                    <td></td>
                </tr>
            @endfor
        @endif
        </tbody>
    </table>

@endsection
