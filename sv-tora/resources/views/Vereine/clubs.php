<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
    <meta name="keywords" content="" />
    <meta name="description" content="Eine gute Beschreibung von SV Tora e.V." />

    <title>SV-Tora - Vereine</title>

    <link rel="icon" href="/SV-Tora/images/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="/SV-Tora/style/normalize.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/material-icons.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/general-style.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/tables.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/modal-windows.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/inputs.css" type="text/css" />

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

    <h1>Vereine</h1>

    <main class="table-content">
        <a class="button2 add-button tournament-button" href="#"><i class="material-icons">add</i>Verein hinzufügen</a>
        <table class="table">
            <tr>
                <th><span class="column-header">Nr.</span><a class="sort"><i class="material-icons">expand_less</i><i class="material-icons">expand_more</i></a></th>
                <th><span class="column-header">Name</span><a class="sort"><i class="material-icons">expand_less</i><i class="material-icons">expand_more</i></a></th>
                <th><span class="column-header">Anzahl Mitglieder</span><a class="sort"><i class="material-icons">expand_less</i><i class="material-icons">expand_more</i></a></th>
                <th></th>
            </tr>
            <tr>
                <td>1</td>
                <td>SV Tora</td>
                <td>42</td>
                <td><a class="create" href="#"><i class="material-icons">create</i></a><a class="delete" href="#"><i class="material-icons">delete</i></a></td>
            </tr>
            <tr>
                <td>2</td>
                <td>SV Tora</td>
                <td>13</td>
                <td><a class="create" href="#"><i class="material-icons">create</i></a><a class="delete" href="#"><i class="material-icons">delete</i></a></td>
            </tr>
            <tr>
                <td>3</td>
                <td>SV Tora</td>
                <td>4</td>
                <td><a class="create" href="#"><i class="material-icons">create</i></a><a class="delete" href="#"><i class="material-icons">delete</i></a></td>
            </tr>
            <tr>
                <td>4</td>
                <td>SV Tora</td>
                <td>16</td>
                <td><a class="create" href="#"><i class="material-icons">create</i></a><a class="delete" href="#"><i class="material-icons">delete</i></a></td>
            </tr>
            <tr>
                <td>5</td>
                <td>SV Tora</td>
                <td>23</td>
                <td><a class="create" href="#"><i class="material-icons">create</i></a><a class="delete" href="#"><i class="material-icons">delete</i></a></td>
            </tr>
            <tr>
                <td>6</td>
                <td>SV Tora</td>
                <td>88</td>
                <td><a class="create" href="#"><i class="material-icons">create</i></a><a class="delete" href="#"><i class="material-icons">delete</i></a></td>
            </tr>
            <tr>
                <td>7</td>
                <td>SV Tora</td>
                <td>69</td>
                <td><a class="create" href="#"><i class="material-icons">create</i></a><a class="delete" href="#"><i class="material-icons">delete</i></a></td>
            </tr>
            <tr>
                <td>8</td>
                <td>SV Tora</td>
                <td>420</td>
                <td><a class="create" href="#"><i class="material-icons">create</i></a><a class="delete" href="#"><i class="material-icons">delete</i></a></td>
            </tr>
        </table>
    </main>

    <div class="overlay"></div>

    <div class="modal-window create-edit">
        <div class="modal-window-header">
            <p class="topic"></p>
            <a class="close"><i class="material-icons">close</i></a>
        </div>
        <form class="" action="#" method="post">
            <div class="row">
                <span class="text-input-container">
                    <label for="club-name"><i class="material-icons">person</i></label>
                    <input data-column="Name" class="text-input" type="text" id="club-name" name="club-name" placeholder="Vereinsname" />
                    <span class="underline"></span>
                </span>
            </div>
            <div class="row">
                <span class="text-input-container disabled">
                    <label for="member-count"><i class="material-icons">person</i></label>
                    <input data-column="Anzahl Mitglieder" class="text-input" type="text" id="member-count" name="member-count" placeholder="Anzahl Mitglieder" disabled="disabled" />
                    <span class="underline"></span>
                </span>
            </div>
            <button type="submit" class="modal-button save-button">Speichern</button>
        </form>
    </div>

    <div class="modal-window delete clearfix">
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