function init(window, document, undefined) {

    LoadModule.loadModuleApi("../../js/popper.min.js", true);
    LoadModule.loadModuleApi("../../js/tippy.umd.js", true);
    LoadModule.loadModuleApi("../../js/Modules/GeneralModule.js", true);
    LoadModule.loadModuleApi("../../js/Modules/TooltipModule.js", done, true);

    function done() {
        TooltipModule.createTooltipApi(".tt-trigger", "My tooltip extra extra extra extra extra extra extra long!");
    }

}

window.addEventListener("DOMContentLoaded", function() {
    init(window, document);
});
