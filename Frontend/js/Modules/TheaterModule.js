if (typeof theaterJS === "undefined") {
    console.warn("Missing Theater.js dependency!");
}

/**
 * This Module contains code responsible for managing a typing-like animation and its properties
 */
var TheaterModule = (function (window, document, undefined) {

    /**
     * DEPENDENCIES
     */
    let dependencies = [];
    GeneralModule.checkDependenciesApi(dependencies);

    const theaterOptions = {locale: "de", minSpeed: {erase: 10, type: 40}, maxSpeed: {erase: 80, type: 100}};
    const theater = theaterJS(theaterOptions);

    theater
        .on("type:start, erase:start", function () {
            // add a class to actor's dom element when he starts typing/erasing
            let actor = theater.getCurrentActor();
        })
        .on("type:end, erase:end", function () {
            // and then remove it when he's done
            let actor = theater.getCurrentActor();
      });

    /**
     * API:
     */
    return {
        theaterOptions,
        theater,
    }

})(window, document);
