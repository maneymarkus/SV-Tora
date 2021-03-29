function init(window, document, undefined) {

    LoadModule.loadModuleApi("../js/Modules/GeneralModule.js", true);
    LoadModule.loadModuleApi("../js/Modules/MaterialInputsModule.js", true);
    LoadModule.loadModuleApi("../js/sites/settings.js", true);

}

window.addEventListener("DOMContentLoaded", function() {
    init(window, document);
});
