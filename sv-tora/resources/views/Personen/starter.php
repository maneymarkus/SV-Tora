<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
    <meta name="keywords" content="" />
    <meta name="description" content="Eine gute Beschreibung von SV Tora e.V." />

    <title>SV-Tora - Starter</title>

    <link rel="icon" href="/SV-Tora/images/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="/SV-Tora/style/normalize.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/material-icons.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/general-style.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/tables.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/modal-windows.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/inputs.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/starter.css" type="text/css" />

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

    <h1>Starter</h1>

    <main class="table-content">
        <a class="button2 add-button tournament-button" href="#"><i class="material-icons">add</i>Starter hinzufügen</a>
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
                <th><span class="column-header">Alter</span><a class="sort"><i class="material-icons">expand_less</i><i class="material-icons">expand_more</i></a></th>
                <th><span class="column-header">Geschlecht</span><a class="sort"><i class="material-icons">expand_less</i><i class="material-icons">expand_more</i></a></th>
                <th><span class="column-header">Graduierung</span><a class="sort"><i class="material-icons">expand_less</i><i class="material-icons">expand_more</i></a></th>
                <th><span class="column-header">Kategorie</span><a class="sort"><i class="material-icons">expand_less</i><i class="material-icons">expand_more</i></a></th>
                <th><span class="column-header">Verein</span><a class="sort"><i class="material-icons">expand_less</i><i class="material-icons">expand_more</i></a></th>
                <th></th>
            </tr>
            <tr>
                <td>1</td>
                <td>Popopopopov</td>
                <td>Marcus</td>
                <td>21</td>
                <td>m?</td>
                <td>6. Dan</td>
                <td>1</td>
                <td>SV Tora</td>
                <td><a class="create" href="#"><i class="material-icons">create</i></a><a class="delete" href="#"><i class="material-icons">delete</i></a></td>
            </tr>
            <tr>
                <td>2</td>
                <td>Popopopopov</td>
                <td>Marcus</td>
                <td>21</td>
                <td>m?</td>
                <td>6. Dan</td>
                <td>1</td>
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
                    <label for="starter-name"><i class="material-icons">person</i></label>
                    <input data-column="Name" class="input text-input" type="text" id="starter-name" name="starter-name" placeholder="Name" />
                    <span class="underline"></span>
                </span>
            </div>
            <div class="row clearfix">
                <span class="input-container text-input-container">
                    <label for="starter-pre-name"><i class="material-icons">person</i></label>
                    <input data-column="Vorname" class="input text-input" type="text" id="starter-pre-name" name="starter-pre-name" placeholder="Vorname" />
                    <span class="underline"></span>
                </span>
            </div>
            <div class="age-select row clearfix">
                <p class="label">Alter</p>
                <!-- JavaScript inserts select automatically -->
                <!-- TODO: Type of data and age input -->
            </div>
            <div class="row clearfix sex">
                <p class="label">Geschlecht</p>
                <label class="input-container radio-input-container">
                    m
                    <input data-column="Geschlecht" type="radio" name="sex" value="m" />
                    <span class="checkmark"></span>
                </label>
                <label class="input-container radio-input-container">
                    w
                    <input data-column="Geschlecht" type="radio" name="sex" value="w" />
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="row clearfix">
                <div class="column">
                    <label class="input-container radio-input-container">
                        9. Kyu
                        <input data-column="Graduierung" type="radio" name="graduation" value="9.Kyu" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container radio-input-container">
                        8. Kyu
                        <input data-column="Graduierung" type="radio" name="graduation" value="8.Kyu" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container radio-input-container">
                        7. Kyu
                        <input data-column="Graduierung" type="radio" name="graduation" value="7.Kyu" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container radio-input-container">
                        6. Kyu
                        <input data-column="Graduierung" type="radio" name="graduation" value="6.Kyu" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container radio-input-container">
                        5. Kyu
                        <input data-column="Graduierung" type="radio" name="graduation" value="5.Kyu" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container radio-input-container">
                        4. Kyu
                        <input data-column="Graduierung" type="radio" name="graduation" value="4.Kyu" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container radio-input-container">
                        3. Kyu
                        <input data-column="Graduierung" type="radio" name="graduation" value="3.Kyu" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container radio-input-container">
                        2. Kyu
                        <input data-column="Graduierung" type="radio" name="graduation" value="2.Kyu" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container radio-input-container">
                        1. Kyu
                        <input data-column="Graduierung" type="radio" name="graduation" value="1.Kyu" />
                        <span class="checkmark"></span>
                    </label>
                </div>
                <div class="column">
                    <label class="input-container radio-input-container">
                        1. Dan
                        <input data-column="Graduierung" type="radio" name="graduation" value="1.Dan" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container radio-input-container">
                        2. Dan
                        <input data-column="Graduierung" type="radio" name="graduation" value="2.Dan" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container radio-input-container">
                        3. Dan
                        <input data-column="Graduierung" type="radio" name="graduation" value="3.Dan" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container radio-input-container">
                        4. Dan
                        <input data-column="Graduierung" type="radio" name="graduation" value="4.Dan" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container radio-input-container">
                        5. Dan
                        <input data-column="Graduierung" type="radio" name="graduation" value="5.Dan" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="input-container radio-input-container">
                        6. Dan
                        <input data-column="Graduierung" type="radio" name="graduation" value="6.Dan" />
                        <span class="checkmark"></span>
                    </label>
                </div>
            </div>
            <div class="category-select row clearfix">
                <p class="label">Kategorie</p>
                <!-- JavaScript inserts select -->
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