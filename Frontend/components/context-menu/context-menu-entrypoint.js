function init(window, document, undefined) {

    LoadModule.loadModuleApi("../../js/Modules/GeneralModule.js", true);
    LoadModule.loadModuleApi("../../js/Modules/ContextMenuModule.js", done, true);

    function done() {
        let exampleDiv = document.querySelector("div.example-div");
        ContextMenuModule.registerNewContextMenu(exampleDiv, {"Dies das": a, "Was anderes": b});

        function a() {
            console.log("a");
            ContextMenuModule.removeContextMenu(exampleDiv);
        }

        function b() {
            console.log("b");
        }

    }

}

window.addEventListener("DOMContentLoaded", function() {
    init(window, document);
});
