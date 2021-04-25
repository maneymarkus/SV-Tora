/**
 * DEPENDENCIES
 */

import * as GeneralModule from "./GeneralModule";

/**
 * This Module contains code responsible for managing application specific context menus
 */

let contextMenus = [];


/**
 * Collection of relevant class names
 * @type {string}
 */
let contextMenuClassName = "context-menu";
let contextMenuItemsClassName = "context-menu-items";
let contextMenuItemClassName = "context-menu__item";
let contextMenuAClassName = "context-menu__option";
let contextMenuActiveClassName = "context-menu--active";

let body = document.querySelector("body");


/**
 * This "class" represents a displayed context menu element and enables a detailed control over it
 * @param contextElement {HTMLElement} The responsible element that triggered the context menu
 * @param optionsObject {Object} This object contains the options the context menu should display. Each key represents the textual option and the responsible value contains the callback function that is being called when an option is chosen
 * @param triggerSelector {String} An optional string that contains the selector of the element that actually triggers the element (Use case: only specific child elements in a container element should trigger a context menu but not the container element itself)
 * @constructor
 */
let ContextMenu = function (contextElement, optionsObject, triggerSelector) {
    let This = this;
    this.contextParentElement = contextElement;
    this.clickedContextElement = undefined;
    this.triggerElements = undefined;
    this.contextMenuElement = ContextMenu.createContextMenu(Object.keys(optionsObject));
    this.contextOptions = optionsObject;
    this.active = false;
    this.id = GeneralModule.createUniqueRandomIdentifier();
    this.contextMenuElement.id = this.id;

    this.init = function () {
        body.appendChild(This.contextMenuElement);

        This.contextParentElement.addEventListener("click", This.triggerHandler);

        if (triggerSelector) {
            This.triggerElements = Array.from(This.contextParentElement.querySelectorAll(triggerSelector));
        }

    }

    this.triggerHandler = function (e) {
        e.stopImmediatePropagation();
        closeAllContextMenusExcept(This);
        let target = e.target;
        if (This.triggerElements) {
            while (target !== This.contextParentElement && !This.triggerElements.includes(target)) {
                target = target.parentElement;
            }
            if (target === This.contextParentElement) {
                closeAllContextMenusExcept();
                return;
            }
        }
        This.clickedContextElement = e.target;
        This.contextMenuElement.addEventListener("click", This.clickHandler);
        let coords = {x: e.pageX, y:e.pageY};
        This.positionContextMenu(coords);

        // This little "break" ensures that it animates its position only when it has been active
        window.setTimeout(This.showContextMenu, 5);
    }

    this.clickHandler = function (e) {
        let target = e.target;
        while (target.nodeName !== "BODY" && !target.classList.contains(contextMenuAClassName)) {
            target = target.parentElement;
        }
        if (target.classList.contains(contextMenuAClassName)) {
            let chosenOption = target.innerText;
            let callback = This.contextOptions[chosenOption];

            if (callback) {
                callback(This.clickedContextElement);
            }
            This.closeContextMenu();
        } else {
            This.closeContextMenu();
        }
    }

    this.closeContextMenu = function () {
        if (This.active) {
            This.clickedContextElement = undefined;
            This.contextMenuElement.classList.remove(contextMenuActiveClassName);
            This.active = false;
            This.contextMenuElement.removeEventListener("click", This.clickHandler);
        }
    }

    this.showContextMenu = function () {
        This.contextMenuElement.classList.add(contextMenuActiveClassName);
        This.active = true;
    }

    this.positionContextMenu = function (coords) {
        let menuWidth = This.contextMenuElement.offsetWidth;
        let menuHeight = This.contextMenuElement.offsetHeight;
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        let x = coords.x;
        let y = coords.y;

        if ((windowWidth - x) < menuWidth) {
            This.contextMenuElement.style.left = windowWidth - menuWidth + "px";
        } else {
            This.contextMenuElement.style.left = x + "px";
        }

        if ((windowHeight - y) < menuHeight) {
            This.contextMenuElement.style.top = windowHeight - menuHeight + "px";
        } else {
            This.contextMenuElement.style.top = y + "px";
        }

    }

    this.removeContextMenu = function () {
        This.contextParentElement.removeEventListener("click", This.triggerHandler);
    }

    this.init();

}

/**
 * This function creates a context menu HTML element
 * @param options {String[]} An array of string containing the different options the content menu should display
 */
ContextMenu.createContextMenu = function (options) {
    let menu = GeneralModule.generateElement("nav", [contextMenuClassName]);
    let ul = GeneralModule.generateElement("ul", [contextMenuItemsClassName]);

    options.forEach((option) => {
        let li = GeneralModule.generateElement("li", [contextMenuItemClassName]);
        let a = GeneralModule.generateElement("a", [contextMenuAClassName], option);
        li.appendChild(a);
        menu.appendChild(li);
    });

    menu.appendChild(ul);

    return menu;
}

function closeAllContextMenusExcept(exception) {
    if (contextMenus.length > 0) {
        contextMenus.forEach((contextMenu) => {
            if (contextMenu !== exception) {
                contextMenu.closeContextMenu();
            }
        });
    }
}


// close all open context menus
document.addEventListener("click", function (e) {
    closeAllContextMenusExcept(undefined);
});

/**
 * This function enables other modules to trigger custom context menus on given context elements
 * @param contextElement {HTMLElement} The responsible element that triggered the context menu
 * @param optionsObject {Object} This object contains the options the context menu should display. Each key represents the textual option and the responsible value contains the callback function that is being called when an option is chosen
 * @param triggerSelector {String} An optional string that contains the selector of the element that actually triggers the element (Use case: only specific child elements in a container element should trigger a context menu but not the container element itself)
 */
function registerNewContextMenu(contextElement, optionsObject, triggerSelector) {
    contextMenus.forEach((contextMenu) => {
        if (contextMenu.contextParentElement === contextElement) {
            removeContextMenu(contextElement);
        }
    });
    contextMenus.push(new ContextMenu(contextElement, optionsObject, triggerSelector));
}

/**
 * This function removes a prior registered context menu on a context element
 * @param contextElement {HTMLElement} The element that has a custom context menu that should be removes
 */
function removeContextMenu(contextElement) {
    contextMenus.forEach((contextMenu) => {
        if (contextMenu.contextParentElement === contextElement) {
            contextMenu.removeContextMenu();
            contextMenus.splice(contextMenus.indexOf(contextMenu), 1);
            contextMenu = undefined;
        }
    });
}

/**
 * API:
 */
export {
    registerNewContextMenu,
    removeContextMenu
}
