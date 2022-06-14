<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClubController;
use App\Http\Controllers\CoachController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\EnrolledCoachController;
use App\Http\Controllers\EnrolledFighterController;
use App\Http\Controllers\EnrolledDeskSupporterController;
use App\Http\Controllers\EnrolledRefereeController;
use App\Http\Controllers\EnrolledTeamController;
use App\Http\Controllers\ErrorController;
use App\Http\Controllers\FighterController;
use App\Http\Controllers\FightingSystemController;
use App\Http\Controllers\FightPlaceController;
use App\Http\Controllers\GlobalSettingController;
use App\Http\Controllers\DeskSupporterController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\RefereeController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TournamentController;
use App\Http\Controllers\TournamentTemplateController;
use App\Http\Controllers\UserController;
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

Route::get("/mailable", function () {
    return new \App\Mail\TournamentInvitationMail(\App\Models\Tournament::find(1), "Subjekt", "Wichtiger Inhalt");
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

Route::get("/login", [AuthenticationController::class, "showLogin"])->name("login");
Route::post("/login", [AuthenticationController::class, "login"]);
Route::post("/logout", [AuthenticationController::class, "logout"])->name("logout");


/**************************************************************
 *      Registration Routes                                   *
 **************************************************************/

Route::get("/registration/{token}", [RegistrationController::class, "showRegistration"])->name("registration");
Route::post("/registration", [RegistrationController::class, "register"]);
Route::prefix("admin")->group(function () {
    Route::get("/registration/{token}", [RegistrationController::class, "showRegistrationAdmin"])->name("admin-registration");
    Route::post("/registration", [RegistrationController::class, "registerAdmin"]);
});


/**************************************************************
 *      Password Routes                                       *
 **************************************************************/

Route::post("/password/email", [PasswordController::class, "sendResetLink"])->name("password.email");
Route::get("/password/reset/{token}", [PasswordController::class, "showResetForm"])->name("password.reset");
Route::post("/password/reset", [PasswordController::class, "reset"]);


/**************************************************************
 *      Error Routes                                          *
 **************************************************************/

Route::post("/inform-admins-about-no-club", [ErrorController::class, "informAdminsAboutNoClub"]);


/**************************************************************
 *      Authenticated Routes                                  *
 **************************************************************/

Route::middleware(["auth:web", "hasClub"])->group(function () {

    Route::get("/dashboard", function () {
        $personCount = \App\Models\Person::all()->count();
        $teamCount = \App\Models\Team::all()->count();
        $clubCount = \App\Models\Club::all()->count();
        if (!\Illuminate\Support\Facades\Auth::user()->isAdmin()) {
            $ownClub = \Illuminate\Support\Facades\Auth::user()->club;
            $personCount = \App\Models\Person::where("club_id", "=", $ownClub->id)->get()->count();
            $teamCount = \App\Models\Team::where("club_id", "=", $ownClub->id)->get()->count();
        }
        return view("dashboard", ["personCount" => $personCount, "teamCount" => $teamCount, "clubCount" => $clubCount]);
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

    Route::put("/entities/users/{user}/password", [UserController::class, "updatePassword"]);
    Route::put("/entities/users/{user}", [UserController::class, "update"]);


    /**************************************************************
     *      Registration Invitation Route                         *
     **************************************************************/

    Route::post("/registration/invitation", [RegistrationController::class, "invite"]);


    /**************************************************************
     *      Entity Routes                                         *
     **************************************************************/

    Route::get("/entities/people", function () {
        return view("Entities.people");
    });

    Route::resource("/entities/fighters", FighterController::class)->except(["show"]);
    Route::resource("/entities/coaches", CoachController::class)->except(["show"]);
    Route::resource("/entities/referees", RefereeController::class)->except(["show"]);
    Route::resource("/entities/desk-supporters", DeskSupporterController::class)->except(["show"]);

    Route::get("/entities/teams/{team}/fighters", [TeamController::class, "showFighters"]);
    Route::get("/entities/teams/{team}/fighters/create", [TeamController::class, "addFighters"]);
    Route::get("/entities/teams/{team}/fighters/select", [TeamController::class, "selectFighters"]);
    Route::post("/entities/teams/{team}/fighters", [TeamController::class, "addFightersToTeam"]);
    Route::delete("/entities/teams/{team}/fighters/{fighter}", [TeamController::class, "removeFighter"]);
    Route::resource("/entities/teams", TeamController::class)->except(["show"]);

    Route::get("/entities/clubs/{club}/fighters", [ClubController::class, "showFighters"]);
    Route::get("/entities/clubs/{club}/teams", [ClubController::class, "showTeams"]);


    /**************************************************************
     *      Tournament Routes                                     *
     **************************************************************/


    Route::resource("/tournaments", TournamentController::class);

    Route::get("/tournaments/{tournament}/categories/overview", [CategoryController::class, "printCategoriesOverview"]);

    Route::get("/tournaments/{tournament}/enrolled/fighters", [EnrolledFighterController::class, "index"]);
    Route::get("/tournaments/{tournament}/enrolled/fighters/add", [EnrolledFighterController::class, "add"]);
    Route::post("/tournaments/{tournament}/enrolled/fighters/prepare", [EnrolledFighterController::class, "prepare"]);
    Route::get("/tournaments/{tournament}/enrolled/fighters/configure", [EnrolledFighterController::class, "configure"]);
    Route::post("/tournaments/{tournament}/enrolled/fighters/{fighter}/enroll", [EnrolledFighterController::class, "enroll"]);
    Route::get("/tournaments/{tournament}/enrolled/fighters/{enrolled_fighter}/edit", [EnrolledFighterController::class, "prepareEdit"]);
    Route::get("/tournaments/{tournament}/enrolled/fighters/{enrolled_fighter}/configure", [EnrolledFighterController::class, "edit"]);
    Route::post("/tournaments/{tournament}/enrolled/fighters/{enrolled_fighter}", [EnrolledFighterController::class, "update"]);
    Route::delete("/tournaments/{tournament}/enrolled/fighters/{enrolled_fighter}", [EnrolledFighterController::class, "destroy"]);
    Route::get("/tournaments/{tournament}/enrolled/fighters/print", [EnrolledFighterController::class, "print"]);

    Route::get("/tournaments/{tournament}/enrolled/coaches", [EnrolledCoachController::class, "index"]);
    Route::get("/tournaments/{tournament}/enrolled/coaches/add", [EnrolledCoachController::class, "add"]);
    Route::post("/tournaments/{tournament}/enrolled/coaches", [EnrolledCoachController::class, "enroll"]);
    Route::delete("/tournaments/{tournament}/enrolled/coaches/{enrolled_coach}", [EnrolledCoachController::class, "destroy"]);
    Route::get("/tournaments/{tournament}/enrolled/coaches/print", [EnrolledCoachController::class, "print"]);
    Route::get("/tournaments/{tournament}/enrolled/referees", [EnrolledRefereeController::class, "index"]);
    Route::get("/tournaments/{tournament}/enrolled/referees/add", [EnrolledRefereeController::class, "add"]);
    Route::post("/tournaments/{tournament}/enrolled/referees", [EnrolledRefereeController::class, "enroll"]);
    Route::delete("/tournaments/{tournament}/enrolled/referees/{enrolled_referee}", [EnrolledRefereeController::class, "destroy"]);
    Route::get("/tournaments/{tournament}/enrolled/referees/print", [EnrolledRefereeController::class, "print"]);
    Route::get("/tournaments/{tournament}/enrolled/desk-supporters", [EnrolledDeskSupporterController::class, "index"]);
    Route::get("/tournaments/{tournament}/enrolled/desk-supporters/add", [EnrolledDeskSupporterController::class, "add"]);
    Route::post("/tournaments/{tournament}/enrolled/desk-supporters", [EnrolledDeskSupporterController::class, "enroll"]);
    Route::delete("/tournaments/{tournament}/enrolled/desk-supporters/{enrolled_desk_supporter}", [EnrolledDeskSupporterController::class, "destroy"]);
    Route::get("/tournaments/{tournament}/enrolled/desk-supporters/print", [EnrolledDeskSupporterController::class, "print"]);

    Route::get("/tournaments/{tournament}/enrolled/teams", [EnrolledTeamController::class, "index"]);
    Route::get("/tournaments/{tournament}/enrolled/teams/add", [EnrolledTeamController::class, "add"]);
    Route::post("/tournaments/{tournament}/enrolled/teams", [EnrolledTeamController::class, "enroll"]);
    Route::delete("/tournaments/{tournament}/enrolled/teams/{enrolled_team}", [EnrolledTeamController::class, "destroy"]);
    Route::get("/tournaments/{tournament}/enrolled/teams/print", [EnrolledTeamController::class, "print"]);


    /**************************************************************
     *      Admin Only Routes                                     *
     **************************************************************/

    Route::middleware("can:admin")->group(function() {


        /**************************************************************
         *      Mail Routes                                           *
         **************************************************************/

        Route::get("/mail", [MailController::class, "createMail"]);
        Route::get("/mail/tournament-invitation/{tournament}", [MailController::class, "inviteClubsToTournament"]);
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


        /**************************************************************
         *      Entity Routes                                         *
         **************************************************************/

        Route::resource("/entities/users", UserController::class)->except(["create", "store", "edit", "update"]);
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

        Route::get("/tournaments/{tournament}/schedule", [ScheduleController::class, "show"]);
        Route::post("/tournaments/{tournament}/schedule", [ScheduleController::class, "store"]);

        Route::post("/tournaments/{tournament}/finish", [TournamentController::class, "finishTournament"]);
        Route::get("/tournaments/{tournament}/status", [TournamentController::class, "editTournamentStatus"]);
        Route::post("/tournaments/{tournament}/status", [TournamentController::class, "updateTournamentStatus"]);
        Route::get("/tournaments/{tournament}/clubs/enrolled", [TournamentController::class, "getEnrolledClubNames"]);
        Route::get("/tournaments/{tournament}/clubs/excluded", [TournamentController::class, "getExcludedClubNames"]);
        Route::post("/tournaments/{tournament}/clubs/exclude", [TournamentController::class, "excludeClub"]);
        Route::post("/tournaments/{tournament}/clubs/include", [TournamentController::class, "includeClub"]);

        /*
        Route::get("/tournaments/competition-mode", function () {
            return view("Tournament.competition-mode");
        });
        */

        Route::resource("/tournaments/{tournament}/fight-places", FightPlaceController::class)->except(["show"]);

        Route::get("/tournaments/{tournament}/category/{category}/split", function () {
            return view("Tournament.split-category");
        });
        Route::post("/tournaments/{tournament}/categories/{category}/name", [CategoryController::class, "updateName"]);
        Route::get("/tournaments/{tournament}/categories/print", [CategoryController::class, "printAllCategories"]);
        Route::get("/tournaments/{tournament}/categories/{category}/print", [CategoryController::class, "printCategory"]);
        Route::get("/tournaments/{tournament}/categories/{category}/split", [CategoryController::class, "prepareSplittingCategory"]);
        Route::post("/tournaments/{tournament}/categories/{category}/split", [CategoryController::class, "splitCategory"]);
        Route::post("/tournaments/{tournament}/categories/{category}/merge", [CategoryController::class, "mergeCategories"]);
        Route::get("/tournaments/{tournament}/categories/{category}/fighters/add", [CategoryController::class, "selectFighters"]);
        Route::get("/tournaments/{tournament}/categories/{category}/teams/add", [CategoryController::class, "selectTeams"]);
        Route::post("/tournaments/{tournament}/categories/{category}/fighters", [CategoryController::class, "addFighters"]);
        Route::post("/tournaments/{tournament}/categories/{category}/teams", [CategoryController::class, "addTeams"]);
        Route::delete("/tournaments/{tournament}/categories/{category}/fighters/{enrolled_fighter}", [CategoryController::class, "removeFighter"]);
        Route::delete("/tournaments/{tournament}/categories/{category}/teams/{enrolled_team}", [CategoryController::class, "removeTeam"]);

        Route::get("/tournaments/{tournament}/categories/fighting-systems", [FightingSystemController::class, "index"]);
        Route::get("/tournaments/{tournament}/categories/fighting-systems/print-all", [FightingSystemController::class, "printAllFightingSystems"]);
        Route::post("/tournaments/{tournament}/categories/{category}/fighting-system/assign", [FightingSystemController::class, "assignFightingSystem"]);
        Route::get("/tournaments/{tournament}/categories/{category}/fighting-system/print", [FightingSystemController::class, "printCategoryFightingSystem"]);
        Route::get("/tournaments/{tournament}/categories/{category}/fighting-system/edit", [FightingSystemController::class, "editCategoryFightingSystem"]);
        Route::post("/tournaments/{tournament}/categories/{category}/fighting-system/edit", [FightingSystemController::class, "updateCategoryFightingSystem"]);

        Route::resource("/tournaments/{tournament}/categories", CategoryController::class)->except(["show", "edit", "update"]);

        /*
        Route::get("/tournaments/{tournament}/category/fighting-system", function (Tournament $tournament) {
            return view("Tournament.fighting-system-map", ["tournament" => $tournament]);
        });
        */

    });

});


/**************************************************************
 *      Legal Stuff                                           *
 **************************************************************/

/*
Route::get("/legal-notice", function () {
    return view("legal-notice");
});

Route::get("/data-privacy-statement", function () {
    return view("data-privacy-statement");
});
*/


/**************************************************************
 *      Miscellaneous                                         *
 **************************************************************/

Route::get("/creator", function () {
    return view("creator");
});
