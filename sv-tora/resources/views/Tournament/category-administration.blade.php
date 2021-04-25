@extends("layouts.layout", ["title" => "Administration der Kategorien"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/tournament-category-administration.css") }}" type="text/css" />
@endpush

@push("scripts")
<!-- Specific scripts -->
<script src="{{ asset("js/sites/tournament-category-administration.js") }}" defer></script>
@endpush

@section("content")

    {{-- TODO --}}

    <main>
        <h1 class="starter-team">Starter</h1>
        <h3 class="subheading">Kata</h3>
        <div class="accordion">
            <div class="accordion-bar">
                <div class="bar-header clearfix">
                    <i class="material-icons open-indicator">keyboard_arrow_down</i>
                    <h4 class="heading">
                        Kategorie:
                        <span class="category-name">1a</span>
                        (<span class="graduation">7. Kyu</span> / <span class="category-age">9-10</span> / <span class="category-sex">m</span> / <span class="count-members">6</span>)
                    </h4>
                    <div class="tools">
                        <a class="primary-button tool print">
                            <i class="material-icons">print</i>
                            <p>Drucken</p>
                        </a>
                        <a class="primary-button tool edit">
                            <i class="material-icons">create</i>
                            <p>Umbenennen</p>
                        </a>
                        <a class="primary-button tool split" href="#">
                            <i class="material-icons">call_split</i>
                            <p>Splitten</p>
                        </a>
                        <a class="primary-button tool merge">
                            <i class="material-icons">merge_type</i>
                            <p>Mergen</p>
                        </a>
                    </div>
                </div>
                <div class="bar-content">
                    <table>
                        <tr>
                            <td class="number">1</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">2</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">3</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">4</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">5</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">6</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="accordion-bar">
                <div class="bar-header clearfix">
                    <i class="material-icons open-indicator">keyboard_arrow_down</i>
                    <h4 class="heading">
                        Kategorie:
                        <span class="category-name">2</span>
                        (<span class="graduation">7. Kyu</span> / <span class="category-age">9-10</span> / <span class="category-sex">m</span> / <span class="count-members">3</span>)
                    </h4>
                    <div class="tools">
                        <a class="primary-button tool print">
                            <i class="material-icons">print</i>
                            <p>Drucken</p>
                        </a>
                        <a class="primary-button tool edit">
                            <i class="material-icons">create</i>
                            <p>Umbenennen</p>
                        </a>
                        <a class="primary-button tool split" href="#">
                            <i class="material-icons">call_split</i>
                            <p>Splitten</p>
                        </a>
                        <a class="primary-button tool merge">
                            <i class="material-icons">merge_type</i>
                            <p>Mergen</p>
                        </a>
                    </div>
                </div>
                <div class="bar-content">
                    <table>
                        <tr>
                            <td class="number">1</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">2</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">3</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="accordion-bar">
                <div class="bar-header clearfix">
                    <i class="material-icons open-indicator">keyboard_arrow_down</i>
                    <h4 class="heading">
                        Kategorie:
                        <span class="category-name">3</span>
                        (<span class="graduation">7. Kyu</span> / <span class="category-age">9-10</span> / <span class="category-sex">m</span> / <span class="count-members">8</span>)
                    </h4>
                    <div class="tools">
                        <a class="primary-button tool print">
                            <i class="material-icons">print</i>
                            <p>Drucken</p>
                        </a>
                        <a class="primary-button tool edit">
                            <i class="material-icons">create</i>
                            <p>Umbenennen</p>
                        </a>
                        <a class="primary-button tool split" href="#">
                            <i class="material-icons">call_split</i>
                            <p>Splitten</p>
                        </a>
                        <a class="primary-button tool merge">
                            <i class="material-icons">merge_type</i>
                            <p>Mergen</p>
                        </a>
                    </div>
                </div>
                <div class="bar-content">
                    <table>
                        <tr>
                            <td class="number">1</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">2</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">3</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">4</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">5</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">6</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">7</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">8</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="accordion-bar">
                <div class="bar-header clearfix">
                    <i class="material-icons open-indicator">keyboard_arrow_down</i>
                    <h4 class="heading">
                        Kategorie:
                        <span class="category-name">4</span>
                        (<span class="graduation">7. Kyu</span> / <span class="category-age">9-10</span> / <span class="category-sex">m</span> / <span class="count-members">4</span>)
                    </h4>
                    <div class="tools">
                        <a class="primary-button tool print">
                            <i class="material-icons">print</i>
                            <p>Drucken</p>
                        </a>
                        <a class="primary-button tool edit">
                            <i class="material-icons">create</i>
                            <p>Umbenennen</p>
                        </a>
                        <a class="primary-button tool split" href="#">
                            <i class="material-icons">call_split</i>
                            <p>Splitten</p>
                        </a>
                        <a class="primary-button tool merge">
                            <i class="material-icons">merge_type</i>
                            <p>Mergen</p>
                        </a>
                    </div>
                </div>
                <div class="bar-content">
                    <table>
                        <tr>
                            <td class="number">1</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">2</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">3</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">4</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="accordion-bar">
                <div class="bar-header clearfix">
                    <i class="material-icons open-indicator">keyboard_arrow_down</i>
                    <h4 class="heading">
                        Kategorie:
                        <span class="category-name">5b</span>
                        (<span class="graduation">7. Kyu</span> / <span class="category-age">9-10</span> / <span class="category-sex">m</span> / <span class="count-members">7</span>)
                    </h4>
                    <div class="tools">
                        <a class="primary-button tool print">
                            <i class="material-icons">print</i>
                            <p>Drucken</p>
                        </a>
                        <a class="primary-button tool edit">
                            <i class="material-icons">create</i>
                            <p>Umbenennen</p>
                        </a>
                        <a class="primary-button tool split" href="#">
                            <i class="material-icons">call_split</i>
                            <p>Splitten</p>
                        </a>
                        <a class="primary-button tool merge">
                            <i class="material-icons">merge_type</i>
                            <p>Mergen</p>
                        </a>
                    </div>
                </div>
                <div class="bar-content">
                    <table>
                        <tr>
                            <td class="number">1</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">2</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">3</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">4</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">5</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">6</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">7</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="accordion-bar">
                <div class="bar-header clearfix">
                    <i class="material-icons open-indicator">keyboard_arrow_down</i>
                    <h4 class="heading">
                        Kategorie:
                        <span class="category-name">31er</span>
                        (<span class="graduation">7. Kyu</span> / <span class="category-age">9-10</span> / <span class="category-sex">m</span> / <span class="count-members">2</span>)
                    </h4>
                    <div class="tools">
                        <a class="primary-button tool print">
                            <i class="material-icons">print</i>
                            <p>Drucken</p>
                        </a>
                        <a class="primary-button tool edit">
                            <i class="material-icons">create</i>
                            <p>Umbenennen</p>
                        </a>
                        <a class="primary-button tool split" href="#">
                            <i class="material-icons">call_split</i>
                            <p>Splitten</p>
                        </a>
                        <a class="primary-button tool merge">
                            <i class="material-icons">merge_type</i>
                            <p>Mergen</p>
                        </a>
                    </div>
                </div>
                <div class="bar-content">
                    <table>
                        <tr>
                            <td class="number">1</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">2</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

        <h3 class="subheading">Kumite</h3>
        <div class="accordion">
            <div class="accordion-bar">
                <div class="bar-header clearfix">
                    <i class="material-icons open-indicator">keyboard_arrow_down</i>
                    <h4 class="heading">
                        Kategorie:
                        <span class="category-name">7</span>
                        (<span class="graduation">7. Kyu</span> / <span class="category-age">9-10</span> / <span class="category-sex">m</span> / <span class="count-members">8</span>)
                    </h4>
                    <div class="tools">
                        <a class="primary-button tool print">
                            <i class="material-icons">print</i>
                            <p>Drucken</p>
                        </a>
                        <a class="primary-button tool edit">
                            <i class="material-icons">create</i>
                            <p>Umbenennen</p>
                        </a>
                        <a class="primary-button tool split" href="#">
                            <i class="material-icons">call_split</i>
                            <p>Splitten</p>
                        </a>
                        <a class="primary-button tool merge">
                            <i class="material-icons">merge_type</i>
                            <p>Mergen</p>
                        </a>
                    </div>
                </div>
                <div class="bar-content">
                    <table>
                        <tr>
                            <td class="number">1</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">2</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">3</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">4</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">5</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">6</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">7</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">8</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="accordion-bar">
                <div class="bar-header clearfix">
                    <i class="material-icons open-indicator">keyboard_arrow_down</i>
                    <h4 class="heading">
                        Kategorie:
                        <span class="category-name">8</span>
                        (<span class="graduation">7. Kyu</span> / <span class="category-age">9-10</span> / <span class="category-sex">m</span> / <span class="count-members">8</span>)
                    </h4>
                    <div class="tools">
                        <a class="primary-button tool print">
                            <i class="material-icons">print</i>
                            <p>Drucken</p>
                        </a>
                        <a class="primary-button tool edit">
                            <i class="material-icons">create</i>
                            <p>Umbenennen</p>
                        </a>
                        <a class="primary-button tool split" href="#">
                            <i class="material-icons">call_split</i>
                            <p>Splitten</p>
                        </a>
                        <a class="primary-button tool merge">
                            <i class="material-icons">merge_type</i>
                            <p>Mergen</p>
                        </a>
                    </div>
                </div>
                <div class="bar-content">
                    <table>
                        <tr>
                            <td class="number">1</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">2</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">3</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">4</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">5</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">6</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">7</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">8</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="accordion-bar">
                <div class="bar-header clearfix">
                    <i class="material-icons open-indicator">keyboard_arrow_down</i>
                    <h4 class="heading">
                        Kategorie:
                        <span class="category-name">9</span>
                        (<span class="graduation">7. Kyu</span> / <span class="category-age">9-10</span> / <span class="category-sex">m</span> / <span class="count-members">3</span>)
                    </h4>
                    <div class="tools">
                        <a class="primary-button tool print">
                            <i class="material-icons">print</i>
                            <p>Drucken</p>
                        </a>
                        <a class="primary-button tool edit">
                            <i class="material-icons">create</i>
                            <p>Umbenennen</p>
                        </a>
                        <a class="primary-button tool split" href="#">
                            <i class="material-icons">call_split</i>
                            <p>Splitten</p>
                        </a>
                        <a class="primary-button tool merge">
                            <i class="material-icons">merge_type</i>
                            <p>Mergen</p>
                        </a>
                    </div>
                </div>
                <div class="bar-content">
                    <table>
                        <tr>
                            <td class="number">1</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">2</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">3</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="accordion-bar">
                <div class="bar-header clearfix">
                    <i class="material-icons open-indicator">keyboard_arrow_down</i>
                    <h4 class="heading">
                        Kategorie:
                        <span class="category-name">10</span>
                        (<span class="graduation">7. Kyu</span> / <span class="category-age">9-10</span> / <span class="category-sex">m</span> / <span class="count-members">2</span>)
                    </h4>
                    <div class="tools">
                        <a class="primary-button tool print">
                            <i class="material-icons">print</i>
                            <p>Drucken</p>
                        </a>
                        <a class="primary-button tool edit">
                            <i class="material-icons">create</i>
                            <p>Umbenennen</p>
                        </a>
                        <a class="primary-button tool split" href="#">
                            <i class="material-icons">call_split</i>
                            <p>Splitten</p>
                        </a>
                        <a class="primary-button tool merge">
                            <i class="material-icons">merge_type</i>
                            <p>Mergen</p>
                        </a>
                    </div>
                </div>
                <div class="bar-content">
                    <table>
                        <tr>
                            <td class="number">1</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                        <tr>
                            <td class="number">2</td>
                            <td class="name">Marcus Popov</td>
                            <td class="age">16</td>
                            <td class="sex">m</td>
                            <td class="graduation">1.Kyu</td>
                            <td class="club">SV Tora</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </main>

@endsection
