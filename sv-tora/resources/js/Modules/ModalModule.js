/**
 * DEPENDENCIES
 */

import { generateElement, generalVariables } from "./GeneralModule";
import { createSecondaryButton } from "./SecondaryButtonModule";
import {registerTiltElement} from "./TiltModule";

/**
 * This Module contains code responsible for managing modal windows
 */

let modalTypes = generalVariables.modalTypes;

let body = document.querySelector("body");
let main = document.querySelector("main");

let modalWindows = [];

/**
 * This custom event fires when a modal is opened
 * @type {CustomEvent<unknown>}
 */
let openModalEvent = new CustomEvent("openModal", {
    bubbles: true,
    cancelable: true,
});

/**
 * This custom event fires when a modal is closed
 * @type {CustomEvent<unknown>}
 */
let closeModalEvent = new CustomEvent("closeModal", {
    bubbles: true,
    cancelable: true,
});

let ModalWindow = function (modalType, header, content, confirmationCallback, abortionCallback, confirmationCheck) {
    let This = this;
    this.modalType = modalType;
    this.overlay = ModalWindow.createModalWindow(modalType, header, content);
    this.modalWindowElement = this.overlay.querySelector("div.modal-window");
    this.mwHeader = this.modalWindowElement.querySelector(".mw-header");
    this.confirmationCallbackButton = this.modalWindowElement.querySelector(".secondary-button.confirmation-callback-button");
    this.abortionCallbackButton = this.modalWindowElement.querySelector(".secondary-button.abortion-callback-button");
    this.closeButton = this.modalWindowElement.querySelector(".primary-button.close-modal");

    this.closeButton.addEventListener("click", function () {
        if (This.modalType === modalTypes.INFO) {
            This.confirm();
        } else {
            This.abort();
        }
    });

    if (this.confirmationCallbackButton) {
        this.confirmationCallbackButton.addEventListener("click", function () {
            This.confirm();
        });
    }

    if (this.abortionCallbackButton) {
        this.abortionCallbackButton.addEventListener("click", function () {
            This.abort();
        });
    }

    /**
     * This function closes a modal window
     */
    this.closeModal = function () {
        if (This.mwHeader) {
            This.mwHeader.style.removeProperty("height");
        }
        This.modalWindowElement.dispatchEvent(closeModalEvent);
        This.overlay.classList.remove("open");
        if (main) {
            main.classList.remove("blur");
        }
        body.style.overflow = "auto";

        window.setTimeout(function() {
            This.overlay.remove();
            removeModal(This);
        }, 1000);
    }

    /**
     * This function opens a modal window
     */
    this.showModal = function () {
        if (main) {
            main.classList.add("blur");
        }
        body.style.overflow = "hidden";
        body.appendChild(This.overlay);
        This.modalWindowElement.dispatchEvent(openModalEvent);

        // the document needs this little time offset to apply animations
        window.setTimeout(function () {
            This.overlay.classList.add("open");
        }, 5);

        //after opening the modal window wait 1s to resize the header
        window.setTimeout(function () {
            This.resizeHeader();
        },1000);
    }
    this.showModal();

    /**
     * This function resizes the header of a modal window
     */
    this.resizeHeader = function () {
        let h2 = This.mwHeader.querySelector("h2");
        let headerHeight = h2.offsetHeight;
        This.mwHeader.style.height = headerHeight + "px";
    }

    this.confirm = function () {
        if (confirmationCheck && typeof confirmationCheck === "function") {
            if (confirmationCheck()) {
                This.closeModal();
                if (confirmationCallback && typeof confirmationCallback === "function") {
                    confirmationCallback();
                }
            }
        } else {
            This.closeModal();
            if (confirmationCallback && typeof confirmationCallback === "function") {
                confirmationCallback();
            }
        }
    }

    this.abort = function () {
        This.closeModal();
        if (abortionCallback && typeof abortionCallback === "function") {
            abortionCallback();
        }
    }

}

/**
 * This function creates a modal window element
 * @param modalType {string} Determines which modal window should be created
 * @param header {string} Sets the heading of the modal window
 * @param content {string || HTMLElement} Sets the content of the element which is either plain text or an HTML element for more complex usages
 */
ModalWindow.createModalWindow = function(modalType, header, content) {
    let overlay = generateElement("div", ["overlay"]);
    let baseModal;
    switch (modalType) {

        case modalTypes.DELETE:
            baseModal = createBaseModal(overlay, header, content);
            let deleteModalFooter = generateElement("div", ["mw-footer"]);
            let abortDeletionBtn = createSecondaryButton(["abort", "abortion-callback-button"], undefined, "Abbrechen");
            deleteModalFooter.appendChild(abortDeletionBtn);
            let deleteBtn = createSecondaryButton(["delete", "confirmation-callback-button"], undefined, "Löschen");
            deleteModalFooter.appendChild(deleteBtn);
            baseModal.querySelector(".mw-body").appendChild(deleteModalFooter);
            overlay.appendChild(baseModal);
            break;

        case modalTypes.CONFIRM:
            baseModal = createBaseModal(overlay, header, content);
            let confirmModalFooter = generateElement("div", ["mw-footer"]);
            let abortConfirmationBtn = createSecondaryButton(["abort", "accent-1", "abortion-callback-button"], undefined, "Abbrechen");
            confirmModalFooter.appendChild(abortConfirmationBtn);
            let confirmBtn = createSecondaryButton(["confirm", "confirmation-callback-button"], undefined, "OK");
            confirmModalFooter.appendChild(confirmBtn);
            baseModal.querySelector(".mw-body").appendChild(confirmModalFooter);
            overlay.appendChild(baseModal);
            break;

        case modalTypes.INFO:
            baseModal = createBaseModal(overlay, header, content);
            overlay.appendChild(baseModal);
            let infoModalFooter = generateElement("div", ["mw-footer"]);
            let infoModalBtn = createSecondaryButton(["confirm", "confirmation-callback-button"], undefined, "OK");
            infoModalFooter.appendChild(infoModalBtn);
            baseModal.querySelector(".mw-body").appendChild(infoModalFooter);
            break;

        case modalTypes.CUSTOM:
            baseModal = generateElement("div", ["modal-window", "custom-modal-window"]);
            overlay.appendChild(baseModal);
            let closeBtn = generateElement("a", ["primary-button", "close-modal", "close", "red"]);
            closeBtn.appendChild(generateElement("i", ["material-icons"], "close"));
            closeBtn.appendChild(generateElement("p", [], "Schließen"));
            baseModal.appendChild(closeBtn);

            if (content) {
                baseModal.appendChild(content);
            }

            break;
    }
    return overlay;
}

/**
 * This event listener is registered to detect the resize of the window
 */
window.addEventListener("resize", function () {
    modalWindows.forEach((modal) => {
        modal.resizeHeader();
    });
});

/**
 * This function creates the base modal same for all types of modals (header, close button, content container)
 * @param overlay {HTMLElement} The overlay to which the modal window should be appended
 * @param header {string} The heading of the modal window
 * @param content {string || HTMLElement} Sets the content of the element which is either plain text or an HTML element for more complex usages
 * @return {HTMLElement}
 */
function createBaseModal(overlay, header, content) {
    let modal = generateElement("div", ["modal-window"]);
    let closeBtn = generateElement("a", ["primary-button", "close-modal", "close", "red"]);
    closeBtn.appendChild(generateElement("i", ["material-icons"], "close"));
    closeBtn.appendChild(generateElement("p", [], "Schließen"));
    modal.appendChild(closeBtn);
    let modalHeader = generateElement("div", ["mw-header"]);
    modalHeader.appendChild(generateElement("h2", [], header));
    modal.appendChild(modalHeader);
    let modalBody = generateElement("div", ["mw-body"]);
    let modalContent = generateElement("div", ["mw-content"]);
    if (isElement(content)) {
        modalContent.appendChild(content);
        // workaround to display single (or two) select(s) without scroll bars
        if (content.classList.contains("select-input-container")) {
            modalContent.style.overflowY = "unset";
        }
    } else {
        modalContent.innerHTML = content;
    }
    modalBody.appendChild(modalContent);
    modal.appendChild(modalBody);
    return modal;
}

// see https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object for further information
function isElement(o){
    return (typeof HTMLElement === "object" ? o instanceof HTMLElement : o && typeof o === "object" && true && o.nodeType === 1 && typeof o.nodeName==="string");
}

let overlay = undefined;

/**
 * This function appends a generic overlay to the body element
 */
function appendOverlay() {
    if (!overlay) {
        overlay = generateElement("div", ["just-overlay"]);
    }
    body.appendChild(overlay);
    window.setTimeout(function () {
        overlay.classList.add("open");
    }, 5);
}

/**
 * This function removes a generic overlay from the body element
 */
function removeOverlay() {
    let overlay = document.querySelector(".just-overlay");
    overlay.classList.remove("open");
    window.setTimeout(function() {
        overlay.remove();
    }, 1000);
}


/**
 * This function removes a modal from the modalWindows array
 */
function removeModal(removeModal) {
    modalWindows.splice(modalWindows.indexOf(removeModal), 1);
    removeModal = undefined;
}

/**
 * This function creates and shows a delete modal window
 * @param header {string} Sets the heading of the modal window
 * @param content {string || HTMLElement} Sets the content of the element which is either plain text or an HTML element for more complex usages
 * @param deleteCallback {function} An optional function reference called when the modal window is "successfully" closed (e.g. delete modal was closed by clicking on "delete")
 * @param abortCallback {function} An optional function reference called when the modal window is "unsuccessfully" closed (e.g. delete modal was closed by clicking on "cancel")
 * @param confirmationCheck {function} An optional function reference called when the modal window is tried to be closed "successfully" and checks if the modal window is allowed to close "successfully" (e.g. check if all inputs are filled)
 */
function deleteModal(header, content, deleteCallback, abortCallback, confirmationCheck) {
    let newModal = new ModalWindow(modalTypes.DELETE, header, content, deleteCallback, abortCallback, confirmationCheck);
    modalWindows.push(newModal);
    return newModal;
}

/**
 * This function creates and show a confirmation modal window
 * @param header {string} Sets the heading of the modal window
 * @param content {string || HTMLElement} Sets the content of the element which is either plain text or an HTML element for more complex usages
 * @param confirmCallback {function} An optional function reference called when the modal window is "successfully" closed (e.g. delete modal was closed by clicking on "delete")
 * @param abortCallback {function} An optional function reference called when the modal window is "unsuccessfully" closed (e.g. delete modal was closed by clicking on "cancel")
 * @param confirmationCheck {function} An optional function reference called when the modal window is tried to be closed "successfully" and checks if the modal window is allowed to close "successfully" (e.g. check if all inputs are filled)
 */
function confirmModal(header, content, confirmCallback, abortCallback, confirmationCheck) {
    let newModal = new ModalWindow(modalTypes.CONFIRM, header, content, confirmCallback, abortCallback, confirmationCheck);
    modalWindows.push(newModal);
    return newModal;
}

/**
 * This function creates and shows an info modal window
 * @param header {string} Sets the heading of the modal window
 * @param content {string || HTMLElement} Sets the content of the element which is either plain text or an HTML element for more complex usages
 * @param callback {function} An optional function reference called when the modal window is "successfully" closed (the user clicked on "OK")
 */
function infoModal(header, content, callback) {
    let newModal = new ModalWindow(modalTypes.INFO, header, content, callback, undefined, undefined);
    modalWindows.push(newModal);
    return newModal;
}

/**
 * This function enables other Modules to create a custom modal window (this is basically just a big modal without any content yet except for a close button)
 * @param content {HTMLElement} The content that should be appended on this modal
 * @param abortCallback {function} An optional function reference called when the modal window is "unsuccessfully" closed (in this case the user clicked on the modal window close button)
 */
function customModal(content, abortCallback) {
    let newModal = new ModalWindow(modalTypes.CUSTOM, undefined, content, undefined, abortCallback, undefined);
    modalWindows.push(newModal);
    return newModal;
}

/**
 * API:
 */
export {
    deleteModal,
    confirmModal,
    infoModal,
    customModal,
    appendOverlay,
    removeOverlay,
}
