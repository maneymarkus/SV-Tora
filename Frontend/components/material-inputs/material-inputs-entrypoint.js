function init(window, document, undefined) {

    LoadModule.loadModuleApi("../../js/Modules/GeneralModule.js", true);
    LoadModule.loadModuleApi("../../js/Modules/MaterialInputsModule.js", ready, true);

    function ready() {
    }

}

window.addEventListener("DOMContentLoaded", function() {
    init(window, document);
});
