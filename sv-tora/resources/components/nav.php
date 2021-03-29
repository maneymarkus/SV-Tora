<nav class="nav">
    <div class="nav-head clearfix">
        <a href="/SV-Tora/Structure/Dashboard/dashboard.php" class="home"><i class="material-icons">home</i></a>
        <a class="close"><i class="material-icons">close</i></a>
    </div>
    <p class="breadcrumb"><?php if (isset($folder)) {
        echo $folder." >>";
    } else {
        echo "Dashboard >>";
    } ?></p>
    <ul class="links">
        <li><a href="/SV-Tora/Structure/Wettkampf/tournament-dashboard.php">Wettkämpfe</a></li>
        <li><a href="/SV-Tora/Structure/Personen/persons.php">Personen</a></li>
        <li><a href="/SV-Tora/Structure/Teams/teams.php">Teams</a></li>
        <li><a href="/SV-Tora/Structure/Vereine/clubs.php">Vereine</a></li>
    </ul>
    <div class="logo-container"><img class="logo" src="/SV-Tora/images/SVToraLogo.png" alt="Logo des SV Tora e. V." /></div>
</nav>
