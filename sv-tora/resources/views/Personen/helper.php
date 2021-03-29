<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
    <meta name="keywords" content="" />
    <meta name="description" content="Eine gute Beschreibung von SV Tora e.V." />

    <title>SV-Tora - Helfer</title>

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

    <h1>Helfer</h1>

    <main class="table-content">
        <a class="button2 add-button tournament-button" href="#"><i class="material-icons">add</i>Helfer hinzufügen</a>
        <div class="filter clearfix">
            <p>Filter:</p>
            <div class="chosen-filters">
            </div>
            <a class="button1 add-filter"><i class="material-icons">filter_list</i>Filter hinzufügen</a>
        </div>
        <table class="table">
            <tr>
                <th><span class="column-header">Nr.</span><a class="sort"><i class="material-icons">expand_less</i><i class="material-icons">expand_more</i></a></th>
                <th><span class="column-header">Name</span><a class="sort"><i class="material-icons">expand_less</i><i class="material-icons">expand_more</i></a></th>
                <th><span class="column-header">Vorname</span><a class="sort"><i class="material-icons">expand_less</i><i class="material-icons">expand_more</i></a></th>
                <th><span class="column-header">Verein</span><a class="sort"><i class="material-icons">expand_less</i><i class="material-icons">expand_more</i></a></th>
                <th></th>
            </tr>
            <tr>
                <td>1</td>
                <td>Städler</td>
                <td>Markus</td>
                <td>SV Tora</td>
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
                <span class="input-container text-input-container">
                    <label for="helper-name"><i class="material-icons">person</i></label>
                    <input data-column="Name" class="text-input" type="text" id="helper-name" name="helper-name" placeholder="Name" />
                    <span class="underline"></span>
                </span>
            </div>
            <div class="row">
                <span class="input-container text-input-container">
                    <label for="helper-pre-name"><i class="material-icons">person</i></label>
                    <input data-column="Vorname" class="text-input" type="text" id="helper-pre-name" name="helper-pre-name" placeholder="Vorname" />
                    <span class="underline"></span>
                </span>
            </div>
            <div class="club-select row clearfix">
                <p class="label">Verein</p>
                <!-- JavaScript inserts select -->
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

    <div class="modal-window filter-modal">
        <div class="modal-window-header">
            <p class="topic"></p>
            <a class="close"><i class="material-icons">close</i></a>
        </div>
        <form class="" action="#" method="post">
            <div class="row clearfix">
                <p class="label">Filter</p>

            </div>
            <button type="submit" class="modal-button save-button">Filtern</button>
        </form>
    </div>

</body>
</html>