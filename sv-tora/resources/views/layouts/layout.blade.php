@extends("layouts.base-template")

@section("body-content")

    <!-- Navigation component -->
    <x-nav></x-nav>

    <!-- Header component -->
    <x-header></x-header>

    <!-- Shortcuts component -->
    <x-shortcuts></x-shortcuts>

    @yield("content")

@endsection
