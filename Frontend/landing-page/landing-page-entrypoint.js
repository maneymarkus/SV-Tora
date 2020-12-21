function init(window, document, undefined) {

    LoadModule.loadModuleApi("../js/theater.min.js", true);
    LoadModule.loadModuleApi("../js/Modules/TheaterModule.js", true);
    LoadModule.loadModuleApi("../js/sites/landing-page.js", true);

}

window.addEventListener("DOMContentLoaded", function() {
    init(window, document);
});
