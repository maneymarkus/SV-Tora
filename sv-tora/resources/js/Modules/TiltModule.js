/**
 * DEPENDENCIES
 */

import $ from "jquery";

/**
 * This Module contains code responsible for tilting elements
 */

let generalTiltOptions = {maxTilt: 15, scale: 1.15};

let tiltElements = document.querySelectorAll(".tilt");
tiltElements.forEach((tiltElement) => {
    $(tiltElement).tilt(generalTiltOptions);
});

/**
 * This functions enables other modules to register tilt elements so that these get the tilt effect
 * @param element
 */
function registerTiltElement(element) {
    $(element).tilt(generalTiltOptions);
}

/**
 * API:
 */
export {
    registerTiltElement
}
