/**
 * DEPENDENCIES
 */

import { openNav } from "./NavModule";

/**
 * This Module contains code responsible for managing the application header on each page
 */

let headerObject = undefined;

let Header = function(headerElement) {
    let This = this;
    this.headerElement = headerElement;
    this.userMenu = this.headerElement.querySelector("div.user-profile");
    this.navBtn = this.headerElement.querySelector("a.menu");
    this.userBtn = this.headerElement.querySelector("a.profile");

    /**
     * This function handles clicks on the navigation button (mainly opening the navigation)
     */
    if (this.navBtn) {
        this.navBtn.addEventListener("click", function () {
            openNav();
            This.headerElement.classList.add("open-menu");
        });
    }

    /**
     * This function handles clicks on the user profile button (mainly opening the user profile)
     */
    if (this.userBtn) {
        this.userBtn.addEventListener("click", function () {
            This.userMenu.classList.toggle("open");
            if (This.userMenu.classList.contains("open")) {
                This.headerElement.classList.add("open-menu");
            } else {
                This.headerElement.classList.remove("open-menu");
            }
        });
    }

    /**
     * This function handles the closing of header elements like the navigation and the user profile
     */
    this.closeHeader = function() {
        this.userMenu.classList.remove("open");
        this.headerElement.classList.remove("open-menu");
    }

}

let headerElement = document.querySelector("header.header");
if (headerElement) {
    headerObject = new Header(headerElement);
}

function closeHeader(target) {
    if (target) {
        let t = target;
        if (t && t.nodeName !== "HEADER") {
            while (t && t.nodeName !== "HEADER") {
                t = t.parentNode;
            }
        }
        if (!t || t.nodeName === "BODY") {
            headerObject.closeHeader(target);
        }
    } else {
        headerObject.closeHeader(target);
    }
}

/**
 * API:
 */
export {
    closeHeader
}
