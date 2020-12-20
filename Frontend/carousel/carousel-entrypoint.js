/*
    Dependencies: SecondaryButtonModule
 */

function init(window, document, undefined) {

    LoadModule.loadModuleApi("../js/Modules/SecondaryButtonModule.js", true);
    LoadModule.loadModuleApi("../js/Modules/CarouselModule.js", true);

}

window.addEventListener("DOMContentLoaded", function() {
    init(window, document);
});
