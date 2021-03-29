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
    <link rel="stylesheet" href="/SV-Tora/style/modal-windows.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/inputs.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/tournament-dashboard.css" type="text/css" />

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

    <main class="no-tournament">
        <h1>Zur Zeit findet kein Wettkampf statt.</h1>
        <a class="host-tournament">
            <i class="material-icons">add</i>
            <p>Wettkampf erstellen</p>
        </a>
    </main>

    <main class="tournament-dashboard hide clearfix">
        <!-- TODO: update status with php and javascript -->
        <h1>Status: <span class="status"></span></h1>
        <a class="cancel-tournament"><i class="material-icons">close</i></a>
        <div class="column-left">
            <div class="graduation-container">
                <h3>Graduierungen:</h3>
                <p class="graduations">7. Kyu - 6. Damn</p>
            </div>
            <a class="categories" href="/SV-Tora/Structure/Wettkampf/team-or-starter.php">
                Kategorien
            </a>
        </div>
        <div class="tournament-container">
            <div class="standard">
                <h3 class="tournament-name"></h3>
                <p>am</p>
                <p><span class="tournament-date"></span>um<span class="tournament-time"></span></p>
                <p class="more-spacing">Anmeldezeitraum:</p>
                <p><span class="enrollment-start"></span> - <span class="enrollment-end"></span></p>
            </div>
            <div class="on-hover change-tournament-properties">
                <a class="change-tournament">Wettkampf ändern</a>
                <span class="divider"></span>
                <a class="change-date-time">Datum/Zeit ändern</a>
                <span class="divider"></span>
                <a class="change-enrollment-period">Anmeldezeitraum ändern</a>
            </div>
        </div>
        <a class="fight button2" href="/SV-Tora/Structure/Wettkampf/fight.php">
            <i class="material-icons">error</i>
            <p>Kämpfen!</p>
        </a>
        <div class="enrolled-persons-container clearfix">
            <!-- TODO: just for clubs -->
            <p class="club-info"><span class="tournament-name">Tora-Pokal</span>am<span class="tournament-date">24.04.2020</span>um<span class="tournament-time">14</span>Uhr</p>
            <h3>Angemeldet:</h3>
            <div class="persons circle">
                <div class="share starter">
                    <span class="type">Starter</span>
                    <span class="enrolled">35</span>
                    <a class="add add-starter" href="#"><i class="material-icons">settings</i></a>
                </div>
                <div class="share coaches">
                    <span class="type">Coaches</span>
                    <span class="enrolled">7</span>
                    <a class="add add-coach" href="#"><i class="material-icons">settings</i></a>
                </div>
                <div class="share referees">
                    <span class="type">Kampfrichter</span>
                    <span class="enrolled">3</span>
                    <a class="add add-referee" href="#"><i class="material-icons">settings</i></a>
                </div>
                <div class="share helper">
                    <span class="type">Helfer</span>
                    <span class="enrolled">5</span>
                    <a class="add add-helper" href="#"><i class="material-icons">settings</i></a>
                </div>
            </div>
            <div class="teams circle">
                <span class="type">Teams</span>
                <span class="enrolled">15</span>
                <a class="add add-team" href="#"><i class="material-icons">settings</i></a>
            </div>
        </div>
        <!-- TODO: just for clubs -->
        <div class="club-card person-card">
            <h3>Personen</h3>
            <div class="registered-content clearfix">
                <span class="number-registered-persons">13</span>
                <p>registrierte Personen</p>
            </div>
            <div class="footer clearfix">
                <a class="register" href="#">Person registrieren</a>
                <span class="divider"></span>
                <a class="administer" href="#">Personen verwalten</a>
            </div>
        </div>
        <div class="club-card team-card">
            <h3>Teams</h3>
            <div class="registered-content clearfix">
                <span class="number-registered-persons">7</span>
                <p>registrierte Teams</p>
            </div>
            <div class="footer clearfix">
                <a class="register" href="#">Team registrieren</a>
                <span class="divider"></span>
                <a class="administer" href="#">Teams verwalten</a>
            </div>
        </div>
    </main>

    <div class="overlay"></div>

    <div class="modal-window create">
        <div class="modal-window-header">
            <p class="topic"></p>
            <a class="close"><i class="material-icons">close</i></a>
        </div>
        <form class="" action="#" method="post">
            <div class="tournament row">
                <p class="label">Wettkampf</p>
                <!-- Insert select -->
            </div>
            <div class="row">
                <p class="label">Datum</p>
                <span class="input-container tournament-date date-input-container">
                    <label for="date"><i class="material-icons">today</i></label>
                    <input data-column="Datum" class="date-input" type="text" id="date" name="date" placeholder="Datum" />
                    <span class="underline"></span>
                </span>
            </div>
            <div class="row">
                <p class="label">Uhrzeit</p>
                <span class="input-container tournament-time time-input-container">
                    <label for="time"><i class="material-icons">schedule</i></label>
                    <input data-column="Zeit" class="time-input" type="text" id="time" name="time" placeholder="Zeit" />
                    <span class="underline"></span>
                </span>
            </div>
            <div class="enrollment-period row clearfix">
                <p class="label">Anmeldezeitraum</p>
                <span class="input-container start-container date-input-container">
                    <label for="startdate"><i class="material-icons">today</i></label>
                    <input data-column="Startdatum" class="date-input" type="text" id="startdate" name="startdate" placeholder="Startdatum" />
                    <span class="underline"></span>
                </span>
                <span class="to">-</span>
                <span class="input-container end-container date-input-container">
                    <label for="enddate"><i class="material-icons">today</i></label>
                    <input data-column="Enddatum" class="date-input" type="text" id="enddate" name="enddate" placeholder="Enddatum" />
                    <span class="underline"></span>
                </span>
            </div>
            <button type="submit" class="modal-button save-button">Speichern</button>
        </form>
    </div>

    <div class="modal-window delete">
        <div class="modal-window-header">
            <p class="topic"></p>
            <a class="close"><i class="material-icons">close</i></a>
        </div>
        <p class="info">Willst du <span class="name"></span> wirklich löschen?</p>
        <a class="delete modal-button">Löschen</a>
        <a class="cancel modal-button">Abbrechen</a>
    </div>

</body>
</html>