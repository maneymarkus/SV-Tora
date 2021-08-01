<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class GlobalSetting extends Model
{
    use HasFactory;

    protected $table = "global_settings";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "fight_time_in_seconds",
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        "id",
        "created_at",
        "updated_at",
    ];

    public static function getSettingModel() {
        return GlobalSetting::find(1);
    }

    public static function getSettings() {
        return GlobalSetting::find(1)->attributesToArray();
    }

    public static function getSetting(string $setting) {
        return GlobalSetting::find(1)->$setting;
    }

    public static function setSetting(string $key, mixed $value) {
        if (self::getSetting($key) !== null) {
            $globalSetting = GlobalSetting::find(1);
            $globalSetting->$key = $value;
            $globalSetting->save();
        }
    }

}
