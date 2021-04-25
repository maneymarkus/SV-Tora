/**
 * DEPENDENCIES
 */

import theaterJS from "theaterjs";

/**
 * This Module contains code responsible for managing a typing-like animation and its properties
 */

const theaterOptions = {locale: "de", minSpeed: {erase: 10, type: 40}, maxSpeed: {erase: 80, type: 100}};
const theater = theaterJS(theaterOptions);

let previousActorElement = undefined;

theater
    .on("type:start, erase:start", function () {
        let currentActorElement = theater.getCurrentActor().$element;
        if (!currentActorElement.classList.contains("is-typing")) {
            currentActorElement.classList.add("is-typing");
            if (typeof previousActorElement !== "undefined") {
                previousActorElement.classList.remove("is-typing");
            }
            previousActorElement = currentActorElement;
        }
    })
    .on("type:end, erase:end", function () {
        // and then remove it when he's done
        let actor = theater.getCurrentActor();
    });

/**
 * API:
 */
export {
    theaterOptions,
    theater
}
