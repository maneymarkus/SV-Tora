<header class="header">
    <a class="menu"><i class="material-icons">menu</i></a>
    <div class="logo"></div>
    <a class="profile"><i class="material-icons">person</i></a>
    <div class="user-profile">
        <div class="user-wrapper">
            <div class="pic-container">
                <img src=" {{ asset("images/Karate_Trainer_Markus_Popov.jpg") }}" />
            </div>
            <p class="username">Marcus PoPopov</p>
            <x-secondary-button class="settings" text="Einstellungen" href="/user/settings"></x-secondary-button>
            <x-secondary-button class="logout accent-1" text="Abmelden"></x-secondary-button>
        </div>
    </div>
</header>
<form id="logout-form" action="{{ route("logout") }}" method="POST" style="display: none;">
    @csrf
</form>
