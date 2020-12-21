function init(window, document, undefined) {

    LoadModule.loadModuleApi("../js/theater.min.js", true);
    LoadModule.loadModuleApi("../js/Modules/TheaterModule.js", true);
    LoadModule.loadModuleApi("../js/Modules/GeneralModule.js", true);
    LoadModule.loadModuleApi("../js/Modules/MaterialInputsModule.js", true);
    LoadModule.loadModuleApi("../js/Modules/SecondaryButtonModule.js", true);
    LoadModule.loadModuleApi("../js/sites/login.js", true);

}

window.addEventListener("DOMContentLoaded", function() {
    init(window, document);
});
