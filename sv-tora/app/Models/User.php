<?php

namespace App\Models;

use App\Helper\Roles;
use App\Notifications\ResetPassword;
use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, CanResetPassword;

    protected $table = "users";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        "username",
        'email',
        'password',
        "role_id",
        "club_id",
        "profile_picture",
        "dark_mode",
        "smartphone_optimized_tables",
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [

    ];

    public function sendPasswordResetNotification($token) {
        $this->notify(new ResetPassword($token));
    }

    public function role() {
        return $this->belongsTo(Role::class);
    }

    public function club() {
        return $this->belongsTo(Club::class);
    }

    public function isAdmin() {
        return $this->role->name === Roles::ADMIN;
    }

    public function permissions() {
        return $this->belongsToMany(Permission::class);
    }

    public function allowTo($permissions) {
        if (is_array($permissions)) {
            foreach ($permissions as $permission) {
                $this->permissions()->save($permission);
            }
            return true;
        } else {
            return $this->permissions()->save($permissions);
        }
    }

    public function denyTo($permissions) {
        if (is_array($permissions)) {
            foreach ($permissions as $permission) {
                $this->permissions()->detach($permission);
            }
            return true;
        } else {
            return $this->permissions()->detach($permissions);
        }
    }

    public static function tableHeadings() {
        return [
            ["heading" => "Nr.", "sortable" => true],
            ["heading" => "Name", "sortable" => true],
            ["heading" => "Nutzername", "sortable" => true],
            ["heading" => "E-Mail", "sortable" => true],
            ["heading" => "Rolle", "sortable" => true],
            ["heading" => "Verein", "sortable" => true],
        ];
    }

    public function tableProperties($counter) {
        $club = "";
        if ($this->club !== null) {
            $club = $this->club->name;
        } else {
            $club = "<span class='error'>Keinem Verein zugeordnet!</span>";
        }
        return [
            $counter,
            $this->name,
            $this->username,
            $this->email,
            $this->role->name,
            $club
        ];
    }

}
