<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
    <meta name="keywords" content="" />
    <meta name="description" content="Eine gute Beschreibung von SV Tora e.V." />

    <title>SV-Tora - Mail</title>

    <link rel="icon" href="/SV-Tora/images/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="/SV-Tora/style/normalize.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/material-icons.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/general-style.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/modal-windows.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/inputs.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/mail.css" type="text/css" />

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
<body class="darkmode">

    <?php $folder = basename(__DIR__) ?>

    <?php include($_SERVER["DOCUMENT_ROOT"] . "/SV-Tora/components/header.php"); ?>
    <?php include($_SERVER["DOCUMENT_ROOT"] . "/SV-Tora/components/nav.php"); ?>

    <form class="mail-content">
        <h3>Wem willst du schreiben?</h3>
        <div class="container receiver clearfix">
            <label class="radio-input-container">
                Alle
                <input type="radio" name="receiver" value="all" />
                <span class="checkmark"></span>
            </label>
            <br />
            <label class="radio-input-container">
                Angemeldete Vereine zum aktuellen Wettkampf
                <input type="radio" name="receiver" value="only-enrolled" />
                <span class="checkmark"></span>
            </label>
            <br />
            <label class="radio-input-container">
                Ausgewählten Vereinen
                <input type="radio" name="receiver" value="chosen" />
                <span class="checkmark"></span>
            </label>
            <br />
            <div class="chosen-clubs">

            </div>
            <a href="#" class="disabled button1 choose-clubs">Auswählen</a>
        </div>
        <h3>Worum geht's?</h3>
        <div class="container">
            <span class="text-input-container">
                <label for="subject"><i class="material-icons">person</i></label>
                <input class="text-input" type="text" id="subject" name="subject" placeholder="Betreff" />
                <span class="underline"></span>
            </span>
        </div>
        <h3>Was willst du genau mitteilen?</h3>
        <div class="container">
            <textarea placeholder="Deine Nachricht..."></textarea>
        </div>
        <h3>Senden?</h3>
        <div class="container clearfix">
            <a class="send button2" href="#">
                <i class="material-icons">mail</i>
                <p>Senden!</p>
            </a>
            <a class="cancel button2" href="/SV-Tora/Structure/Dashboard/dashboard.php">
                <i class="material-icons">close</i>
                <p>Abbrechen</p>
            </a>
        </div>
    </form>

    <div class="overlay"></div>

    <div class="modal-window choose-clubs-modal">
        <div class="modal-window-header">
            <p class="topic">Vereine auswählen</p>
            <a class="close"><i class="material-icons">close</i></a>
        </div>
        <form class="" action="#" method="post">
            <div class="all-clubs">

            </div>
            <button type="submit" class="modal-button choose-button">Auswählen</button>
        </form>
    </div>

</body>
</html>