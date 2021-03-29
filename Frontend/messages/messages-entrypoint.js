function init(window, document, undefined) {

    LoadModule.loadModuleApi("../js/Modules/GeneralModule.js", true);
    LoadModule.loadModuleApi("../js/Modules/NotificationModule.js", done, true);

    function done() {
        window.setTimeout(function () {
            NotificationModule.createNotificationApi(GeneralModule.generalVariables.notificationTypes.SUCCESS, "Irgendwas hat geklappt", true, "21.01.2021 17:00", "System");
        },1000);
    }

}

window.addEventListener("DOMContentLoaded", function() {
    init(window, document);
});
