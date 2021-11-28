<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class RegistrationInvitation extends Model
{
    protected $table = "registration_invitations";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "email",
        "token",
        "role_id",
        "club_id",
    ];

    public function role() {
        return $this->belongsTo(Role::class);
    }

    public function club() {
        return $this->belongsTo(Club::class);
    }

}
