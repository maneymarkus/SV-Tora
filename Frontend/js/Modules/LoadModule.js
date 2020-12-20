let LoadModule = (function (window, document, undefined) {

    /**
     * loadJS: load a JS file asynchronously. [c]2014 @scottjehl, Filament Group, Inc. (Based on http://goo.gl/REQGQ by Paul Irish). Licensed MIT
     * @param src String containing the path to the desired .js file to be loaded
     * @param cb either boolean (see @ordered) or callback function after desired .js file has been finished loading
     * @param ordered Boolean which states if to load multiple .js files in order (first written is first loaded)
     * @return {HTMLScriptElement}
     */
    function loadJS(src, cb, ordered){
        "use strict";
        let tmp;
        let ref = window.document.getElementsByTagName("script")[0];
        let script = window.document.createElement("script");

        if (typeof (cb) === 'boolean') {
            tmp = ordered;
            ordered = cb;
            cb = tmp;
        }

        script.src = src;
        script.async = !ordered;
        ref.parentNode.insertBefore(script, ref);

        if (cb && typeof (cb) === "function") {
            script.onload = cb;
        }
        return script;
    }

    return {
        loadModuleApi : function (src, cb, ordered) {
            loadJS(src, cb, ordered);
        }
    }

})(window, document);