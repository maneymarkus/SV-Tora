@extends("FightingSystem.print-fighting-system")

@section("fightingSystem")

    <h3>Finale Runde</h3>

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
        </tbody>
    </table>

@endsection
