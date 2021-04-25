/**
 * DEPENDENCIES
 */

/**
 * This Module contains code responsible for managing accordions
 */

let accordions = [];

/**
 * This "class" represents a application specific displayed HTML accordion element and enables a detailed control over it
 * @param accordion {HTMLElement} The respective HTML element this object represents
 * @constructor
 */
let Accordion = function(accordion) {
    let This = this;
    this.accordionElement = accordion;
    this.accordionBars = this.accordionElement.querySelectorAll(".accordion-bar");

    this.openBar = undefined;
    this.sliding = false;

// This boolean is true if the bar should stay open, e.g. when clicked on a tool
    this.stayOpen = false;

    /**
     * This function adds an additional accordion bar to the accordion
     * @param nextBarSibling {HTMLElement} The next html element sibling which the new bar should be inserted before
     * @param heading {string | HTMLElement} The heading of the new bar. Can be either a simple string or an HTML element for more complex usages
     * @param content {HTMLElement} The content of the new bar
     * @return {HTMLElement}
     */
    this.addAccordionBar = function (nextBarSibling, heading, content) {
        let newBar = GeneralModule.generateElement("DIV", ["accordion-bar", "clearfix"]);
        let newHeader = GeneralModule.generateElement("DIV", ["bar-header", "clearfix"]);
        let barIcon = GeneralModule.generateElement("I", ["material-icons", "open-indicator"], "keyboard_arrow_down");
        newHeader.appendChild(barIcon);
        if (typeof heading === "string") {
            let barHeaderContent = GeneralModule.generateElement("h4", ["heading"], heading);
        } else {
            newHeader.appendChild(heading);
        }

        newBar.appendChild(newHeader);
        let newContent = GeneralModule.generateElement("DIV", ["bar-content"]);
        newContent.appendChild(content);
        newBar.appendChild(newContent);
        This.accordionElement.insertBefore(newBar, nextBarSibling);
        This.accordionBars = This.accordionElement.querySelectorAll(".accordion-bar");
        return newBar;
    }

    /**
     * This function manages clicks on the accordion element and controls its behavior
     */
    this.accordionElement.addEventListener("click", function (e) {
        let target = e.target;
        e.preventDefault();
        while (target.nodeName !== "BODY" && !target.classList.contains("bar-header")) {
            target = target.parentNode;
        }

        // the bar header is clicked
        if (target.classList.contains("bar-header")) {
            // This timeout enables other modules to individually set the stayOpen property e.g. and to have it a real effect
            window.setTimeout( function () {
                // if the clicked bar is NOT open and NO other bars should stay open and any possible frontend sliding animations are done
                if (!target.parentElement.classList.contains("open") && !This.stayOpen && !This.sliding) {
                    This.hideAllExcept(This, target.parentElement);
                    This.show(target.parentElement);
                } else {
                    if (!This.stayOpen && !This.sliding) {
                        This.hide(target.parentElement);
                    }
                }
            },20);
            return;
        }
    });

    /**
     * This function deletes a given accordion bar
     * @param accordionBar {HTMLElement} This bar will be deleted
     */
    this.deleteAccordionBar = function (accordionBar) {
        if (accordionBar.classList.contains("accordion-bar")) {
            accordionBar.remove();
            This.accordionBars = This.accordionElement.querySelectorAll(".accordion-bar");
        }
    }

};

/**
 * This function handles the behavior of showing an accordion bar
 * @param accordionBar {HTMLElement} This given accordion bar will be shown
 */
Accordion.prototype.show = function (accordionBar) {
    let This = this;
    this.openBar = accordionBar;
    this.sliding = true;
    accordionBar.classList.add("open");
    let content = accordionBar.querySelector("div.bar-content");
    let getHeight = function () {
        content.style.display = "block";
        return content.scrollHeight;
    };
    content.style.height = getHeight() + "px";
    document.getElementsByTagName("BODY")[0].classList.add("open-accordion");
    window.setTimeout(function () {
        This.sliding = false;
    }, 500);
};

/**
 * This function handles the behaviour of hiding an accordion bar
 * @param accordionBar {HTMLElement} This given bar will be hidden
 */
Accordion.prototype.hide = function (accordionBar) {
    let This = this;
    this.openBar = undefined;
    this.sliding = true;
    accordionBar.classList.remove("open");
    let content = accordionBar.querySelector("div.bar-content");
    content.style.height = "0";
    document.getElementsByTagName("BODY")[0].classList.remove("open-accordion");

    window.setTimeout(function () {
        content.style.display = "none";
        This.sliding = false;
    }, 500);
};

/**
 * This function will hide all accordion bars except the given one
 * @param accordion {object} The containing accordion object
 * @param accordionBar {HTMLElement} The accordion bar which should stay open
 */
Accordion.prototype.hideAllExcept = function(accordion, accordionBar) {
    if (accordion.accordionElement.classList.contains("accordion") && accordionBar.classList.contains("accordion-bar")) {
        let openBars = document.querySelectorAll(".open");
        openBars.forEach(function (bar) {
            if (bar !== accordionBar) {
                bar.classList.remove("open");
                accordion.hide(bar);
            }
        });
    }
};

/**
 * This function returns the currently open bar
 * @return {Element}
 */
function getOpenBar() {
    let openBar = document.querySelector("div.accordion-bar.open");
    return openBar;
}

/**
 * This api function returns the respective accordion object to a given accordion html element
 * @param accordionElement {HTMLElement} The respective html element to which the responsible accordion object should be found
 * @return {object}
 */
function getAccordionObject(accordionElement) {
    if (accordionElement.classList.contains("accordion")) {
        let wantedAccordion = undefined;
        accordions.forEach((accordion) => {
            if (accordion.accordionElement === accordionElement) {
                wantedAccordion = accordion;
            }
        });
        return wantedAccordion;
    }
}

/**
 * This function inserts a new accordion bar on a given accordion html element
 * @param accordionElement {HTMLElement} The accordion on which the new bar should be inserted
 * @param nextBarSibling {HTMLElement} The next html element sibling which the new bar should be inserted before
 * @param heading {string | HTMLElement} The heading of the new bar. Can be either a simple string or an HTML element for more complex usages
 * @param content {HTMLElement} The content of the new bar
 */
function insertNewCategoryBar(accordionElement, nextBarSibling, heading, content) {
    if (accordionElement.classList.contains("accordion")) {
        accordions.forEach(function (acc) {
            if (acc.accordionElement === accordionElement) {
                acc.addAccordionBar(nextBarSibling, heading, content);
            }
        });
    }
}

/**
 * This function deletes a given accordion bar from a given accordion html element
 * @param accordionElement {HTMLElement} The html accordion element from which the bar should be deleted
 * @param accordionBar {HTMLElement} The bar that should be deleted
 */
function deleteCategoryBar(accordionElement, accordionBar) {
    accordions.forEach((acc) => {
        if (acc.accordionElement === accordionElement) {
            acc.deleteAccordionBar(accordionBar);
        }
    });
}


/**
* This block initializes the static accordion elements on an application page
*/
let accordionElements = document.querySelectorAll("div.accordion");
accordionElements.forEach(function (accordion) {
    accordions.push(new Accordion(accordion));
});


/**
 * API:
 */
export {
    getAccordionObject,
    getOpenBar,
    insertNewCategoryBar,
    deleteCategoryBar
}
