@extends("layouts.base-template")

@section("body-content")

    <!-- Navigation component -->
    <x-nav></x-nav>

    <!-- Header component -->
    <x-header></x-header>

    @can("admin")
        <!-- Shortcuts component -->
        <x-shortcuts></x-shortcuts>
    @endcan

    @yield("content")

@endsection
