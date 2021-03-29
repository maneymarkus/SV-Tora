function init(window, document, undefined) {

    LoadModule.loadModuleApi("../../js/Modules/GeneralModule.js", true);
    LoadModule.loadModuleApi("../../js/Modules/LoaderModule.js", func, true);

    function func() {
        LoaderModule.addBigLoaderApi(document.querySelector("body"));
    }

}

window.addEventListener("DOMContentLoaded", function() {
    init(window, document);
});
