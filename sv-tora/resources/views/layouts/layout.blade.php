@extends("layouts.base-template")

@section("body-content")

    @auth
        <!-- Navigation component -->
        <x-nav></x-nav>
    @endauth

    <!-- Header component -->
    <x-header></x-header>

    @auth
        @can("admin")
            <!-- Shortcuts component -->
            <x-shortcuts></x-shortcuts>
        @endcan
    @endauth

    @yield("content")

@endsection
