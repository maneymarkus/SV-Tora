function init(window, document, undefined) {

    LoadModule.loadModuleApi("../js/theater.min.js", true);
    LoadModule.loadModuleApi("../js/Modules/TheaterModule.js", true);
    LoadModule.loadModuleApi("../js/sites/creator.js", true);

}

window.addEventListener("DOMContentLoaded", function() {
    init(window, document);
});