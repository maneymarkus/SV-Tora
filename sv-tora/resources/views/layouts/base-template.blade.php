<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
    <meta name="keywords" content="{{ $keywords ?? "default" }}" />
    <meta name="description" content="{{ $description ?? "default" }}" />

    <title>SV Tora Berlin e.V. - {{ $title ?? "Wettkampfmanagementsystem" }}</title>

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
<body class="darkmode">

    @yield("body-content")

</body>
</html>
