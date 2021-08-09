<?php

use App\Http\Controllers\ClubController;
use App\Http\Controllers\CoachController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\FighterController;
use App\Http\Controllers\GlobalSettingController;
use App\Http\Controllers\HelperController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\RefereeController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TournamentTemplateController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

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

Route::get("/mailable", function () {
    return new \App\Mail\GenericMail("Betreff", ["kajsdhf@sdfh.de"], "Inhalt");
});

Route::get("/test", function () {
    return view("test");
});


/**************************************************************
 *      Entry Point / Welcome Page                            *
 **************************************************************/

Route::get('/', function () {
    return redirect()->route('login');
});


/**************************************************************
 *      Authentication Routes                                 *
 **************************************************************/

Route::get("/login", [\App\Http\Controllers\AuthenticationController::class, "showLogin"])->name("login");

Route::post("/login", [\App\Http\Controllers\AuthenticationController::class, "login"]);

Route::post("/logout", [\App\Http\Controllers\AuthenticationController::class, "logout"])->name("logout");


/**************************************************************
 *      Registration Routes                                   *
 **************************************************************/

Route::get("/registration/{token}", [RegistrationController::class, "showRegistration"])->name("registration");

Route::post("/registration", [RegistrationController::class, "register"]);

Route::prefix("admin")->group(function () {

    Route::get("/registration/{token}", [RegistrationController::class, "showRegistrationAdmin"])->name("registration");

    Route::post("/registration", [RegistrationController::class, "registerAdmin"]);

});


/**************************************************************
 *      Password Routes                                       *
 **************************************************************/

Route::post("/password/email", [\App\Http\Controllers\PasswordController::class, "sendResetLink"])->name("password.email");

Route::get("/password/reset/{token}", [\App\Http\Controllers\PasswordController::class, "showResetForm"])->name("password.reset");

Route::post("/password/reset", [\App\Http\Controllers\PasswordController::class, "reset"]);


/**************************************************************
 *      Error Routes                                          *
 **************************************************************/

Route::post("/inform-admins-about-no-club", [\App\Http\Controllers\ErrorController::class, "informAdminsAboutNoClub"]);


/**************************************************************
 *      Authenticated Routes                                  *
 **************************************************************/

Route::middleware(["auth:web", "hasClub"])->group(function () {

    Route::get("/dashboard", function () {
        return view("dashboard");
    })->name("dashboard");

    Route::get("/no-club", function () {
        return view("no-club");
    })->withoutMiddleware("hasClub");


    /**************************************************************
     *      User Routes                                           *
     **************************************************************/

    Route::get("/user/settings", function () {
        return view("User.settings");
    })->withoutMiddleware("hasClub");


    /**************************************************************
     *      Registration Invitation Route                         *
     **************************************************************/

    Route::post("/registration/invitation", [RegistrationController::class, "invite"]);


    /**************************************************************
     *      Entity Routes                                         *
     **************************************************************/

    Route::get("/entities/persons", function () {
        return view("Entities.persons");
    });

    Route::resource("/entities/users", UserController::class)->except(["create", "store", "edit"]);

    Route::resource("/entities/fighters", FighterController::class)->except(["show"]);

    Route::resource("/entities/coaches", CoachController::class)->except(["show"]);

    Route::resource("/entities/referees", RefereeController::class)->except(["show"]);

    Route::resource("/entities/helpers", HelperController::class)->except(["show"]);

    Route::resource("/entities/teams", TeamController::class)->except(["show"]);

    Route::get("/entities/teams/{team}/fighters", [TeamController::class, "showFighters"]);

    Route::get("/entities/teams/{team}/fighters/create", [TeamController::class, "addFighters"]);

    Route::get("/entities/teams/{team}/fighters/select", [TeamController::class, "selectFighters"]);

    Route::post("/entities/teams/{team}/fighters", [TeamController::class, "addFightersToTeam"]);

    Route::delete("/entities/teams/{team}/fighters/{fighter}", [TeamController::class, "removeFighter"]);

    Route::get("/entities/clubs/{club}/fighters", [ClubController::class, "showFighters"]);

    Route::get("/entities/clubs/{club}/teams", [ClubController::class, "showTeams"]);


    /**************************************************************
     *      Tournament Routes                                     *
     **************************************************************/

    Route::get("/tournament/enrollment", function () {
        return view("Tournament.enrollment");
    });

    Route::get("/tournament/dashboard", function () {
        return view("Tournament.tournament-dashboard");
    });

    Route::get("/tournament/enroll-entities", function () {
        return view("Tournament.enroll-entities");
    });

    Route::get("/tournament/fighter-tournament-configuration", function () {
        return view("Tournament.fighter-tournament-configuration");
    });


    /**************************************************************
     *      Admin Only Routes                                     *
     **************************************************************/

    Route::middleware("can:admin")->group(function() {


        /**************************************************************
         *      Mail Routes                                           *
         **************************************************************/

        Route::get("/mail", function () {
            return view("mail");
        });

        Route::get("/mail/user-mails/all", [UserController::class, "getMailsFromUsersFromAllClubs"]);

        Route::get("/mail/user-mails/enrolled", [UserController::class, "getMailsFromUsersFromEnrolledClubs"]);

        Route::post("/mail/user-mails/selected", [UserController::class, "getMailsFromUsersFromSelectedClubs"]);

        Route::get("/mail/user-mails/{club}", [UserController::class, "getMailsFromUsersOfClub"]);

        Route::post("/mail", [MailController::class, "sendMail"]);


        /**************************************************************
         *      Document Routes                                       *
         **************************************************************/

        Route::resource("/documents", DocumentController::class)->except(["create", "show", "edit"]);

        Route::get("/documents/{document}/download", [DocumentController::class, "download"]);


        /**************************************************************
         *      Message Routes                                        *
         **************************************************************/

        Route::get("/messages", function () {
            return view("messages");
        });


        /**************************************************************
         *      Registration Invitation Route                         *
         **************************************************************/

        Route::post("/admin/registration/invitation", [RegistrationController::class, "inviteAdmin", [true]]);


        /**************************************************************
         *      Global Settings Routes                                *
         **************************************************************/

        Route::resource("/settings", GlobalSettingController::class)->except(["create", "store", "show", "edit", "destroy"]);

        Route::resource("/settings/tournament-templates", TournamentTemplateController::class)->except(["show"]);

        Route::get("/settings/categories", function () {
            return view("Settings.categories");
        });


        /**************************************************************
         *      Entity Routes                                         *
         **************************************************************/

        Route::resource("/entities/clubs", ClubController::class);

        Route::get("/entities/users/{user}/admin/edit", [UserController::class, "editByAdmin"]);

        Route::put("/entities/users/{user}/admin", [UserController::class, "updateByAdmin"]);

        Route::get("/entities/admins", function () {
            return view("Entities.admins");
        });


        /**************************************************************
         *      Tournament Routes                                     *
         **************************************************************/

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

        Route::get("/tournament/category/{id}/split-category", function () {
            return view("Tournament.split-category");
        });

        Route::get("/tournament/category/{id}/fighting-system", function () {
            return view("Tournament.fighting-system-map");
        });

    });

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
