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

    <main>
        <a class="link" href="{{ url("/tournament/dashboard") }}">zurück</a>
        <h1>Starter</h1>

        @php
          $createCategoryUrl = url("tournaments/" . $tournament->id . "/categories")
        @endphp

        @if($tournament->tournamentTemplate->kihon)
            <h3 class="subheading">Kihon</h3>

        @endif

        <h3 class="subheading">Kata</h3>
        @php
            # All the Kata categories
            $kataCategories = $tournament->categories->where("examination_type", "=", "Kata");
        @endphp

        <div class="accordion">
            @foreach($kataCategories as $category)
                @php
                    $changeCategoryNameUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/name");
                    $printCategoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/print");
                    $splitCategoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/split");
                    $mergeCategoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/merge");
                    $addFightersUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/fighters/add");
                    $deleteCategoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/delete");
                @endphp
                <div class="accordion-bar">
                    <div class="bar-header clearfix">
                        <i class="material-icons open-indicator">keyboard_arrow_down</i>
                        <h4 class="heading">
                            Kategorie:
                            <span class="category-name">{{ $category->name }}</span>
                            (<span class="graduation">{{ $category->graduation }}</span> / <span class="category-age">{{ $category->age_start . "-" . $category->age_end }}</span> / <span class="category-sex">{{ $category->sex }}</span> / <span class="count-members">{{ $category->fighters->count() }}</span>)
                        </h4>
                        <div class="tools">
                            <x-primary-button class="tool print" href="{{ $printCategoryUrl }}" icon-name="print" text="Drucken"></x-primary-button>
                            <x-primary-button class="tool edit" href="{{ $changeCategoryNameUrl }}" icon-name="create" text="Umbenennen"></x-primary-button>
                            <x-primary-button class="tool split" href="{{ $splitCategoryUrl }}" icon-name="call_split" text="Splitten"></x-primary-button>
                            <x-primary-button class="tool merge" href="{{ $mergeCategoryUrl }}" icon-name="merge_type" text="Mergen"></x-primary-button>
                            <x-primary-button class="tool add" href="{{ $addFightersUrl }}" icon-name="add" text="Kämpfer hinzufügen"></x-primary-button>
                            <x-primary-button class="tool delete warning" href="{{ $deleteCategoryUrl }}" icon-name="delete" text="Kategorie löschen"></x-primary-button>
                        </div>
                    </div>
                    <div class="bar-content">
                        @php
                            $fighters = $category->fighters;
                        @endphp
                        <table>
                            @foreach($fighters as $fighter)
                                @php
                                    # TODO
                                    $deleteFighterUrl = url();
                                @endphp
                                <tr>
                                    <td class="number">{{ $loop->iteration }}</td>
                                    <td class="name">{{ $fighter->fighter->person->fullName() }}</td>
                                    <td class="age">{{ $fighter->fighter->age() }}</td>
                                    <td class="sex">{{ $fighter->fighter->sex }}</td>
                                    <td class="graduation">{{ $fighter->fighter->graduation }}</td>
                                    <td class="club">{{ $fighter->fighter->person->club }}</td>
                                    <td class="delete">
                                        <x-primary-button class="delete-fighter warning" href="{{ $deleteCategoryUrl }}" icon-name="delete" text="Kämpfer entfernen"></x-primary-button>
                                    </td>
                                </tr>
                            @endforeach
                        </table>
                    </div>
                </div>
            @endforeach
        </div>

        <x-primary-button class="add-category" href="{{ $createCategoryUrl }}" icon-name="add" text="Kategorie hinzufügen"></x-primary-button>

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

        @if($tournament->tournamentTemplate->teams)
            <h3 class="subheading">Teams</h3>
        @endif

    </main>

@endsection
