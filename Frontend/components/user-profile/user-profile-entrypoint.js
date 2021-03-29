function init(window, document, undefined) {

    LoadModule.loadModuleApi("../../js/Modules/GeneralModule.js", true);
    LoadModule.loadModuleApi("../../js/Modules/SecondaryButtonModule.js", true);

}

window.addEventListener("DOMContentLoaded", function() {
    init(window, document);
});
