<header class="header">
    <a class="menu header-button"><i class="material-icons">menu</i></a>
    <a class="logo" href="{{ url("/dashboard") }}"></a>
    <a class="profile header-button"><i class="material-icons">person</i></a>
    <div class="user-profile">
        <div class="user-wrapper">
            <p class="username">{{ auth()->user()->name }}</p>
            <x-secondary-button class="settings" text="Einstellungen" href="/user/settings"></x-secondary-button>
            <x-secondary-button class="logout accent-1" text="Abmelden"></x-secondary-button>
        </div>
    </div>
</header>
<form class="no-display" id="logout-form" action="{{ route("logout") }}" method="POST">
    @csrf
</form>
