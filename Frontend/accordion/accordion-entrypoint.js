function init(window, document, undefined) {

    LoadModule.loadModuleApi("../js/jquery.min.js", true);
    LoadModule.loadModuleApi("../js/tilt.jquery.js", true);
    LoadModule.loadModuleApi("../js/Modules/GeneralModule.js", true);
    LoadModule.loadModuleApi("../js/Modules/PrimaryButtonModule.js", true);
    LoadModule.loadModuleApi("../js/Modules/AccordionModule.js", true);

}

window.addEventListener("DOMContentLoaded", function() {
    init(window, document);
});
