@php

    $slides = ["KO-System", "Doppel-KO-System", "Tafelsystem", "KO-System mit finalen Tafeln", "Doppel-KO-System mit finalen Tafeln", "Jeder-Gegen-Jeden", "Brasilianisches KO-System"];

    $categories = [
        [
            "name" => "1a",
            "graduation" => "7. Kyu",
            "age" => "9-10",
            "sex" => "m",
            "count_members" => "6",
            "prepared" => true,
            "fighting_system" => "Doppel-KO-System mit finalen Tafeln",
        ],
    ];

@endphp

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
        <a class="link" href="{{ url()->previous("/tournament/dashboard") }}">zurück</a>

        <h1>Kampfsysteme der Kategorie</h1>

        <h3 class="subheading">Kata</h3>
        <div class="accordion">
            @foreach($categories as $category)
                <div class="accordion-bar {{ $category["prepared"] ? "prepared" : NULL }}">
                    <div class="bar-header clearfix">
                        <i class="material-icons open-indicator">keyboard_arrow_down</i>
                        <h4 class="heading">
                            Kategorie:
                            <span class="category-name">{{ $category["name"] }}</span>
                            (<span class="graduation">{{ $category["graduation"] }}</span> / <span class="category-age">{{ $category["age"] }}</span> / <span class="category-sex">{{ $category["sex"] }}</span> / <span class="count-members">{{ $category["count_members"] }}</span>)
                        </h4>
                        @isset($category["prepared"])
                            <i class="material-icons prepared">done</i>
                        @endisset
                    </div>
                    <div class="bar-content clearfix">
                        <div class="side">
                            @if(isset($category["prepared"]))
                                <a class="fighting-system">{{ $category["fighting_system"] }}</a>
                            @else
                                <a class="fighting-system">Kampfsystem wählen...</a>
                            @endif
                        </div>
                        <div class="side">
                            <div class="actions-container">
                                <x-primary-button class="print" text="Drucken" icon-name="print"></x-primary-button>
                                @if(isset($category["prepared"]))
                                    <x-primary-button class="edit-fighting-system" text="Kampfsystem anpassen" icon-name="account_balance"></x-primary-button>
                                @else
                                    <x-primary-button class="edit-fighting-system disabled" text="Kampfsystem anpassen" icon-name="account_balance"></x-primary-button>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        <!-- Delete -->

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
                </div>
                <div class="bar-content">
                    <div class="side">
                        <a class="fighting-system">Kampfsystem wählen...</a>
                    </div>
                    <div class="side">
                        <div class="actions-container">
                            <a class="primary-button print" href="#">
                                <i class="material-icons">print</i>
                                <p>Drucken</p>
                            </a>
                            <a class="primary-button edit-fighting-system disabled" href="#">
                                <i class="material-icons">account_balance</i>
                                <p>Kampfsystem anpassen</p>
                            </a>
                        </div>
                    </div>
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
                </div>
                <div class="bar-content">
                    <div class="side">
                        <a class="fighting-system">Kampfsystem wählen...</a>
                    </div>
                    <div class="side">
                        <div class="actions-container">
                            <a class="primary-button print" href="#">
                                <i class="material-icons">print</i>
                                <p>Drucken</p>
                            </a>
                            <a class="primary-button edit-fighting-system disabled" href="#">
                                <i class="material-icons">account_balance</i>
                                <p>Kampfsystem anpassen</p>
                            </a>
                        </div>
                    </div>
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
                </div>
                <div class="bar-content">
                    <div class="side">
                        <a class="fighting-system">Kampfsystem wählen...</a>
                    </div>
                    <div class="side">
                        <div class="actions-container">
                            <a class="primary-button print" href="#">
                                <i class="material-icons">print</i>
                                <p>Drucken</p>
                            </a>
                            <a class="primary-button edit-fighting-system disabled" href="#">
                                <i class="material-icons">account_balance</i>
                                <p>Kampfsystem anpassen</p>
                            </a>
                        </div>
                    </div>
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
                </div>
                <div class="bar-content">
                    <div class="side">
                        <a class="fighting-system">Kampfsystem wählen...</a>
                    </div>
                    <div class="side">
                        <div class="actions-container">
                            <a class="primary-button print" href="#">
                                <i class="material-icons">print</i>
                                <p>Drucken</p>
                            </a>
                            <a class="primary-button edit-fighting-system disabled" href="#">
                                <i class="material-icons">account_balance</i>
                                <p>Kampfsystem anpassen</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <x-carousel :slides="$slides"></x-carousel>

@endsection
