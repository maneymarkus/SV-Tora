function init(window, document, undefined) {

    LoadModule.loadModuleApi("../js/jquery.min.js", true);
    LoadModule.loadModuleApi("../js/tilt.jquery.js", true);
    LoadModule.loadModuleApi("../js/popper.min.js", true);
    LoadModule.loadModuleApi("../js/tippy.umd.js", true);
    LoadModule.loadModuleApi("../js/Modules/GeneralModule.js", true);
    LoadModule.loadModuleApi("../js/Modules/TiltModule.js", true);
    LoadModule.loadModuleApi("../js/Modules/PrimaryButtonModule.js", true);
    LoadModule.loadModuleApi("../js/Modules/SecondaryButtonModule.js", true);
    LoadModule.loadModuleApi("../js/Modules/ModalModule.js", true);
    LoadModule.loadModuleApi("../js/Modules/MaterialInputsModule.js", true);
    LoadModule.loadModuleApi("../js/Modules/TooltipModule.js", true);
    LoadModule.loadModuleApi("../js/Modules/TimeScheduleModule.js", true);
    LoadModule.loadModuleApi("../js/sites/competition-mode.js", true);

}

window.addEventListener("DOMContentLoaded", function() {
    init(window, document);
});
