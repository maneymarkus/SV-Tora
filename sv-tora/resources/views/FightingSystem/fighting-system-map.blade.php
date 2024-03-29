@extends("layouts.base-template", ["title" => "Kampfsystem-Übersicht"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/fighting-system-map.css") }}" type="text/css" />
@endpush

@push("scripts")
<!-- Specific scripts -->
<script src="{{ asset("js/sites/fighting-system-map.js") }}" defer></script>
@endpush

@section("body-content")

    <a class="go-back" href="{{ url("/tournaments/" . $tournament->id . "/category-fighting-systems") }}">
        <i class="material-icons">arrow_back</i>
    </a>

    <div class="meta-info">
        <div class="chunk category">
            <span class="value">5a</span>
            <hr class="separator" />
            <span class="key">Kategorie</span>
        </div>
        <div class="chunk sex">
            <span class="value">m</span>
            <hr class="separator" />
            <span class="key">Geschlecht</span>
        </div>
        <div class="chunk main">
            <span class="value">Kumite</span>
            <hr class="separator" />
            <span class="key"></span>
        </div>
        <div class="chunk age">
            <span class="value">9-10</span>
            <hr class="separator" />
            <span class="key">Alter</span>
        </div>
        <div class="chunk graduation">
            <span class="value">7. Kyu</span>
            <hr class="separator" />
            <span class="key">Graduierung</span>
        </div>
    </div>

    <div class="fighting-system-name">
        Doppel-KO-System mit finalen Tafeln
    </div>

    <main class="map-container no-scrollbar">

        <div class="map">

            <div class="primary-button-floating-container map-controls">
                <a class="primary-button increase">
                    <i class="material-icons">add</i>
                    <p>Vergrößern</p>
                </a>
                <a class="primary-button decrease">
                    <i class="material-icons">remove</i>
                    <p>Verkleinern</p>
                </a>
                <a class="primary-button print" href="#">
                    <i class="material-icons">print</i>
                    <p>Drucken</p>
                </a>
            </div>

            <div class="tree clearfix">
                <div class="column">
                    <div class="fight">
                        <span class="fighter fighter1 filled">Marcus</span>
                        <span class="fighter">Markus</span>
                        <span class="fight-number">1</span>
                    </div>
                    <div class="fight">
                        <span class="fighter">Marcus</span>
                        <span class="fighter">Markus</span>
                        <span class="fight-number">2</span>
                    </div>
                    <div class="fight">
                        <span class="fighter">Marcus</span>
                        <span class="fighter">Markus</span>
                        <span class="fight-number">3</span>
                    </div>
                    <div class="fight">
                        <span class="fighter">Marcus</span>
                        <span class="fighter">Markus</span>
                        <span class="fight-number">4</span>
                    </div>
                    <div class="fight">
                        <span class="fighter">Marcus</span>
                        <span class="fighter">Markus</span>
                        <span class="fight-number">5</span>
                    </div>
                    <div class="fight">
                        <span class="fighter">Marcus</span>
                        <span class="fighter">Markus</span>
                        <span class="fight-number">6</span>
                    </div>
                    <div class="fight">
                        <span class="fighter">Marcus</span>
                        <span class="fighter">Markus</span>
                        <span class="fight-number">7</span>
                    </div>
                    <div class="fight">
                        <span class="fighter">Marcus</span>
                        <span class="fighter">Markus</span>
                        <span class="fight-number">8</span>
                    </div>
                </div>
                <div class="column">
                    <div class="fight">
                        <span class="fighter"></span>
                        <span class="fighter"></span>
                        <span class="fight-number">9</span>
                    </div>
                    <div class="fight">
                        <span class="fighter"></span>
                        <span class="fighter"></span>
                        <span class="fight-number">10</span>
                    </div>
                    <div class="fight">
                        <span class="fighter"></span>
                        <span class="fighter"></span>
                        <span class="fight-number">11</span>
                    </div>
                    <div class="fight">
                        <span class="fighter"></span>
                        <span class="fighter"></span>
                        <span class="fight-number">12</span>
                    </div>
                </div>
                <div class="column">
                    <div class="fight">
                        <span class="fighter"></span>
                        <span class="fighter"></span>
                        <span class="fight-number">13</span>
                    </div>
                    <div class="fight">
                        <span class="fighter"></span>
                        <span class="fighter"></span>
                        <span class="fight-number">14</span>
                    </div>
                </div>
                <div class="column">
                    <div class="fight">
                        <span class="fighter"></span>
                        <span class="fighter"></span>
                        <span class="fight-number">15</span>
                    </div>
                </div>
                <div class="column">
                    <div class="fight winner">
                        <span class="fighter last"></span>
                    </div>
                </div>
            </div>

            <div class="winners">
                <span class="first">Markus<span class="origin">(Gewinner aus Kampf 15)</span></span>
                <span class="second">Markus<span class="origin">(Verlierer aus Kampf 15)</span></span>
                <span class="third">Marcus<span class="origin">(Gewinner aus Kampf 16)</span></span>
            </div>

            <div class="tafeln">
                <table>
                    <thead>
                    <tr>
                        <th>Teilnehmer</th>
                        <th class="points">1</th>
                        <th class="points">2</th>
                        <th class="points">3</th>
                        <th class="points">4</th>
                        <th class="points">5</th>
                        <th class="points">6</th>
                        <th class="points">7</th>
                        <th class="points">Gesamt</th>
                        <th>Platzierung</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Markus</td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"></td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Marcus</td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Flori</td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Jörg</td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Meister</td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>The Rock</td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="dog-eat-dog clearfix">
                <table class="participants">
                    <thead>
                    <tr>
                        <th>Teilnehmer</th>
                        <th>Gewonnen</th>
                        <th>Verloren</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Markus</td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                    </tr>
                    <tr>
                        <td>Marcus</td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                    </tr>
                    <tr>
                        <td>Flori</td>
                        <td class="points"><input type="text" /></td>
                        <td class="points"><input type="text" /></td>
                    </tr>
                    </tbody>
                </table>
                <div class="fight-order">
                    <div class="fight">
                        <span class="fighter">Markus</span>
                        <span class="number">1.</span>
                        <span class="fighter">Marcus</span>
                    </div>
                    <div class="fight">
                        <span class="fighter">Markus</span>
                        <span class="number">2.</span>
                        <span class="fighter">Flori</span>
                    </div>
                    <div class="fight">
                        <span class="fighter">Marcus</span>
                        <span class="number">3.</span>
                        <span class="fighter">Flori</span>
                    </div>
                </div>
            </div>

        </div>

    </main>

@endsection
