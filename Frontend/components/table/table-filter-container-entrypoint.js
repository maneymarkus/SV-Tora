function init(window, document, undefined) {

    LoadModule.loadModuleApi("../../js/jquery.min.js", true);
    LoadModule.loadModuleApi("../../js/tilt.jquery.js", true);
    LoadModule.loadModuleApi("../../js/Modules/GeneralModule.js", true);
    LoadModule.loadModuleApi("../../js/Modules/SecondaryButtonModule.js", true);
    LoadModule.loadModuleApi("../../js/Modules/TableModule.js", true);
    LoadModule.loadModuleApi("../../js/Modules/TableFilterModule.js", true);

}

window.addEventListener("DOMContentLoaded", function() {
    init(window, document);
});
