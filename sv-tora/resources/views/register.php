<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
    <meta name="keywords" content="" />
    <meta name="description" content="Eine gute Beschreibung von SV Tora e.V." />

    <title>SV-Tora - Registrieren</title>

    <link rel="icon" href="/SV-Tora/images/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="/SV-Tora/style/normalize.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/material-icons.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/general-style.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/modal-windows.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/inputs.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/login.css" type="text/css" />

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

    <div class="modal-window login-container">
        <div class="modal-window-header">
            <p>Registrieren</p>
        </div>
        <form class="login" action="Structure/Dashboard/dashboard.php" method="post">
            <div class="row">
                    <span class="text-input-container">
                        <label for="username"><i class="material-icons">person</i></label>
                        <input class="text-input" type="text" id="username" name="username" placeholder="Username" />
                        <span class="underline"></span>
                    </span>
            </div>
            <div class="row">
                    <span class="text-input-container">
                        <label id="password-label" for="password"><i class="material-icons">lock</i></label>
                        <input class="text-input" type="password" id="password" name="password" placeholder="Password" />
                        <span class="underline"></span>
                    </span>
            </div>
            <button type="submit" class="modal-button"><i class="material-icons">arrow_forward</i></button>
        </form>
    </div>

</body>
</html>