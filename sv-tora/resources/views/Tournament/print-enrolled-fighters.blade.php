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

    <title>Angemeldete Kämpfer zum {{ $tournament->tournamentTemplate->tournament_name }} am {{ \Carbon\Carbon::parse($tournament->date)->format("d.m.Y") }}</title>

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

    <h1>Angemeldete Kämpfer zum {{ $tournament->tournamentTemplate->tournament_name }} am {{ \Carbon\Carbon::parse($tournament->date)->format("d.m.Y") }}</h1>

    <table>
        <thead>
            <tr>
                <th>Nr.</th>
                <th>Nachname</th>
                <th>Vorname</th>
                <th>Kategorie(n)</th>
                @if($isAdmin)
                    <th>Verein</th>
                @endif
            </tr>
        </thead>
        <tbody>
            @foreach($enrolledFighters as $enrolledFighter)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $enrolledFighter->fighter->person->last_name }}</td>
                    <td>{{ $enrolledFighter->fighter->person->first_name }}</td>
                    <td>{{ implode(", ", $enrolledFighter->categories()->where("tournament_id", "=", $tournament->id)->get()->sortBy("name")->pluck("name")->toArray()) }}</td>
                    @if($isAdmin)
                        <td>{{ $enrolledFighter->fighter->person->club->name }}</td>
                    @endif
                </tr>
            @endforeach
        </tbody>
    </table>


</body>
