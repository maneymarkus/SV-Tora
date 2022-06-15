@extends("layouts.layout", ["title" => "Kampfsysteme pro Kategorie"])

@push("styles")
<!-- Specific style -->
<link rel="stylesheet" href="{{ asset("css/sites/category-fighting-systems.css") }}" type="text/css" />
@endpush

@push("scripts")
<!-- Specific scripts -->
<script src="{{ asset("js/sites/category-fighting-systems.js") }}" defer></script>
@endpush

@section("content")

    <main class="limited">
        <x-tournament-admin-info :tournament="$tournament"></x-tournament-admin-info>

        <a class="link" href="{{ url("/tournaments/" . $tournament->id) }}">zurück</a>

        <h1>Kampfsysteme der Kategorien</h1>

        @if($tournament->categories->count() > 0)
            <div style="text-align: right">
                <x-primary-button target="_blank" class="print-all" href="{{ $printAllFightingSystemsUrl }}" icon-name="print" text="Alle Kategorien drucken"></x-primary-button>
            </div>
        @endif

        @if($tournament->tournamentTemplate->kihon)
            <h3 class="subheading">Kihon</h3>
            @php
                # All the Kihon categories
                $kihonCategories = $tournament->categories()->where("examination_type", "=", "Kihon")->orderBy("name")->get();
            @endphp

            <div class="accordion">
                @foreach($kihonCategories as $category)
                    @php
                        $categoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id);
                    @endphp
                    <div class="accordion-bar {{ $category->prepared ? "prepared" : "" }}" data-category-url="{{ $categoryUrl }}">
                        <div class="bar-header clearfix">
                            <i class="material-icons open-indicator">keyboard_arrow_down</i>
                            <h4 class="heading">
                                Kategorie:
                                <span class="category-name">{{ $category->name }}</span>
                                (<span class="graduation">{{ $category->graduation_min . "-" . $category->graduation_max }}</span> / <span class="category-age">{{ $category->age_min . "-" . $category->age_max }}</span> / <span class="category-sex">{{ $category->sex }}</span> / <span class="count-members">{{ $category->fighters->count() }}</span>)
                            </h4>
                            @if($category->prepared)
                                <i class="material-icons prepared">done</i>
                            @endif
                        </div>
                        <div class="bar-content">
                            <div class="side">
                                @if($category->prepared)
                                    <a class="fighting-system">{{ $category->fightingSystem->name }}</a>
                                @else
                                    <a class="fighting-system">Kampfsystem wählen...</a>
                                @endif
                            </div>
                            <div class="side">
                                <div class="actions-container">
                                    @php
                                        $disabled = $category->prepared ? "" : "disabled";
                                        $changeUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/fighting-system/edit");
                                        $printUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/fighting-system/print");
                                    @endphp
                                    <x-primary-button href="{{ $changeUrl }}" class="edit-fighting-system {{ $disabled }}" text="Kampfsystem anpassen" icon-name="account_balance"></x-primary-button>
                                    <x-primary-button href="{{ $printUrl }}" class="print {{ $disabled }}" text="Drucken" icon-name="print"></x-primary-button>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>

        @endif

        <h3 class="subheading">Kata</h3>
        @php
            # All the Kata categories
            $kataCategories = $tournament->categories()->where("examination_type", "=", "Kata")->orderBy("name")->get();
        @endphp

        <div class="accordion">
            @foreach($kataCategories as $category)
                @php
                    $categoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id);
                @endphp
                <div class="accordion-bar {{ $category->prepared ? "prepared" : "" }}" data-category-url="{{ $categoryUrl }}">
                    <div class="bar-header clearfix">
                        <i class="material-icons open-indicator">keyboard_arrow_down</i>
                        <h4 class="heading">
                            Kategorie:
                            <span class="category-name">{{ $category->name }}</span>
                            (<span class="graduation">{{ $category->graduation_min . "-" . $category->graduation_max }}</span> / <span class="category-age">{{ $category->age_min . "-" . $category->age_max }}</span> / <span class="category-sex">{{ $category->sex }}</span> / <span class="count-members">{{ $category->fighters->count() }}</span>)
                        </h4>
                        @if($category->prepared)
                            <i class="material-icons prepared">done</i>
                        @endif
                    </div>
                    <div class="bar-content">
                        <div class="side">
                            @if($category->prepared)
                                <a class="fighting-system">{{ $category->fightingSystem->name }}</a>
                            @else
                                <a class="fighting-system">Kampfsystem wählen...</a>
                            @endif
                        </div>
                        <div class="side">
                            <div class="actions-container">
                                @php
                                    $disabled = $category->prepared ? "" : "disabled";
                                    $changeUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/fighting-system/edit");
                                    $printUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/fighting-system/print");
                                @endphp
                                <x-primary-button href="{{ $changeUrl }}" class="edit-fighting-system {{ $disabled }}" text="Kampfsystem anpassen" icon-name="account_balance"></x-primary-button>
                                <x-primary-button href="{{ $printUrl }}" class="print {{ $disabled }}" text="Drucken" icon-name="print"></x-primary-button>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        <h3 class="subheading">Kumite</h3>
        @php
            # All the Kumite categories
            $kumiteCategories = $tournament->categories()->where("examination_type", "=", "Kumite")->orderBy("name")->get();
        @endphp

        <div class="accordion">
            @foreach($kumiteCategories as $category)
                @php
                    $categoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id);
                @endphp
                <div class="accordion-bar {{ $category->prepared ? "prepared" : "" }}" data-category-url="{{ $categoryUrl }}">
                    <div class="bar-header clearfix">
                        <i class="material-icons open-indicator">keyboard_arrow_down</i>
                        <h4 class="heading">
                            Kategorie:
                            <span class="category-name">{{ $category->name }}</span>
                            (<span class="graduation">{{ $category->graduation_min . "-" . $category->graduation_max }}</span> / <span class="category-age">{{ $category->age_min . "-" . $category->age_max }}</span> / <span class="category-sex">{{ $category->sex }}</span> / <span class="count-members">{{ $category->fighters->count() }}</span>)
                        </h4>
                        @if($category->prepared)
                            <i class="material-icons prepared">done</i>
                        @endif
                    </div>
                    <div class="bar-content">
                        <div class="side">
                            @if($category->prepared)
                                <a class="fighting-system">{{ $category->fightingSystem->name }}</a>
                            @else
                                <a class="fighting-system">Kampfsystem wählen...</a>
                            @endif
                        </div>
                        <div class="side">
                            <div class="actions-container">
                                @php
                                    $disabled = $category->prepared ? "" : "disabled";
                                    $changeUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/fighting-system/edit");
                                    $printUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/fighting-system/print");
                                @endphp
                                <x-primary-button href="{{ $changeUrl }}" class="edit-fighting-system {{ $disabled }}" text="Kampfsystem anpassen" icon-name="account_balance"></x-primary-button>
                                <x-primary-button href="{{ $printUrl }}" class="print {{ $disabled }}" text="Drucken" icon-name="print"></x-primary-button>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        @if($tournament->tournamentTemplate->team)
            <h3 class="subheading">Team</h3>
            @php
                # All the Team categories
                $teamCategories = $tournament->categories()->where("examination_type", "=", "Team")->orderBy("name")->get();
            @endphp

            <div class="accordion">
                @foreach($teamCategories as $category)
                    @php
                        $categoryUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id);
                    @endphp
                    <div class="accordion-bar prepared" data-category-url="{{ $categoryUrl }}">
                        <div class="bar-header clearfix">
                            <i class="material-icons open-indicator">keyboard_arrow_down</i>
                            <h4 class="heading">
                                Kategorie:
                                <span class="category-name">{{ $category->name }}</span>
                                (<span class="graduation">{{ $category->graduation_min . "-" . $category->graduation_max }}</span> / <span class="category-age">{{ $category->age_min . "-" . $category->age_max }}</span> / <span class="category-sex">{{ $category->sex }}</span> / <span class="count-members">{{ $category->teams->count() }}</span>)
                            </h4>
                            <i class="material-icons prepared">done</i>
                        </div>
                        <div class="bar-content">
                            <div class="side">
                                <span class="fighting-system">{{ $category->fightingSystem->name }}</span>
                            </div>
                            <div class="side">
                                <div class="actions-container">
                                    @php
                                        $changeUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/fighting-system/edit");
                                        $printUrl = url("/tournaments/" . $tournament->id . "/categories/" . $category->id . "/fighting-system/print");
                                    @endphp
                                    <x-primary-button href="{{ $changeUrl }}" class="edit-fighting-system" text="Kampfsystem anpassen" icon-name="account_balance"></x-primary-button>
                                    <x-primary-button href="{{ $printUrl }}" class="print" text="Drucken" icon-name="print"></x-primary-button>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>

        @endif

    </main>

    @php
        $slides = \App\Models\FightingSystem::all();
    @endphp
    <x-carousel :slides="$slides"></x-carousel>

@endsection
