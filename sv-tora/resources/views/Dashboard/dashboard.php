<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
    <meta name="keywords" content="" />
    <meta name="description" content="Eine gute Beschreibung von SV Tora e.V." />

    <title>SV-Tora - Dashboard</title>

    <link rel="icon" href="/SV-Tora/images/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="/SV-Tora/style/normalize.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/material-icons.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/general-style.css" type="text/css" />

    <script type="text/javascript">
        // Google Analytics?
    </script>

    <script src="/SV-Tora/js/script.js" type="application/javascript" defer></script>
    <!--[if lt IE 9]>
    <script src="/SV-Tora/js/html5shiv.js"></script>
    <![endif]-->

    <!--

        Webdesign by Markus Städler, weberlin-design.de, markus.staedler@weberlin-design.de

    -->

</head>
<body class="darkmode clearfix">

    <?php $folder = basename(__DIR__) ?>

    <?php include($_SERVER["DOCUMENT_ROOT"] . "/SV-Tora/components/header.php"); ?>
    <?php include($_SERVER["DOCUMENT_ROOT"] . "/SV-Tora/components/nav.php"); ?>

    <h1>Dashboard</h1>

    <div class="container clearfix">
        <a href="/SV-Tora/Structure/Wettkampf/tournament-dashboard.php">
            <div class="tournaments">
                <h3 class="heading">Wettkämpfe</h3>
                <span class="count">25</span>
                <p class="subheading">erfolgreich veranstaltete Wettkämpfe</p>
            </div>
        </a>

        <a href="/SV-Tora/Structure/Personen/persons.php">
            <div class="bar persons clearfix">
                <h3 class="heading">Personen</h3>
                <span class="count">513</span>
            </div>
        </a>

        <a href="/SV-Tora/Structure/Teams/teams.php">
            <div class="bar teams clearfix">
                <h3 class="heading">Teams</h3>
                <span class="count">113</span>
            </div>
        </a>

        <a href="/SV-Tora/Structure/Vereine/clubs.php">
            <div class="bar clubs clearfix">
                <h3 class="heading">Vereine</h3>
                <span class="count">27</span>
            </div>
        </a>
    </div>


    <a class="mail" href="/SV-Tora/Structure/Mail/mail.php">
        <i class="material-icons">mail</i>
        <p>E-Mail schreiben</p>
    </a>

</body>
</html>