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

    <title>Übersicht der Kategorien beim {{ $tournament->tournamentTemplate->tournament_name }} am {{ \Carbon\Carbon::parse($tournament->date)->format("d.m.Y") }}</title>

    <!--

        Webdesign by Markus Städler, weberlin-design.de, markus.staedler@weberlin-design.de

    -->

    <style>

        * {
            color: black !important;
        }

        h1 {
            font-size: 1.25rem;
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

        p.info {
            margin-top: 3rem;
            font-size: 0.75rem;
        }

    </style>

</head>
<body>

    <h1>Übersicht der Kategorien beim {{ $tournament->tournamentTemplate->tournament_name }} am {{ \Carbon\Carbon::parse($tournament->date)->format("d.m.Y") }}</h1>

    <table>
        <thead>
            <tr>
                <th>Kategorie</th>
                <th>Disziplin</th>
                <th>Alter</th>
                <th>Geschlecht</th>
                <th>Graduierung</th>
                <th>Teilnehmer</th>
            </tr>
        </thead>
        <tbody>
            @foreach($categories as $category)
                <tr>
                    <td>{{ $category->name }}</td>
                    <td>{{ $category->examination_type }}</td>
                    <td>{{ $category->age_min }} - {{ $category->age_max }}</td>
                    <td>{{ $category->sex }}</td>
                    <td>{{ $category->graduation_min }} - {{ $category->graduation_max }}</td>
                    @if($category->examination_type === "Team")
                        <td>{{ $category->teams->count() }}</td>
                    @else
                        <td>{{ $category->fighters->count() }}</td>
                    @endif
                </tr>
            @endforeach
        </tbody>
    </table>

    @if(!$isAdmin)
        <p class="info">Bitte beachten Sie: je nach Stand der Vorbereitungen kann sich diese Liste noch ändern.</p>
    @endif

</body>
