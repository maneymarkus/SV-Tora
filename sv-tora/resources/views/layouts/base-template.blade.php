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

    <title>{{ $title ?? "Wettkampfmanagementsystem" }} - SV Tora Berlin e.V.</title>

    <!-- STYLES -->

    @prepend("styles")
    <!-- General styles and fonts and stuff like that -->
    <link rel="stylesheet" href="{{ asset("css/app.css") }}" type="text/css" />
    @endprepend

    @stack("styles")


    <!-- SCRIPTS -->

    @prepend("scripts")
    <!--[if lt IE 9]>
        <script src="{{ asset("js/html5shiv.js") }}" defer></script>
    <![endif]-->

    <!-- Vendor javascript -->
    <script src="{{ asset("js/vendor.js") }}" defer></script>

    <!-- General Modules -->
    <script src="{{ asset("js/app.js") }}" defer></script>
    @endprepend

    @stack("scripts")

    <!--

        Webdesign by Markus Städler, weberlin-design.de, markus.staedler@weberlin-design.de

    -->

</head>
@if(\Illuminate\Support\Facades\Auth::user() === null || \Illuminate\Support\Facades\Auth::user()->dark_mode)
    <body class="darkmode">
@else
    <body>
@endif

    @yield("body-content")

</body>
</html>
