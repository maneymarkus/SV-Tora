<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
    <meta name="keywords" content="" />
    <meta name="description" content="Eine gute Beschreibung von SV Tora e.V." />

    <title>SV-Tora - Einstellungen</title>

    <link rel="icon" href="/SV-Tora/images/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="/SV-Tora/style/normalize.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/material-icons.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/general-style.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/tables.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/accordion.css" type="text/css" />
    <link rel="stylesheet" href="/SV-Tora/style/categories-settings.css" type="text/css" />

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

    <h1>Kategorien</h1>

    <main class="categories-settings accordion">
        <div class="accordion-bar">
            <div class="accordion-header clearfix">
                <i class="material-icons open-indicator">keyboard_arrow_down</i>
                <h3>Nachwuchsturnier</h3>
                <i class="material-icons open-indicator">keyboard_arrow_down</i>
            </div>
            <div class="accordion-content">
                <a class="edit button2" href="#"><i class="material-icons">create</i></a>
                <h4>Kihon</h4>
                <table class="kihon">
                    <tr>
                        <th rowspan="2">Alter</th>
                        <th colspan="2">9. Kyu</th>
                    </tr>
                    <tr>
                        <td>w</td>
                        <td>m</td>
                    </tr>
                    <tr>
                        <td>6-8</td>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>9-10</td>
                        <td>3</td>
                        <td>4</td>
                    </tr>
                </table>
                <h4>Kata</h4>
                <table class="kata">
                    <tr>
                        <th rowspan="2">Alter</th>
                        <th colspan="2">8. Kyu</th>
                    </tr>
                    <tr>
                        <td>w</td>
                        <td>m</td>
                    </tr>
                    <tr>
                        <td>6-8</td>
                        <td>5</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>9-10</td>
                        <td>7</td>
                        <td>8</td>
                    </tr>
                    <tr>
                        <td>11-12</td>
                        <td>9</td>
                        <td>10</td>
                    </tr>
                </table>
                <h4>Kumite</h4>
                <table class="kumite">
                    <tr>
                        <th rowspan="2">Alter</th>
                        <th colspan="2">8. Kyu</th>
                    </tr>
                    <tr>
                        <td>w</td>
                        <td>m</td>
                    </tr>
                    <tr>
                        <td>6-8</td>
                        <td>11</td>
                        <td>12</td>
                    </tr>
                    <tr>
                        <td>9-10</td>
                        <td>13</td>
                        <td>14</td>
                    </tr>
                    <tr>
                        <td>11-12</td>
                        <td>15</td>
                        <td>16</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="accordion-bar">
            <div class="accordion-header clearfix">
                <i class="material-icons open-indicator">keyboard_arrow_down</i>
                <h3>Tora-Pokal/Weihnachtsturnier</h3>
                <i class="material-icons open-indicator">keyboard_arrow_down</i>
            </div>
            <div class="accordion-content">
                <a class="edit button2" href="#"><i class="material-icons">create</i></a>
                <h4>Kata</h4>
                <table class="kata">
                    <tr>
                        <th rowspan="2">Alter</th>
                        <th colspan="2">7-6. Kyu</th>
                        <th colspan="2">ab 5. Kyu</th>
                    </tr>
                    <tr>
                        <td>m</td>
                        <td>w</td>
                        <td>m</td>
                        <td>w</td>
                    </tr>
                    <tr>
                        <td>8-10</td>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>11-12</td>
                        <td>10</td>
                        <td>11</td>
                        <td>12</td>
                        <td>13</td>
                    </tr>
                    <tr>
                        <td>13-14</td>
                        <td>31</td>
                        <td>32</td>
                        <td>19</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>15-16</td>
                        <td>/</td>
                        <td>/</td>
                        <td>25</td>
                        <td>26</td>
                    </tr>
                </table>
                <h4>Kumite</h4>
                <table class="kumite">
                    <tr>
                        <th rowspan="3">Alter</th>
                        <th>7-6. Kyu</th>
                        <th colspan="2">6. - 4. Kyu</th>
                        <th colspan="2">ab 6. Kyu</th>
                    </tr>
                    <tr>
                        <td>Kihon Ippon Kumite</td>
                        <td colspan="2">Jiyu Ippon Kumite</td>
                        <td colspan="2">Shobu Ippon Kumite</td>
                    </tr>
                    <tr>
                        <td>m/w</td>
                        <td>m</td>
                        <td>w</td>
                        <td>m</td>
                        <td>w</td>
                    </tr>
                    <tr>
                        <td>8-10</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                        <td>8</td>
                        <td>9</td>
                    </tr>
                    <tr>
                        <td>11-12</td>
                        <td>14</td>
                        <td>15</td>
                        <td>16</td>
                        <td>17</td>
                        <td>18</td>
                    </tr>
                    <tr>
                        <td>13-14</td>
                        <td>/</td>
                        <td>21</td>
                        <td>22</td>
                        <td>23</td>
                        <td>24</td>
                    </tr>
                    <tr>
                        <td>15-16</td>
                        <td>/</td>
                        <td>/</td>
                        <td>/</td>
                        <td>27</td>
                        <td>28</td>
                    </tr>
                </table>
                <h4>Mannschaft</h4>
                <table>
                    <tr>
                        <th>Alter</th>
                        <th>Kategorie</th>
                    </tr>
                    <tr>
                        <td>8-11</td>
                        <td>29</td>
                    </tr>
                    <tr>
                        <td>12-16</td>
                        <td>30</td>
                    </tr>
                </table>
            </div>
        </div>
    </main>

</body>
</html>