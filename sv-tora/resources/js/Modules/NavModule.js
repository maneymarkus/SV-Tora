/**
 * DEPENDENCIES
 */

import { closeHeader } from "./HeaderModule";

/**
 * This Module contains code responsible for managing the navigation element of the websites
 */

let navObject = undefined;

let Nav = function (navElement) {
    let This = this;
    this.navElement = navElement;
    this.closeBtn = this.navElement.querySelector(".primary-button.close");
    this.navBgText = this.navElement.querySelector(".bg-text");

    /**
     * This function listens for clicks on the close button to close the navigation
     */
    this.closeBtn.addEventListener("click", function() {
        This.navElement.classList.remove("open");
        This.navElement.removeEventListener("mousemove", This.showBgText);
        closeHeader();
    });

    /**
     * This function handles the display of the ambient background text
     * @param e {Event} The event object
     */
    this.showBgText = function(e) {
        let target = e.target;
        while (target.nodeName !== "A" && target.nodeName !== "BODY") {
            target = target.parentNode;
        }
        if (target.nodeName === "BODY") {
            This.navBgText.innerHTML = "";
            return;
        }
        let text = target.innerText.trim();
        if (text.toLowerCase().indexOf("schließen") === -1) {
            This.navBgText.innerHTML = text;
        } else {
            This.navBgText.innerHTML = "";
        }
    }

    /**
     * This function opens the navigation
     */
    this.openNav = function () {
        this.navElement.classList.add("open");
        this.navElement.addEventListener("mousemove", this.showBgText);
    }

}

function openNav() {
    navObject.openNav();
}

let navElement = document.querySelector("nav.nav");
if (navElement) {
    navObject = new Nav(navElement);
}

/**
 * API:
 */
export {
    openNav
}
