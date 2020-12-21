function init(window, document, undefined) {

    LoadModule.loadModuleApi("../../js/popper.min.js", true);
    LoadModule.loadModuleApi("../../js/tippy.umd.js", true);
    LoadModule.loadModuleApi("../../js/Modules/TooltipModule.js", true);

}

window.addEventListener("DOMContentLoaded", function() {
    init(window, document);
});
