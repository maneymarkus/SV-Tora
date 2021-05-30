<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class RegistrationInvitation extends Model
{
    protected $table = "registration_invitations";

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = "email";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "email",
        "token"
    ];

}
