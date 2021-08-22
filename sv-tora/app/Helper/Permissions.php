<?php


namespace App\Helper;


abstract class Permissions
{
    const INVITE_USERS = "User einladen";
    const INVITE_ADMINS = "Admins einladen";
    const DELETE_ADMINS = "Admins löschen";
    const UPDATE_ADMIN_PERMISSIONS = "Rechte bearbeiten";

    const PERMISSIONS = [
        self::INVITE_USERS => "Erlaubt einem Administrator, neue User zu anderen Vereinen als dem eigenen einzuladen.",
        self::INVITE_ADMINS => "Erlaubt einem Administrator, neue Administratoren einzuladen.",
        self::DELETE_ADMINS => "Erlaubt einem Administrator, andere Administratoren zu löschen.",
        self::UPDATE_ADMIN_PERMISSIONS => "Erlaubt einem Administrator, die Rechte anderer Administratoren zu bearbeiten.",
    ];

}
