function init(window, document, undefined) {

    LoadModule.loadModuleApi("../js/Modules/GeneralModule.js", true);
    LoadModule.loadModuleApi("../js/sites/profile-settings.js", true);

}

window.addEventListener("DOMContentLoaded", function() {
    init(window, document);
});
