/**
 * DEPENDENCIES
 */

import { generateElement, generalVariables } from "./GeneralModule";
import { createSecondaryButton } from "./SecondaryButtonModule";

/**
 * This Module contains code responsible for managing modal windows
 */

let modalTypes = generalVariables.modalTypes;

let body = document.querySelector("body");
let main = document.querySelector("main");

let overlay = undefined;

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

/**
 * This event listener is registered to detect the resize of the window
 */
window.addEventListener("resize", resizeHeaders);

/**
 * This function creates a modal window element
 * @param modalType {string} Determines which modal window should be created
 * @param header {string} Sets the heading of the modal window
 * @param content {string || HTMLElement} Sets the content of the element which is either plain text or an HTML element for more complex usages
 * @param yesCallback {function} An optional function reference called when the modal window is "successfully" closed (e.g. delete modal was closed by clicking on "delete")
 * @param noCallback {function} An optional function reference called when the modal window is "unsuccessfully" closed (e.g. delete modal was closed by clicking on "cancel")
 * @param confirmationCheck {function} An optional function reference called when the modal window is tried to be closed "successfully" and checks if the modal window is allowed to close "successfully" (e.g. check if all inputs are filled)
 */
function createModalFactory(modalType, header, content, yesCallback, noCallback, confirmationCheck) {
    let overlay = generateElement("div", ["overlay"]);
    let baseModal;
    switch (modalType) {

        case modalTypes.DELETE:
            baseModal = createBaseModal(overlay, header, content, noCallback);
            let deleteModalFooter = generateElement("div", ["mw-footer"]);
            let abortDeletionBtn = createSecondaryButton(["abort"], undefined, "Abbrechen");
            deleteModalFooter.appendChild(abortDeletionBtn);
            abortDeletionBtn.addEventListener("click", function () {
                abortion(overlay, noCallback);
            });
            let deleteBtn = createSecondaryButton(["delete"], undefined, "Löschen");
            deleteModalFooter.appendChild(deleteBtn);
            deleteBtn.addEventListener("click", function () {
                confirmation(overlay, yesCallback, confirmationCheck);
            });
            baseModal.appendChild(deleteModalFooter);
            overlay.appendChild(baseModal);
            break;

        case modalTypes.CONFIRM:
            baseModal = createBaseModal(overlay, header, content, noCallback);
            let confirmModalFooter = generateElement("div", ["mw-footer"]);
            let abortConfirmationBtn = createSecondaryButton(["abort", "accent-1"], undefined, "Abbrechen");
            confirmModalFooter.appendChild(abortConfirmationBtn);
            abortConfirmationBtn.addEventListener("click", function () {
                abortion(overlay, noCallback);
            });
            let confirmBtn = createSecondaryButton(["confirm"], undefined, "OK");
            confirmModalFooter.appendChild(confirmBtn);
            confirmBtn.addEventListener("click", function () {
                confirmation(overlay, yesCallback, confirmationCheck);
            });
            baseModal.appendChild(confirmModalFooter);
            overlay.appendChild(baseModal);
            break;

        case modalTypes.INFO:
            baseModal = createBaseModal(overlay, header, content, noCallback);
            overlay.appendChild(baseModal);
            let infoModalFooter = generateElement("div", ["mw-footer"]);
            let infoModalBtn = createSecondaryButton(["confirm"], undefined, "OK");
            infoModalFooter.appendChild(infoModalBtn);
            infoModalBtn.addEventListener("click", function () {
                if (yesCallback) {
                    yesCallback();
                }
                closeModalWindow(overlay);
            });
            baseModal.querySelector("a.close").addEventListener("click", function () {
                if (yesCallback) {
                    yesCallback();
                }
            });
            baseModal.appendChild(infoModalFooter);
            break;

        case modalTypes.CUSTOM:
            baseModal = generateElement("div", ["modal-window", "custom-modal-window"]);
            overlay.appendChild(baseModal);
            let closeBtn = generateElement("a", ["primary-button", "close-modal", "close", "red"]);
            closeBtn.appendChild(generateElement("i", ["material-icons"], "close"));
            closeBtn.appendChild(generateElement("p", [], "Schließen"));
            baseModal.appendChild(closeBtn);
            closeBtn.addEventListener("click", function () {
                abortion(overlay, noCallback);
            });


            if (content) {
                baseModal.appendChild(content);
            }

            break;

    }
    showModalWindow(overlay);
}

/**
 * This function creates the base modal same for all types of modals (header, close button, content container)
 * @param overlay {HTMLElement} The overlay to which the modal window should be appended
 * @param header {string} The heading of the modal window
 * @param content {string || HTMLElement} Sets the content of the element which is either plain text or an HTML element for more complex usages
 * @param noCallback {function} An optional function reference called when the modal window is "unsuccessfully closed" (e.g. delete modal was closed by clicking on "cancel")
 * @return {HTMLElement}
 */
function createBaseModal(overlay, header, content, noCallback) {
    let modal = generateElement("div", ["modal-window"]);
    let closeBtn = generateElement("a", ["primary-button", "close-modal", "close", "red"]);
    closeBtn.appendChild(generateElement("i", ["material-icons"], "close"));
    closeBtn.appendChild(generateElement("p", [], "Schließen"));
    modal.appendChild(closeBtn);
    closeBtn.addEventListener("click", function () {
        abortion(overlay, noCallback);
    });
    let modalHeader = generateElement("div", ["mw-header"]);
    modalHeader.appendChild(generateElement("h2", [], header));
    modal.appendChild(modalHeader);
    let modalContent = generateElement("div", ["mw-content"]);
    if (isElement(content)) {
        modalContent.appendChild(content);
        // workaround to display single (or two) select(s) without scroll bars
        if (content.classList.contains("select-input-container")) {
            modalContent.style.overflowY = "unset";
        }
    } else {
        modalContent.appendChild(generateElement("p", [], content));
    }
    modal.appendChild(modalContent);
    return modal;
}

// see https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object for further information
function isElement(o){
    return (typeof HTMLElement === "object" ? o instanceof HTMLElement : o && typeof o === "object" && true && o.nodeType === 1 && typeof o.nodeName==="string");
}

/**
 * This function aborts a modal window (modal window is now closed "unsuccessfully")
 * @param overlay {HTMLElement} The respective overlay (parent) element of the modal which should be closed
 * @param noCallback {function} An optional function reference called when the modal window is "unsuccessfully closed" (e.g. delete modal was closed by clicking on "cancel")
 */
function abortion(overlay, noCallback) {
    closeModalWindow(overlay);
    if (noCallback) {
        noCallback();
    }
}

/**
 * This function closes a modal window "successfully" (e.g. clicking on "delete")
 * @param overlay {HTMLElement} The respective overlay (parent) element of the modal which should be closed
 * @param yesCallback {function} An optional function reference called when the modal window is "successfully" closed (e.g. delete modal was closed by clicking on "delete")
 * @param confirmationCheck {function} An optional function reference called when the modal window is tried to be closed "successfully" and checks if the modal window is allowed to close "successfully" (e.g. check if all inputs are filled)
 */
function confirmation(overlay, yesCallback, confirmationCheck) {
    if (confirmationCheck && typeof confirmationCheck === "function") {
        if (confirmationCheck()) {
            closeModalWindow(overlay);
            yesCallback();
        }
    } else {
        closeModalWindow(overlay);
        yesCallback();
    }
}

/**
 * This function universally closes a modal window
 * @param overlay {HTMLElement} The respective overlay (parent) element of the modal which should be closed
 */
function closeModalWindow(overlay) {
    if (overlay.querySelector(".mw-header")) {
        let mwHeader = overlay.querySelector(".mw-header");
        mwHeader.style.removeProperty("height");
    }
    overlay.querySelector("div.modal-window").dispatchEvent(closeModalEvent);
    overlay.classList.remove("open");
    if (main) {
        main.classList.remove("blur");
    }

    window.setTimeout(function() {
        overlay.remove();
    }, 1000);
}

/**
 * This function shows a modal window
 * @param overlay {HTMLElement} The respective overlay (parent) element of the modal which should be closed
 */
function showModalWindow(overlay) {
    if (main) {
        main.classList.add("blur");
    }
    body.appendChild(overlay);
    overlay.querySelector("div.modal-window").dispatchEvent(openModalEvent);

    // the document needs this little time offset to apply animations
    window.setTimeout(function () {
        overlay.classList.add("open");
    }, 5);

    //after opening the modal window wait 1s to resize the header
    window.setTimeout(function () {
        resizeHeaders(overlay);
    },1000);
}

/**
 * This function handles the resize of the window to resize all the headers of the modal windows currently active
 */
function resizeHeaders() {
    let overlays = document.querySelectorAll(".overlay");
    overlays.forEach((overlay) => {
        if (overlay.querySelector(".mw-header")) {
            let mwHeader = overlay.querySelector(".mw-header");
            let h2 = overlay.querySelector(".mw-header h2");
            let headerHeight = h2.offsetHeight;
            mwHeader.style.height = headerHeight + "px";
        }
    });
}

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
 * This function creates and shows a delete modal window
 * @param header {string} Sets the heading of the modal window
 * @param content {string || HTMLElement} Sets the content of the element which is either plain text or an HTML element for more complex usages
 * @param deleteCallback {function} An optional function reference called when the modal window is "successfully" closed (e.g. delete modal was closed by clicking on "delete")
 * @param abortCallback {function} An optional function reference called when the modal window is "unsuccessfully" closed (e.g. delete modal was closed by clicking on "cancel")
 * @param confirmationCheck {function} An optional function reference called when the modal window is tried to be closed "successfully" and checks if the modal window is allowed to close "successfully" (e.g. check if all inputs are filled)
 */
function deleteModal(header, content, deleteCallback, abortCallback, confirmationCheck) {
    createModalFactory(modalTypes.DELETE, header, content, deleteCallback, abortCallback, confirmationCheck);
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
    createModalFactory(modalTypes.CONFIRM, header, content, confirmCallback, abortCallback, confirmationCheck);
}

/**
 * This function creates and shows an info modal window
 * @param header {string} Sets the heading of the modal window
 * @param content {string || HTMLElement} Sets the content of the element which is either plain text or an HTML element for more complex usages
 * @param callback {function} An optional function reference called when the modal window is "successfully" closed (the user clicked on "OK")
 */
function infoModal(header, content, callback) {
    createModalFactory(modalTypes.INFO, header, content, callback, undefined, undefined);
}

/**
 * This function enables other Modules to create a custom modal window (this is basically just a big modal without any content yet except for a close button)
 * @param content {HTMLElement} The content that should be appended on this modal
 * @param abortCallback {function} An optional function reference called when the modal window is "unsuccessfully" closed (in this case the user clicked on the modal window close button)
 */
function customModal(content, abortCallback) {
    createModalFactory(modalTypes.CUSTOM, undefined, content, undefined, abortCallback, undefined);
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
    closeModalWindow
}
