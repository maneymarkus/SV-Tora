<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get("/test", function () {
    return view("test");
});

Route::get('/', function () {
    return view('login');
});

Route::get("/dashboard", function () {
    return view("Dashboard.dashboard");
});

Route::get("/mail", function () {
    return view("mail");
});

Route::get("/documents", function () {
    return view("documents");
});

Route::get("/messages", function () {
    return view("messages");
});

Route::get("/settings", function () {
    return view("settings");
});

Route::get("/admin-registration", function () {
    return view("admin-registration");
});

Route::get("/club-acceptance", function () {
    return view("club-acceptance");
});


/**************************************************************
 *      User Routes                                           *
 **************************************************************/

Route::get("/user/settings", function () {
    return view("User.settings");
});


/**************************************************************
 *      Global Settings Routes                                *
 **************************************************************/

Route::get("/settings/tournaments", function () {
    return view("Settings.tournaments");
});

Route::get("/settings/categories", function () {
    return view("Settings.categories");
});


/**************************************************************
 *      Entity Routes                                         *
 **************************************************************/

Route::get("/entities/persons", function () {
    return view("Entities.persons");
});

Route::get("/entities/fighters", function () {
    return view("Entities.fighters");
});

Route::get("/entities/coaches", function () {
    return view("Entities.coaches");
});

Route::get("/entities/referees", function () {
    return view("Entities.referees");
});

Route::get("/entities/helpers", function () {
    return view("Entities.helpers");
});

Route::get("/entities/teams", function () {
    return view("Entities.teams");
});

Route::get("/entities/clubs", function () {
    return view("Entities.clubs");
});

Route::get("/entities/admins", function () {
    return view("Entities.admins");
});


/**************************************************************
 *      Tournament Routes                                     *
 **************************************************************/

Route::get("/tournament/enrollment", function () {
    return view("Tournament.enrollment");
});

Route::get("/tournament/dashboard", function () {
    return view("Tournament.tournament-dashboard");
});

Route::get("/tournament/competition-mode", function () {
    return view("Tournament.competition-mode");
});

Route::get("/tournament/fight-place-administration", function () {
    return view("Tournament.fight-place-administration");
});

Route::get("/tournament/category-fighting-systems", function () {
    return view("Tournament.category-fighting-systems");
});

Route::get("/tournament/category-administration", function () {
    return view("Tournament.category-administration");
});

Route::get("/tournament/time-schedule", function () {
    return view("Tournament.time-schedule");
});

Route::get("/tournament/enroll-entities", function () {
    return view("Tournament.enroll-entities");
});

Route::get("/tournament/fighter-tournament-configuration", function () {
    return view("Tournament.fighter-tournament-configuration");
});

Route::get("/tournament/category/id/split-category", function () {
    return view("Tournament.split-category");
});

Route::get("/tournament/category/id/fighting-system", function () {
    return view("Tournament.fighting-system-map");
});


/**************************************************************
 *      Legal Stuff                                           *
 **************************************************************/

Route::get("/legal-notice", function () {
    return view("legal-notice");
});

Route::get("/data-privacy-statement", function () {
    return view("data-privacy-statement");
});

/*
 * TODO: Check if AGB is needed (or anything else)
 */


/**************************************************************
 *      Miscellaneous                                         *
 **************************************************************/

Route::get("/creator", function () {
    return view("creator");
});
