<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
    <meta name="keywords" content="" />
    <meta name="description" content="Eine gute Beschreibung von SV Tora e.V." />

    <title>SV-Tora - Wettkampf-Dashboard</title>

    <link rel="icon" href="/SV-Tora/images/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="/SV-Tora/style/normalize.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/material-icons.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/general-style.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/fighting-system.css" type="text/css" />

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

    <div class="single-print">
        <div class="first-row clearfix">
            <div class="info category">
                <h3>5a</h3>
                <hr />
                <p>Kategorie</p>
            </div>
            <div class="info sex">
                <h3>m</h3>
                <hr />
                <p>Geschlecht</p>
            </div>
            <div class="info age">
                <h3>9-10</h3>
                <hr />
                <p>Alter</p>
            </div>
            <div class="info graduation">
                <h3>7. Kyu</h3>
                <hr />
                <p>Graduierung</p>
            </div>
            <div class="info part">
                <h3>Kumite</h3>
                <hr />
                <p></p>
            </div>
            <div class="user-input location">
                <h3></h3>
                <hr />
                <p>Ort</p>
            </div>
            <div class="user-input date">
                <h3></h3>
                <hr />
                <p>Datum</p>
            </div>
        </div>
    </div>

    <a class="print">
        <i class="material-icons">print</i>
        <p>Drucken</p>
    </a>

</body>
</html>