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

    <main class="limited">
        <x-tournament-admin-info :tournament="$tournament"></x-tournament-admin-info>

        <a class="link" href="{{ url("/tournaments/" . $tournament->id) }}">zurück</a>
        <h1>Kategorien</h1>
        @if($tournament->categories->count() > 0)
            <div style="text-align: right">
                <x-primary-button target="_blank" class="print-all" href="{{ $printAllCategoriesUrl }}" icon-name="print" text="Alle Kategorien drucken"></x-primary-button>
            </div>
        @endif


        @php
          $createCategoryUrl = url("tournaments/" . $tournament->id . "/categories")
        @endphp

        @if($tournament->tournamentTemplate->kihon)
            <h3 class="subheading">Kihon</h3>
            @php
                # All the Kihon categories
                $kihonCategories = $tournament->categories()->where("examination_type", "=", "Kihon")->orderBy("name")->get();
            @endphp

            <div class="accordion">
                @foreach($kihonCategories as $category)
                    @php
                        $changeCategoryNameUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/name");
                        $printCategoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/print");
                        $splitCategoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/split");
                        $mergeCategoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/merge");
                        $addFightersUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/fighters/add");
                        $deleteCategoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id);
                    @endphp
                    <div class="accordion-bar">
                        <div class="bar-header clearfix">
                            <i class="material-icons open-indicator">keyboard_arrow_down</i>
                            <h4 class="heading">
                                Kategorie:
                                <span class="category-name">{{ $category->name }}</span>
                                (<span class="graduation">{{ $category->graduation_min . "-" . $category->graduation_max }}</span> / <span class="category-age">{{ $category->age_min . "-" . $category->age_max }}</span> / <span class="category-sex">{{ $category->sex }}</span> / <span class="count-members">{{ $category->fighters->count() }}</span>)
                            </h4>
                            <div class="tools">
                                <x-primary-button class="tool print" href="{{ $printCategoryUrl }}" icon-name="print" text="Drucken"></x-primary-button>
                                <x-primary-button class="tool edit" href="{{ $changeCategoryNameUrl }}" icon-name="create" text="Umbenennen"></x-primary-button>
                                <x-primary-button class="tool split" href="{{ $splitCategoryUrl }}" icon-name="call_split" text="Teilen"></x-primary-button>
                                <x-primary-button class="tool merge" href="{{ $mergeCategoryUrl }}" icon-name="merge_type" text="Zusammenführen"></x-primary-button>
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
                                        $deleteFighterUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/fighters/" . $fighter->id);
                                    @endphp
                                    <tr>
                                        <td class="number">{{ $loop->iteration }}</td>
                                        <td class="name">{{ $fighter->fighter->person->fullName() }}</td>
                                        <td class="age">{{ $fighter->fighter->age() }}</td>
                                        <td class="sex">{{ $fighter->fighter->sex }}</td>
                                        <td class="graduation">{{ $fighter->fighter->graduation }}</td>
                                        <td class="club">{{ $fighter->fighter->person->club->name }}</td>
                                        <td class="delete">
                                            <x-primary-button class="delete-fighter warning" href="{{ $deleteFighterUrl }}" icon-name="delete" text="Kämpfer entfernen"></x-primary-button>
                                        </td>
                                    </tr>
                                @endforeach
                            </table>
                        </div>
                    </div>
                @endforeach
            </div>

            <x-primary-button class="add-category" href="{{ $createCategoryUrl }}" icon-name="add" text="Kategorie hinzufügen"></x-primary-button>

        @endif


        <h3 class="subheading">Kata</h3>
        @php
            # All the Kata categories
            $kataCategories = $tournament->categories()->where("examination_type", "=", "Kata")->orderBy("name")->get();
        @endphp

        <div class="accordion">
            @foreach($kataCategories as $category)
                @php
                    $changeCategoryNameUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/name");
                    $printCategoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/print");
                    $splitCategoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/split");
                    $mergeCategoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/merge");
                    $addFightersUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/fighters/add");
                    $deleteCategoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id);
                @endphp
                <div class="accordion-bar">
                    <div class="bar-header clearfix">
                        <i class="material-icons open-indicator">keyboard_arrow_down</i>
                        <h4 class="heading">
                            Kategorie:
                            <span class="category-name">{{ $category->name }}</span>
                            (<span class="graduation">{{ $category->graduation_min . "-" . $category->graduation_max }}</span> / <span class="category-age">{{ $category->age_min . "-" . $category->age_max }}</span> / <span class="category-sex">{{ $category->sex }}</span> / <span class="count-members">{{ $category->fighters->count() }}</span>)
                        </h4>
                        <div class="tools">
                            <x-primary-button class="tool print" href="{{ $printCategoryUrl }}" icon-name="print" text="Drucken"></x-primary-button>
                            <x-primary-button class="tool edit" href="{{ $changeCategoryNameUrl }}" icon-name="create" text="Umbenennen"></x-primary-button>
                            <x-primary-button class="tool split" href="{{ $splitCategoryUrl }}" icon-name="call_split" text="Teilen"></x-primary-button>
                            <x-primary-button class="tool merge" href="{{ $mergeCategoryUrl }}" icon-name="merge_type" text="Zusammenführen"></x-primary-button>
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
                                    $deleteFighterUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/fighters/" . $fighter->id);
                                @endphp
                                <tr>
                                    <td class="number">{{ $loop->iteration }}</td>
                                    <td class="name">{{ $fighter->fighter->person->fullName() }}</td>
                                    <td class="age">{{ $fighter->fighter->age() }}</td>
                                    <td class="sex">{{ $fighter->fighter->sex }}</td>
                                    <td class="graduation">{{ $fighter->fighter->graduation }}</td>
                                    <td class="club">{{ $fighter->fighter->person->club->name }}</td>
                                    <td class="delete">
                                        <x-primary-button class="delete-fighter warning" href="{{ $deleteFighterUrl }}" icon-name="delete" text="Kämpfer entfernen"></x-primary-button>
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
        @php
            # All the Kumite categories
            $kumiteCategories = $tournament->categories()->where("examination_type", "=", "Kumite")->orderBy("name")->get();
        @endphp

        <div class="accordion">
            @foreach($kumiteCategories as $category)
                @php
                    $changeCategoryNameUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/name");
                    $printCategoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/print");
                    $splitCategoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/split");
                    $mergeCategoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/merge");
                    $addFightersUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/fighters/add");
                    $deleteCategoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id);
                @endphp
                <div class="accordion-bar">
                    <div class="bar-header clearfix">
                        <i class="material-icons open-indicator">keyboard_arrow_down</i>
                        <h4 class="heading">
                            Kategorie:
                            <span class="category-name">{{ $category->name }}</span>
                            (<span class="graduation">{{ $category->graduation_min . "-" . $category->graduation_max }}</span> / <span class="category-age">{{ $category->age_min . "-" . $category->age_max }}</span> / <span class="category-sex">{{ $category->sex }}</span> / <span class="count-members">{{ $category->fighters->count() }}</span>)
                        </h4>
                        <div class="tools">
                            <x-primary-button class="tool print" href="{{ $printCategoryUrl }}" icon-name="print" text="Drucken"></x-primary-button>
                            <x-primary-button class="tool edit" href="{{ $changeCategoryNameUrl }}" icon-name="create" text="Umbenennen"></x-primary-button>
                            <x-primary-button class="tool split" href="{{ $splitCategoryUrl }}" icon-name="call_split" text="Teilen"></x-primary-button>
                            <x-primary-button class="tool merge" href="{{ $mergeCategoryUrl }}" icon-name="merge_type" text="Zusammenführen"></x-primary-button>
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
                                    $deleteFighterUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/fighters/" . $fighter->id);
                                @endphp
                                <tr>
                                    <td class="number">{{ $loop->iteration }}</td>
                                    <td class="name">{{ $fighter->fighter->person->fullName() }}</td>
                                    <td class="age">{{ $fighter->fighter->age() }}</td>
                                    <td class="sex">{{ $fighter->fighter->sex }}</td>
                                    <td class="graduation">{{ $fighter->fighter->graduation }}</td>
                                    <td class="club">{{ $fighter->fighter->person->club->name }}</td>
                                    <td class="delete">
                                        <x-primary-button class="delete-fighter warning" href="{{ $deleteFighterUrl }}" icon-name="delete" text="Kämpfer entfernen"></x-primary-button>
                                    </td>
                                </tr>
                            @endforeach
                        </table>
                    </div>
                </div>
            @endforeach
        </div>

        <x-primary-button class="add-category" href="{{ $createCategoryUrl }}" icon-name="add" text="Kategorie hinzufügen"></x-primary-button>


        @if($tournament->tournamentTemplate->team)
            <h3 class="subheading">Team</h3>
            @php
                # All the Team categories
                $teamCategories = $tournament->categories()->where("examination_type", "=", "Team")->orderBy("name")->get();
            @endphp

            <div class="accordion">
                @foreach($teamCategories as $category)
                    @php
                        $changeCategoryNameUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/name");
                        $printCategoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/print");
                        $splitCategoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/split");
                        $mergeCategoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/merge");
                        $addFightersUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/teams/add");
                        $deleteCategoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id);
                    @endphp
                    <div class="accordion-bar">
                        <div class="bar-header clearfix">
                            <i class="material-icons open-indicator">keyboard_arrow_down</i>
                            <h4 class="heading">
                                Kategorie:
                                <span class="category-name">{{ $category->name }}</span>
                                (<span class="graduation">{{ $category->graduation_min . "-" . $category->graduation_max }}</span> / <span class="category-age">{{ $category->age_min . "-" . $category->age_max }}</span> / <span class="category-sex">{{ $category->sex }}</span> / <span class="count-members">{{ $category->teams->count() }}</span>)
                            </h4>
                            <div class="tools">
                                <x-primary-button class="tool print" href="{{ $printCategoryUrl }}" icon-name="print" text="Drucken"></x-primary-button>
                                <x-primary-button class="tool edit" href="{{ $changeCategoryNameUrl }}" icon-name="create" text="Umbenennen"></x-primary-button>
                                <x-primary-button class="tool split" href="{{ $splitCategoryUrl }}" icon-name="call_split" text="Teilen"></x-primary-button>
                                <x-primary-button class="tool merge" href="{{ $mergeCategoryUrl }}" icon-name="merge_type" text="Zusammenführen"></x-primary-button>
                                <x-primary-button class="tool add" href="{{ $addFightersUrl }}" icon-name="add" text="Team hinzufügen"></x-primary-button>
                                <x-primary-button class="tool delete warning" href="{{ $deleteCategoryUrl }}" icon-name="delete" text="Kategorie löschen"></x-primary-button>
                            </div>
                        </div>
                        <div class="bar-content">
                            <table>
                                @foreach($category->teams as $enrolledTeam)
                                    @php
                                        $deleteTeamUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/teams/" . $enrolledTeam->id);
                                    @endphp
                                    <tr>
                                        <td class="number">{{ $loop->iteration }}</td>
                                        <td class="name">{{ $enrolledTeam->team->name }}</td>
                                        <td class="club">{{ $enrolledTeam->team->club->name }}</td>
                                        <td class="members">{{ implode(", ", $enrolledTeam->team->fighters()->get()->map(function ($fighter) {return $fighter->person->first_name . " " . $fighter->person->last_name;})->toArray()) }}</td>
                                        <td class="members"><a class="link" href={{ url("/entities/teams/" . $enrolledTeam->team->id . "/fighters") }}>Team-Übersicht</a></td>
                                        <td class="delete">
                                            <x-primary-button class="delete-fighter warning" href="{{ $deleteTeamUrl }}" icon-name="delete" text="Team entfernen"></x-primary-button>
                                        </td>
                                    </tr>
                                @endforeach
                            </table>
                        </div>
                    </div>
                @endforeach
            </div>

            <x-primary-button class="add-category" href="{{ $createCategoryUrl }}" icon-name="add" text="Kategorie hinzufügen"></x-primary-button>
        @endif

    </main>

@endsection
