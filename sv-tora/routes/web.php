<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClubController;
use App\Http\Controllers\CoachController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\FighterController;
use App\Http\Controllers\FightPlaceController;
use App\Http\Controllers\GlobalSettingController;
use App\Http\Controllers\HelperController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\RefereeController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TournamentController;
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
    $time = \Carbon\Carbon::parse("12:01");

    return json_encode(intval($time->format("i")) === 0);
    #return view("test");
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

    Route::get("/tournament/dashboard", [TournamentController::class, "dashboard"]);

    Route::get("/tournament/enrollment", function () {
        return view("Tournament.enrollment");
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

        Route::get("/mail", [MailController::class, "createMail"]);

        Route::get("/mail/tournament-cancellation-information", [MailController::class, "informClubsAboutTournamentCancellation"]);

        Route::get("/mail/tournament-change-information/{tournament}", [MailController::class, "informClubsAboutTournamentChange"]);

        Route::get("/mail/user-mails/all", [UserController::class, "getMailsFromUsersFromAllClubs"]);

        Route::get("/mail/user-mails/invited", [UserController::class, "getMailsFromUsersFromInvitedClubs"]);

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

        Route::get("/entities/clubs/names", [ClubController::class, "getClubNames"]);

        Route::resource("/entities/clubs", ClubController::class);

        Route::get("/entities/users/{user}/admin/edit", [UserController::class, "editByAdmin"]);

        Route::put("/entities/users/{user}/admin", [UserController::class, "updateByAdmin"]);

        Route::get("/entities/admins", [UserController::class, "indexAdmins"]);

        Route::put("/entities/admins/{admin}/permissions", [UserController::class, "updateAdminPermissions"]);

        Route::delete("/entities/admins/{admin}", [UserController::class, "destroyAdmin"]);


        /**************************************************************
         *      Tournament Routes                                     *
         **************************************************************/

        Route::post("/tournaments/{tournament}/finish", [TournamentController::class, "finishTournament"]);
        Route::get("/tournaments/{tournament}/status", [TournamentController::class, "editTournamentStatus"]);
        Route::post("/tournaments/{tournament}/status", [TournamentController::class, "updateTournamentStatus"]);
        Route::get("/tournaments/{tournament}/clubs/enrolled", [TournamentController::class, "getEnrolledClubs"]);
        Route::get("/tournaments/{tournament}/clubs/excluded", [TournamentController::class, "getExcludedClubs"]);
        Route::post("/tournaments/{tournament}/clubs/exclude", [TournamentController::class, "excludeClub"]);
        Route::post("/tournaments/{tournament}/clubs/include", [TournamentController::class, "includeClub"]);
        Route::resource("/tournaments", TournamentController::class)->except(["index", "show"]);

        Route::get("/tournaments/competition-mode", function () {
            return view("Tournament.competition-mode");
        });

        Route::resource("/tournaments/{tournament}/fight-places", FightPlaceController::class);

        Route::post("/tournaments/{tournament}/clubs/include", [TournamentController::class, "includeClub"]);

        Route::get("/tournaments/{tournament}/category/{category}/split", function () {
            return view("Tournament.split-category");
        });
        Route::post("/tournaments/{tournament}/categories/{category}/name", [CategoryController::class, "updateName"]);
        Route::get("/tournaments/{tournament}/categories/{category}/print", [CategoryController::class, "printCategory"]);
        Route::post("/tournaments/{tournament}/categories/{category}/split", [CategoryController::class, "updateName"]);
        Route::post("/tournaments/{tournament}/categories/{category}/merge", [CategoryController::class, "updateName"]);
        Route::get("/tournaments/{tournament}/categories/{category}/fighters/add", [CategoryController::class, "updateName"]);
        Route::delete("/tournaments/{tournament}/categories/{category}/fighters/{fighter}", [CategoryController::class, "updateName"]);
        Route::resource("/tournaments/{tournament}/categories", CategoryController::class)->except(["show", "edit", "update"]);

        Route::get("/tournaments/category-fighting-systems", function () {
            return view("Tournament.category-fighting-systems");
        });

        Route::get("/tournaments/time-schedule", function () {
            return view("Tournament.time-schedule");
        });

        Route::get("/tournaments/category/{id}/fighting-system", function () {
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
