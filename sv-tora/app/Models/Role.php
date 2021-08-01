<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model {
    use HasFactory;

    protected $table = "roles";

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "name",
        "description"
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public static function getRoleId($roleName) {
        return Role::where("name", "=", $roleName)->first()->id;
    }

}
