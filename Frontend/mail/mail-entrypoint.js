function init(window, document, undefined) {

    LoadModule.loadModuleApi("../js/jquery.min.js", true);
    LoadModule.loadModuleApi("../js/tilt.jquery.js", true);
    LoadModule.loadModuleApi("../js/Modules/GeneralModule.js", true);
    LoadModule.loadModuleApi("../js/Modules/PrimaryButtonModule.js", true);
    LoadModule.loadModuleApi("../js/Modules/SecondaryButtonModule.js", true);
    LoadModule.loadModuleApi("../js/Modules/MaterialInputsModule.js", true);
    LoadModule.loadModuleApi("../js/Modules/ModalModule.js", true);
    LoadModule.loadModuleApi("../js/Modules/TranslationModule.js", true);
    LoadModule.loadModuleApi("../js/Modules/FormModule.js", true);
    LoadModule.loadModuleApi("../js/Modules/TagModule.js", true);
    LoadModule.loadModuleApi("../js/sites/mail.js", true);

}

window.addEventListener("DOMContentLoaded", function() {
    init(window, document);
});
