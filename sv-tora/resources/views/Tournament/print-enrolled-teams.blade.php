<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
    <meta name="keywords" content="{{ $keywords ?? "default" }}" />
    <meta name="description" content="{{ $description ?? "default" }}" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    @can("admin")
        <meta name="is-admin" content="1" />
    @else
        <meta name="is-admin" content="0" />
    @endcan

    <title>Angemeldete Teams zum {{ $tournament->tournamentTemplate->tournament_name }} am {{ \Carbon\Carbon::parse($tournament->date)->format("d.m.Y") }}</title>

    <!--

        Webdesign by Markus Städler, weberlin-design.de, markus.staedler@weberlin-design.de

    -->

    <style>

        * {
            color: black !important;
        }

        h1 {
            font-size: 1.5rem;
            margin: 0 auto 2rem;
            text-align: left;
        }

        .page-break {
            page-break-after: always;
        }

        table {
            font-size: 1rem;
            width: 100%;
        }

        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
        }

        td {
            min-width: 2rem;
            min-height: 1rem;
        }

    </style>

</head>
<body>

    <h1>Angemeldete Teams zum {{ $tournament->tournamentTemplate->tournament_name }} am {{ \Carbon\Carbon::parse($tournament->date)->format("d.m.Y") }}</h1>

    <table>
        <thead>
            <tr>
                <th>Nr.</th>
                <th>Name</th>
                <th>Team-Mitglieder</th>
                <th>Kategorie</th>
                @if($isAdmin)
                    <th>Verein</th>
                @endif
            </tr>
        </thead>
        <tbody>
            @foreach($enrolledTeams as $enrolledTeam)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $enrolledTeam->team->name }}</td>
                    <td>
                        {{ implode(", ", $enrolledTeam->team->fighters->map(function ($item, $key) {
                            $item->full_name = $item->person->fullName();
                            return $item;
                        })->pluck("full_name")->toArray()) }}
                    <td>{{ implode(", ", $enrolledTeam->categories()->where("tournament_id", "=", $tournament->id)->get()->sortBy("name")->pluck("name")->toArray()) }}</td>
                    @if($isAdmin)
                        <td>{{ $enrolledTeam->team->club->name }}</td>
                    @endif
                </tr>
            @endforeach
        </tbody>
    </table>


</body>
