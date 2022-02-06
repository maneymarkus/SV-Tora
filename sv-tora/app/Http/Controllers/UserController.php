<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Helper\Permissions;
use App\Helper\Roles;
use App\Models\Club;
use App\Models\Permission;
use App\Models\Role;
use App\Models\Tournament;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(User::class, 'user');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all()->reject(function($user) {
            return $user->role->name === Roles::ADMIN;
        });

        $rows = [];
        $counter = 1;

        foreach ($users as $user) {
            $row = [
                "data" => $user->tableProperties($counter++),
                "editUrl" => "/entities/users/" . $user->id . "/admin",
                "deleteUrl" => "/entities/users/" . $user->id,
            ];
            array_push($rows, $row);
        }

        return view("Entities.users", ["entities" => "Nutzer", "columns" => User::tableHeadings(), "rows" => $rows]);
    }


    /**
     * Display a listing of all admins
     */
    public function indexAdmins() {
        $admins = User::where("role_id", "=", Role::getRoleId(Roles::ADMIN))->get();
        $permissions = Permission::all();
        return view("Entities.admins", ["admins" => $admins, "permissions" => $permissions]);
    }


    /**
     * Show the form for editing the specified resource by an admin
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function editByAdmin(User $user)
    {
        $this->authorize("editByAdmin", $user);
        return response()->json(User::adminEditableProperties($user));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $editable = [
            "name" => "Der Name wurde erfolgreich geändert.",
            "password" => "Das Passwort wurde erfolgreich geändert.",
            "dark_mode" => "Der Design Modus wurde erfolgreich geändert.",
            "smartphone_optimized_tables" => "Die Tabellenoptimierung wurde erfolgreich geändert."
        ];
        $inputs = $request->all();
        $message = "Die Einstellungen wurden erfolgreich geändert.";
        foreach ($inputs as $name => $value) {
            if (in_array($name, array_keys($editable))) {
                if ($name === "password") {
                    $user->password = Hash::make($value);
                } else {
                    $user->$name = $value;
                }
                $message = $editable[$name];
            }
        }
        if ($user->save()) {
            return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, $message);
        } else {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Leider ist etwas schief gelaufen. Bitte versuchen Sie es später erneut.");
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function updateByAdmin(Request $request, User $user)
    {
        $this->authorize("updateByAdmin", $user);
        $club = Club::where("name", "=", $request->input("Verein"))->first();
        if ($club === null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Leider konnte kein Verein mit dem Namen \"" . $request->input("Verein") . "\" gefunden werden.!");
        }

        $role = Role::where("name", "=", $request->input("Rolle"))->first();
        if ($club === null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Leider konnte keine Rolle mit dem Namen \"" . $request->input("Rolle") . "\" gefunden werden.!");
        }

        $user->club_id = $club->id;
        $user->role_id = $role->id;
        $user->save();
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der User \"" . $user->name . "\" wurde erfolgreich geändert!");
    }


    public function updateAdminPermissions(Request $request, User $admin) {
        $this->authorize("updateAdminPermissions", $admin);
        if (Gate::allows("has-permission", Permissions::UPDATE_ADMIN_PERMISSIONS)) {
            if ($admin->name === "Superuser") {
                return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Die Rechte des Superusers können nicht geändert werden.");
            }
            $permissions = $request->all();
            $grantedPermissions = array_filter($permissions, function ($granted) {
                return $granted;
            });
            $grantedPermissions = array_keys($grantedPermissions);
            $grantedPermissions = array_map(function ($grantedPermission) {
                return Permission::where("name", "=", $grantedPermission)->first()->id;
            }, $grantedPermissions);
            $admin->permissions()->sync($grantedPermissions);
            return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Die Rechte des Admins " . $admin->name . " wurden erfolgreich bearbeitet.");
        } else {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Du besitzt nicht die nötigen Rechte, um die Rechte anderer und deine eigenen Rechte zu bearbeiten.");
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        if ($user === null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Dieser User wurde nicht gefunden.");
        }
        $userName = $user->name;
        $user->delete();
        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der User \"" . $userName . "\" wurde erfolgreich gelöscht!");
    }


    public function destroyAdmin(User $admin) {
        if (Gate::allows("has-permission", Permissions::DELETE_ADMINS)) {
            if ($admin->name === "Superuser") {
                return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Der Superuser kann nicht gelöscht werden.");
            }
            $adminName = $admin->name;
            $admin->delete();
            return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Der Admin \"" . $adminName . "\" wurde erfolgreich gelöscht!");
        } else {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Du hast nicht die nötigen Berechtigungen, um andere Administratoren zu löschen.");
        }
    }


    public function getMailsFromUsersOfClub(Club $club) {
        $users = $club->users;
        $userMails = [];

        foreach ($users as $user) {
            array_push($userMails, [
                "name" => $club->name,
                "mail" => $user->email,
            ]);
        }

        return $userMails;
    }


    public function getMailsFromUsersFromAllClubs() {
        $clubs = Club::all()->reject(function ($club) {
            return $club->name === "SV Tora";
        });
        $userMails = [];

        foreach ($clubs as $club) {
            $userMails = array_merge($userMails, $this->getMailsFromUsersOfClub($club));
        }

        return $userMails;
    }


    public function getMailsFromUsersFromInvitedClubs() {
        // TODO
        return [];
    }


    public function getMailsFromUsersFromEnrolledClubs() {
        if (Tournament::latest()->first()?->active) {
            $clubs = app(TournamentController::class)->getEnrolledClubs(Tournament::latest()->first());

            $userMails = [];

            foreach ($clubs as $club) {
                $userMails = array_merge($userMails, $this->getMailsFromUsersOfClub($club));
            }

            return $userMails;
        }
        return [];
    }


    public function getMailsFromUsersFromSelectedClubs(Request $request) {
        $receivers = $request->input("receivers");
        $clubs = [];

        foreach ($receivers as $receiver) {
            array_push($clubs, Club::where("name", "=", $receiver)->first());
        }

        $userMails = [];

        foreach ($clubs as $club) {
            $userMails = array_merge($userMails, $this->getMailsFromUsersOfClub($club));
        }

        return $userMails;
    }

}
