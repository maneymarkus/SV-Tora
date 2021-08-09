<?php

namespace App\Http\Controllers;

use App\Helper\GeneralHelper;
use App\Helper\NotificationTypes;
use App\Models\GlobalSetting;
use Illuminate\Http\Request;

class GlobalSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("Settings.global-settings");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $settingKey = $request->input("setting_key");

        if (GlobalSetting::getSetting($settingKey) === null) {
            return GeneralHelper::sendNotification(NotificationTypes::ERROR, "Leider konnten die Einstellungen nicht geändert werden.");
        }

        $settingValue = $request->input("setting_value");

        GlobalSetting::setSetting($settingKey, $settingValue);

        return GeneralHelper::sendNotification(NotificationTypes::SUCCESS, "Die Einstellungen wurden erfolgreich geändert!");

    }
}
