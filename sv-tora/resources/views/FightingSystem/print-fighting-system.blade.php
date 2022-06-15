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

    <title>Kampfsystem der Kategorie {{ $category->name }} zum Ausdrucken</title>

    <!--

        Webdesign by Markus Städler, weberlin-design.de, markus.staedler@weberlin-design.de

    -->

    <link rel="stylesheet" href="{{ asset("css/sites/fighting-systems.css") }}" type="text/css" />

    <style>

        * {
            color: black !important;
        }

        .meta-info {
            margin: 0 auto 3rem;
            width: 60%;
        }

        h1 {
            font-size: 1.5rem;
            margin: 0 auto 1rem;
            text-align: center;
        }

        h2 {
            font-size: 1.25rem;
            margin: 0 auto 0.5rem;
            position: relative;
        }

        .meta-info p {
            margin: 0 auto 0.5rem;
            position: relative;
        }

        .meta-info p span,
        .meta-info h2 span {
            position: absolute;
            right: 0;
            top: 0;
        }

        .page-break {
            page-break-after: always;
        }

        table {
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

        .tree {
            font-size: 0.75rem;
        }

    </style>

</head>
<body>

    @php
        if (!isset($onlyFightingSystem)) {
            $onlyFightingSystem = false;
        }
    @endphp

    @if(!$onlyFightingSystem)
        <div class="meta-info">
            <h1>{{ $category->examination_type }}</h1>
            <h2>Kategorie: <span>{{ $category->name }}</span></h2>
            <p>Geschlecht: <span>{{ $category->sex }}</span></p>
            <p>Alter: <span>{{ $category->age_min }}-{{ $category->age_max }}</span></p>
            <p>Graduierung: <span>{{ $category->graduation_min }}-{{ $category->graduation_max }}</span></p>
            <p>Kampfsystem: <span>{{ $category->fightingSystem->name }}</span></p>
            <p>Anzahl Teilnehmer: <span>{{ $category->fighters->count() }}</span></p>
            <p>Geschätzter Zeitaufwand: <span>{{ $category->estimated_required_time_in_seconds / 60 }} min</span></p>
        </div>
    @endif

    @yield("fightingSystem")

</body>
