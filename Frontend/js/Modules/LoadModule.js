/**
 * This Module contains code responsible for managing the loading of additional javascript files (see: https://github.com/filamentgroup/loadJS)
 */
var LoadModule = (function (window, document, undefined) {

    /**
     * DEPENDENCIES
     * NONE!
     */

    /**
     * loadJS: load a JS file asynchronously. [c]2014 @scottjehl, Filament Group, Inc. (Based on http://goo.gl/REQGQ by Paul Irish). Licensed MIT
     * @param src {String} containing the path to the desired .js file to be loaded
     * @param cb {Boolean || function} either boolean (see @ordered) or callback function after desired .js file has been finished loading
     * @param ordered {Boolean} States if to load multiple .js files in order (first written is first loaded)
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

    /**
     * API:
     */
    return {
        /**
         * This api function loads a JavaScript file
         * @param src {String} containing the path to the desired .js file to be loaded
         * @param cb {Boolean || function} either boolean (see @ordered) or callback function after desired .js file has been finished loading
         * @param ordered {Boolean} States if to load multiple .js files in order (first written is first loaded)
         */
        loadModuleApi : function (src, cb, ordered) {
            loadJS(src, cb, ordered);
        }
    }

})(window, document);