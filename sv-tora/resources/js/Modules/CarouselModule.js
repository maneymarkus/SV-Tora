/**
 * DEPENDENCIES
 */

import { createPrimaryButton } from "./PrimaryButtonModule";
import { enableSecondaryButton, disableSecondaryButton } from "./SecondaryButtonModule";
import { removeOverlay } from "./ModalModule";

/**
 * This Module contains code responsible for managing carousels
 */

let carousels = [];

/**
 * This "class" represents a displayed HTML carousel element and enables a detailed control over it
 * @param carouselContainer {HTMLElement} The respective HTML element this object represents
 * @constructor
 */
let Carousel = function(carouselContainer) {
    const This = this;
    this.carouselElement = carouselContainer;
    this.slideWrapper = carouselContainer.querySelector("div.page-wrapper");
    this.slides = carouselContainer.querySelectorAll("div.page");
    this.carouselDeactivationButton = createPrimaryButton(["close", "carousel-close"], undefined, "close", "Karussel schließen");

    this.slideCount = this.slides.length;
    this.angleDistance = 360 / this.slideCount;
    this.active = true;

    /**
     * This object contains options concerning the display of the carousel
     * @type {{distanceZ: number}}
     */
    this.options = {
        distanceZ : 15,
    }

    /**
     * This object contains current properties of the carousel
     * @type {{startAngle: number, xStart: number, rotationSpeed: number, lastAngle: number, currentAngle: number}}
     */
    this.properties = {
        rotationSpeed : 1,
        xStart : 0,
        startAngle : 0,
        currentAngle : 0,
        lastAngle : 0,
    }

    /**
     * This function handles the rotation of the carousel (by rotating each slide individually)
     * @param rotation
     */
    this.rotateSlides = function(rotation) {
        let counter = 0;
        This.slides.forEach((slide) => {
            let rotate = This.angleDistance * counter + rotation;
            slide.style.transform = "rotateY(" + rotate + "deg) translateZ(" + This.options.distanceZ + "rem) rotateY(" + rotate * -1 + "deg)";
            if (Math.abs(rotate % 360) < 110 || Math.abs(rotate % 360) > 250) {
                slide.style.visibility = "visible";
            } else {
                slide.style.visibility = "hidden";
            }
            counter++;
        });
    }

    /**
     * This function initializes a carousel element
     */
    this.init = function() {
        This.rotateSlides(0);
    }
    this.init();

    /**
     * These functions handle the starting event for the carousel to listen for (mousedown and touchstart)
     */
    This.carouselElement.addEventListener("mousedown", (e) => {
        if (This.active) {
            This.downHandler(e);
        }
    });
    This.carouselElement.addEventListener("touchstart", (e) => {
        if (This.active) {
            This.downHandler(e);
        }
    });

    /**
     * This function handles the starting event for the carousel
     * @param e {Event} The event object
     */
    this.downHandler = function (e) {
        e.preventDefault();
        window.cancelAnimationFrame(fadeAnimation);
        if (e.touches) {
            This.properties.xStart = e.touches[0].pageX;
        } else {
            This.properties.xStart = e.pageX;
        }

        document.addEventListener("mousemove", This.moveHandler);
        document.addEventListener("touchmove", This.moveHandler);
        document.addEventListener("mouseup", This.upHandler);
        document.addEventListener("touchend", This.upHandler);
    }

    /**
     * This variable is necessary to determine the rotation speed after disengaging the carousel and contains the starting time
     */
    let then;

    /**
     * This function rotates the carousel on a moving user interaction
     * @param e {Event} The event object
     */
    this.moveHandler = function (e) {
        if (then === undefined) {
            then = Date.now();
        }
        e.preventDefault();
        let xCoords;
        if (e.touches) {
            xCoords = e.touches[0].pageX;
        } else {
            xCoords = e.pageX;
        }
        let xDist = xCoords - This.properties.xStart;
        let angle = This.calculateAngle(xDist);
        let rotation = This.properties.startAngle + angle;

        This.rotateSlides(rotation);

        This.properties.currentAngle = rotation;
        let now = Date.now();
        This.calculateRPS(now, then);
        This.properties.lastAngle = rotation;
        then = now;
    }

    /**
     * This variable stores the requestAnimationFrame reference
     */
    let fadeAnimation;

    /**
     * This variable handles the user disengagement of the carousel
     * @param e {Event} The event object
     */
    this.upHandler = function (e) {
        document.removeEventListener("mousemove", This.moveHandler);
        document.removeEventListener("touchmove", This.moveHandler);
        document.removeEventListener("mouseup", This.upHandler);
        document.removeEventListener("touchend", This.upHandler);
        This.properties.startAngle = This.properties.lastAngle;
        fadeAnimation = window.requestAnimationFrame(() => {
            This.turnCarousel();
        });
    }

    /**
     * This function calculates the turn angle
     * @param xDist {Number} The horizontal distance of the user interaction
     * @return {number}
     */
    this.calculateAngle = function (xDist) {
        let oppositeLeg = xDist;
        let adjacentLeg = This.options.distanceZ * 16;
        let tanAlpha = oppositeLeg / adjacentLeg;
        let radians = Math.atan(tanAlpha);
        let alpha = radians * (180/Math.PI);
        let factor = 1.25;
        return alpha * factor;
    }

    /**
     * This function calculates the rotation speed (RPS = Rotations per Second)
     * @param then {Date} Starting time
     * @param now {Date} Current time
     */
    this.calculateRPS = function(then, now) {
        let time = then - now;
        let distance = This.properties.currentAngle - This.properties.lastAngle;
        let speed = distance / time;
        This.properties.rotationSpeed = speed * 10;
    }

    /**
     * This function handles the carousel turning animation after the user interaction stopped
     */
    this.turnCarousel = function () {
        let rotation = This.properties.startAngle + This.properties.rotationSpeed;
        This.rotateSlides(rotation);
        This.properties.startAngle = rotation;
        let relativeRotation = This.properties.startAngle % 360;
        let position = Math.round(relativeRotation / This.angleDistance);
        let wantedAngle = position * This.angleDistance;
        /*if (Math.abs(relativeRotation - wantedAngle) < 10) {
          This.properties.rotationSpeed *= 0.85;
        } else {
          This.properties.rotationSpeed *= 0.95;
        }
        */
        This.properties.rotationSpeed *= 0.95;
        //console.log(wantedAngle);
        if (Math.abs(This.properties.rotationSpeed) < 0.05 || isNaN(This.properties.rotationSpeed)) {
            window.cancelAnimationFrame(fadeAnimation);
        } else {
            fadeAnimation = window.requestAnimationFrame(() => {
                This.turnCarousel();
            });
        }
    }

    /**
     * This function returns a specific page of the carousel given a specific element selector and a search query (this is case insensitive!)
     * @param elementSelector {string} The element of the page that should be checked for its content
     * @param searchQuery {string} The string to check the content of the element of the page against
     * @return {HTMLElement}
     */
    this.getSlideByContent = function (elementSelector, searchQuery) {
        let wantedSlide = undefined;
        This.slides.forEach((slide) => {
            let searchElementContent = slide.querySelector(elementSelector).innerText;
            if (searchElementContent.toLowerCase() === searchQuery.toLowerCase()) {
                wantedSlide = slide;
            }
        });
        return wantedSlide;
    }

    /**
     * This function disables a given slide/page
     * @param slide {HTMLElement} The slide/page that should be disabled
     */
    this.disableSlide = function (slide) {
        if (slide.classList.contains("page")) {
            slide.classList.add("inactive");
            slide.querySelector(".secondary-button").classList.add("disabled");
        }
    }

    /**
     * This function enables a given slide/page
     * @param slide {HTMLElement} The slide/page that should be enabled
     */
    this.enableSlide = function (slide) {
        if (slide.classList.contains("page")) {
            slide.classList.remove("inactive");
            slide.querySelector(".secondary-button").classList.remove("disabled");
        }
    }

    /**
     * This function enables all the slides in this carousel
     */
    this.enableAllSlides = function () {
        This.slides.forEach((slide) => {
            slide.classList.remove("inactive");
            enableSecondaryButton(slide.querySelector(".secondary-button"));
        });
    }

    /**
     * This function activates this carousel (user interaction possible)
     */
    this.activateCarousel = function () {
        This.active = true;
        This.carouselElement.classList.add("active");
        This.carouselDeactivationButton.addEventListener("click", This.deactivateCarousel);
        This.carouselElement.parentElement.appendChild(this.carouselDeactivationButton);
    }

    /**
     * This function deactivates this carousel (user interaction not possible)
     */
    this.deactivateCarousel = function () {
        This.active = false;
        This.carouselElement.classList.remove("active");
        if (This.carouselElement.parentElement.querySelector(".primary-button.carousel-close")) {
            This.carouselDeactivationButton.removeEventListener("click", This.deactivateCarousel);
            This.carouselElement.parentElement.removeChild(This.carouselDeactivationButton);
            if (document.querySelector(".just-overlay")) {
                removeOverlay();
            }
        }
    }

    /**
     * This object saves the callbacks that get registered on carousel pages/slides
     * @type {{string:function}}
     */
    this.callbacks = {};

    /**
     * This function registers a callback on this carousel (element)
     * @param callback {function} The function reference that should be called after clicking on a carousel button
     */
    this.registerCallback = function (callback) {
        This.carouselElement.addEventListener("click", handleClick);
        This.callbacks[callback.toString()] = handleClick;

        function handleClick(e) {
            let target = e.target;
            while (target.nodeName !== "BODY" && !target.classList.contains("secondary-button")) {
                target = target.parentElement;
            }
            if (target.classList.contains("secondary-button")) {
                e.stopImmediatePropagation();
                callback(target);
            }
        }
    }

    /**
     * This function removes registered callbacks from this carousel (element)
     * @param callback
     */
    this.removeCallback = function (callback) {
        let listener = this.callbacks[callback.toString()];

        This.carouselElement.removeEventListener("click", listener);
        delete this.callbacks[callback.toString()];
    }

}

/**
 * This block initializes the (static) carousel elements on an application page
 */
let carouselContainers = document.querySelectorAll("div.carousel-container");
carouselContainers.forEach((cc) => {
    carousels.push(new Carousel(cc));
});

/**
 * This function returns a page/slide filtered by specific content of an element contained in the carousel
 * @param carouselElement {HTMLElement} The carousel which contains the slide
 * @param elementSelector {string} The element of the page that should be checked for its content
 * @param searchQuery {string} The string to check the content of the element of the page against
 * @return {HTMLElement}
 */
function getSlideByContent (carouselElement, elementSelector, searchQuery) {
    if (carouselElement.classList.contains("carousel-container")) {
        let slide = undefined;
        carousels.forEach((carousel) => {
            if (carousel.carouselElement === carouselElement) {
                slide = carousel.getSlideByContent(elementSelector, searchQuery);
            }
        });
        return slide;
    }
}

/**
 * This function enables all pages/slides in a given carousel
 * @param carouselElement {HTMLElement} The carousel element in which all pages/slides should be enabled
 */
function enableAllSlides(carouselElement) {
    if (carouselElement.classList.contains("carousel-container")) {
        carousels.forEach((carousel) => {
            if (carousel.carouselElement === carouselElement) {
                return carousel.enableAllSlides();
            }
        });
    }
}

/**
 * This function enables a given slide/page
 * @param slide {HTMLElement} The slide/page that should be enabled
 */
function enableSlide(slide) {
    if (typeof slide !== "undefined" && slide.classList.contains("page")) {
        slide.classList.remove("inactive");
        enableSecondaryButton(slide.querySelector(".secondary-button"));
    }
}

/**
 * This function disables a given slide/page
 * @param slide {HTMLElement} The slide/page that should be disabled
 */
function disableSlide(slide) {
    if (typeof slide !== "undefined" && slide.classList.contains("page")) {
        slide.classList.add("inactive");
        disableSecondaryButton(slide.querySelector(".secondary-button"));
    }
}

/**
 * This function activates a given carousel
 * @param carouselElement {HTMLElement} The carousel that should be activated
 */
function activateCarousel(carouselElement) {
    if (carouselElement.classList.contains("carousel-container")) {
        carousels.forEach((carousel) => {
            if (carousel.carouselElement === carouselElement) {
                carousel.activateCarousel();
            }
        });
    }
}

/**
 * This function deactivates a given carousel
 * @param carouselElement {HTMLElement} The carousel that should be deactivated
 */
function deactivateCarousel(carouselElement) {
    if (carouselElement.classList.contains("carousel-container")) {
        carousels.forEach((carousel) => {
            if (carousel.carouselElement === carouselElement) {
                carousel.deactivateCarousel();
            }
        });
    }
}

/**
 * This function registers a callback on a given carousel
 * @param carouselElement {HTMLElement} The carousel element that should have the given callback
 * @param callback {function} The function reference that should be called when the user clicks a button in the carousel
 */
function registerCallback(carouselElement, callback) {
    if (carouselElement.classList.contains("carousel-container")) {
        carousels.forEach((carousel) => {
            if (carousel.carouselElement === carouselElement) {
                carousel.registerCallback(callback);
            }
        });
    }
}

/**
 * This function removes a callback from the given carousel
 * @param carouselElement {HTMLElement} The carousel element from which the callback should be removed
 * @param callback {function} The function reference to be removed
 */
function removeCallback(carouselElement, callback) {
    if (carouselElement.classList.contains("carousel-container")) {
        carousels.forEach((carousel) => {
            if (carousel.carouselElement === carouselElement) {
                carousel.removeCallback(callback);
            }
        });
    }
}


/**
 * API:
 */
export {
    getSlideByContent,
    enableAllSlides,
    enableSlide,
    disableSlide,
    activateCarousel,
    deactivateCarousel,
    registerCallback,
    removeCallback
}
