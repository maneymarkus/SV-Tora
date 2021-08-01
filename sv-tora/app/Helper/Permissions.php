<?php


namespace App\Helper;


abstract class Permissions
{
    const INVITE_USER = "invite_user";
    const INVITE_ADMIN = "invite_admin";

    const PERMISSIONS = [
        self::INVITE_USER => "Allows a user to invite other users to other clubs different than the one the inviting user belongs to.",
        self::INVITE_ADMIN => "Allows a user to invite admins.",
    ];

}
