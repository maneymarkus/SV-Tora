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

        <a class="link" href="{{ url("/tournament/dashboard") }}">zurück</a>

        <h1>Kampfsysteme der Kategorien</h1>

        @if($tournament->tournamentTemplate->kihon)
            <h3 class="subheading">Kihon</h3>
            @php
                # All the Kihon categories
                $kihonCategories = $tournament->categories->where("examination_type", "=", "Kihon");
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
                                    @endphp
                                    <x-primary-button class="print {{ $disabled }}" text="Drucken" icon-name="print"></x-primary-button>
                                    <x-primary-button class="edit-fighting-system {{ $disabled }}" text="Kampfsystem anpassen" icon-name="account_balance"></x-primary-button>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>

        @endif

        <h3 class="subheading">Kata</h3>
        @php
            # All the Kihon categories
            $kataCategories = $tournament->categories->where("examination_type", "=", "Kata");
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
                                @endphp
                                <x-primary-button class="print {{ $disabled }}" text="Drucken" icon-name="print"></x-primary-button>
                                <x-primary-button class="edit-fighting-system {{ $disabled }}" text="Kampfsystem anpassen" icon-name="account_balance"></x-primary-button>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        <h3 class="subheading">Kumite</h3>
        @php
            # All the Kihon categories
            $kumiteCategories = $tournament->categories->where("examination_type", "=", "Kumite");
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
                                @endphp
                                <x-primary-button class="print {{ $disabled }}" text="Drucken" icon-name="print"></x-primary-button>
                                <x-primary-button class="edit-fighting-system {{ $disabled }}" text="Kampfsystem anpassen" icon-name="account_balance"></x-primary-button>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        @if($tournament->tournamentTemplate->team)
            <h3 class="subheading">Team</h3>
            @php
                # All the Kihon categories
                $teamCategories = $tournament->categories->where("examination_type", "=", "Team");
            @endphp

            <div class="accordion">
                @foreach($teamCategories as $category)
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
                                    @endphp
                                    <x-primary-button class="print {{ $disabled }}" text="Drucken" icon-name="print"></x-primary-button>
                                    <x-primary-button class="edit-fighting-system {{ $disabled }}" text="Kampfsystem anpassen" icon-name="account_balance"></x-primary-button>
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
