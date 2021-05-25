/**
 * DEPENDENCIES
 */

import { generateElement } from "./GeneralModule";

/**
 * This Module contains code responsible for managing loading animations
 */

let bigLoaderElement = undefined;
let smallLoaderElement = undefined;

/**
 * This function creates a loader DOM element and returns it
 * @param bigLoader {boolean} States if the loader to be created should cover the whole page or not
 * @return {HTMLElement}
 */
function createLoader(bigLoader) {
    let container = generateElement("div", ["loader-container"]);
    if (bigLoader) {
        container.classList.add("big-loader-container");
    } else {
        container.classList.add("small-loader-container");
    }

    let loaderDiv = generateElement("div", ["loader"]);
    let fighterDiv = generateElement("div", ["fighter"]);
    let image = generateElement("img");
    image.setAttribute("src", "../images/fighter-symbol-white.png");
    image.setAttribute("alt", "fighter");
    fighterDiv.appendChild(image);
    loaderDiv.appendChild(fighterDiv);
    container.appendChild(loaderDiv);
    return container;
}

/**
 * This function adds a big loader element to the body of the website
 */
function addBigLoader() {
    let body = document.querySelector("body");
    if (!bigLoaderElement) {
        bigLoaderElement = createLoader(true);
    }
    body.appendChild(bigLoaderElement);
}

/**
 * This function removes a big loader from a page
 */
function removeBigLoader() {
    let loader = document.querySelector("div.big-loader-container");
    loader.remove();
}

/**
 * This function adds a small loader to a given parent element
 * @param parent {HTMLElement} The element to which the loader should be appended (displays over the content of the parent element)
 */
function addSmallLoader(parent) {
    if (!smallLoaderElement) {
        smallLoaderElement = createLoader(false);
    }
    parent.appendChild(smallLoaderElement);
}

/**
 * This function removes a small loader from a given parent element
 * @param parent {HTMLElement} The element from which the loader should be removed
 */
function removeSmallLoader(parent) {
    let loader = parent.querySelector("div.small-loader-container");
    loader.remove();
}

/**
 * API:
 */
export {
    addBigLoader,
    removeBigLoader,
    addSmallLoader,
    removeSmallLoader
}
