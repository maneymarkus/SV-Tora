function init(window, document, undefined) {

    LoadModule.loadModuleApi("../../js/Modules/GeneralModule.js", true);
    LoadModule.loadModuleApi("../../js/Modules/MaterialInputsModule.js", true);
    LoadModule.loadModuleApi("../../js/Modules/SecondaryButtonModule.js", true);
    LoadModule.loadModuleApi("../../js/Modules/ModalModule.js", true);
    LoadModule.loadModuleApi("../../js/Modules/FormModule.js", true);
    LoadModule.loadModuleApi("../../js/Modules/LoginRegistrationModule.js", true);

}

window.addEventListener("DOMContentLoaded", function() {
    init(window, document);
});
