<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
    <meta name="keywords" content="" />
    <meta name="description" content="Eine gute Beschreibung von SV Tora e.V." />

    <title>SV-Tora - Wettkämpfe</title>

    <link rel="icon" href="/SV-Tora/images/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="/SV-Tora/style/normalize.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/material-icons.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/general-style.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/tables.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/modal-windows.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/inputs.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/tournaments.css" type="text/css" />

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

    <h1>Wettkämpfe</h1>

    <main class="table-content">
        <a class="button2 add-button tournament-button" href="#"><i class="material-icons">add</i>Wettkampf hinzufügen</a>
        <table class="table">
            <tr>
                <th><span class="column-header">Nr.</span><a class="sort"><i class="material-icons">expand_less</i><i class="material-icons">expand_more</i></a></th>
                <th><span class="column-header">Name</span><a class="sort"><i class="material-icons">expand_less</i><i class="material-icons">expand_more</i></a></th>
                <th><span class="column-header">Alter</span><a class="sort"><i class="material-icons">expand_less</i><i class="material-icons">expand_more</i></a></th>
                <th><span class="column-header">Graduierung</span><a class="sort"><i class="material-icons">expand_less</i><i class="material-icons">expand_more</i></a></th>
                <th><span class="column-header">Teams</span><a class="sort"><i class="material-icons">expand_less</i><i class="material-icons">expand_more</i></a></th>
                <th><span class="column-header">Kihon</span><a class="sort"><i class="material-icons">expand_less</i><i class="material-icons">expand_more</i></a></th>
                <th></th>
            </tr>
            <tr>
                <td>1</td>
                <td>Tora Pokal</td>
                <td>8-16</td>
                <td>7. Kyu - 6. Dan</td>
                <td>Ja</td>
                <td>Nein</td>
                <td><a class="create" href="#"><i class="material-icons">create</i></a><a class="delete" href="#"><i class="material-icons">delete</i></a></td>
            </tr>
            <tr>
                <td>2</td>
                <td>Weihnachtsturnier</td>
                <td>8-16</td>
                <td>7. Kyu - 6. Dan</td>
                <td>Ja</td>
                <td>Nein</td>
                <td><a class="create" href="#"><i class="material-icons">create</i></a><a class="delete" href="#"><i class="material-icons">delete</i></a></td>
            </tr>
            <tr>
                <td>3</td>
                <td>Nachwuchsturnier</td>
                <td>6-12</td>
                <td>9. Kyu - 8. Kyu</td>
                <td>Nein</td>
                <td>Ja</td>
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
                    <label for="tournament-name"><i class="material-icons">person</i></label>
                    <input data-column="Name" class="input text-input" type="text" id="tournament-name" name="tournament-name" placeholder="Wettkampfname" />
                    <span class="underline"></span>
                </span>
            </div>
            <div class="age-2-select row clearfix">
                <p class="label">Alter</p>
                <!-- JavaScript inserts selects automatically -->
            </div>
            <div class="row clearfix">
                <div class="column">
                    <label class="input-container checkbox-input-container">
                        9. Kyu
                        <input data-column="Graduierung" type="checkbox" value="9.Kyu" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container checkbox-input-container">
                        8. Kyu
                        <input data-column="Graduierung" type="checkbox" value="8.Kyu" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container checkbox-input-container">
                        7. Kyu
                        <input data-column="Graduierung" type="checkbox" value="7.Kyu" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container checkbox-input-container">
                        6. Kyu
                        <input data-column="Graduierung" type="checkbox" value="6.Kyu" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container checkbox-input-container">
                        5. Kyu
                        <input data-column="Graduierung" type="checkbox" value="5.Kyu" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container checkbox-input-container">
                        4. Kyu
                        <input data-column="Graduierung" type="checkbox" value="4.Kyu" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container checkbox-input-container">
                        3. Kyu
                        <input data-column="Graduierung" type="checkbox" value="3.Kyu" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container checkbox-input-container">
                        2. Kyu
                        <input data-column="Graduierung" type="checkbox" value="2.Kyu" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container checkbox-input-container">
                        1. Kyu
                        <input data-column="Graduierung" type="checkbox" value="1.Kyu" />
                        <span class="checkmark"></span>
                    </label>
                </div>
                <div class="column">
                    <label class="input-container checkbox-input-container">
                        1. Dan
                        <input data-column="Graduierung" type="checkbox" value="1.Dan" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container checkbox-input-container">
                        2. Dan
                        <input data-column="Graduierung" type="checkbox" value="2.Dan" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container checkbox-input-container">
                        3. Dan
                        <input data-column="Graduierung" type="checkbox" value="3.Dan" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container checkbox-input-container">
                        4. Dan
                        <input data-column="Graduierung" type="checkbox" value="4.Dan" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container checkbox-input-container">
                        5. Dan
                        <input data-column="Graduierung" type="checkbox" value="5.Dan" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container checkbox-input-container">
                        6. Dan
                        <input data-column="Graduierung" type="checkbox" value="6.Dan" />
                        <span class="checkmark"></span>
                    </label>
                </div>
            </div>
            <div class="row clearfix">
                <label class="teams" for="teams">
                    Teams?
                    <br />
                    <span class="switch-container">
                        <input data-column="Teams" type="checkbox" id="teams" name="teams" checked="checked">
                        <span class="switch"></span>
                    </span>
                </label>
                <label class="kihon" for="kihon">
                    Kihon?
                    <br />
                    <span class="switch-container">
                        <input data-column="Kihon" type="checkbox" id="kihon" name="kihon">
                        <span class="switch"></span>
                    </span>
                </label>
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