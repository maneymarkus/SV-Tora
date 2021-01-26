/**
 * This Module contains code responsible for managing modal windows
 */
var ModalModule = (function(window, document, undefined) {

  /**
   * DEPENDENCIES
   */
  let dependencies = ["SecondaryButtonModule"];
  GeneralModule.checkDependenciesApi(dependencies);

  let modalTypes = GeneralModule.generalVariables.modalTypes;

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
    let overlay = GeneralModule.generateElementApi("div", ["overlay"]);
    let baseModal = createBaseModal(overlay, header, content, noCallback);
    switch (modalType) {

      case modalTypes.DELETE:
        let deleteModalFooter = GeneralModule.generateElementApi("div", ["mw-footer"]);
        let abortDeletionBtn = SecondaryButtonModule.createSecondaryButtonApi(["abort"], undefined, "Abbrechen");
        deleteModalFooter.appendChild(abortDeletionBtn);
        abortDeletionBtn.addEventListener("click", function () {
          abortion(overlay, noCallback);
        });
        let deleteBtn = SecondaryButtonModule.createSecondaryButtonApi(["delete"], undefined, "Löschen");
        deleteModalFooter.appendChild(deleteBtn);
        deleteBtn.addEventListener("click", function () {
          confirmation(overlay, yesCallback, confirmationCheck);
        });
        baseModal.appendChild(deleteModalFooter);
        overlay.appendChild(baseModal);
        break;

      case modalTypes.CONFIRM:
        let confirmModalFooter = GeneralModule.generateElementApi("div", ["mw-footer"]);
        let abortConfirmationBtn = SecondaryButtonModule.createSecondaryButtonApi(["abort", "accent-1"], undefined, "Abbrechen");
        confirmModalFooter.appendChild(abortConfirmationBtn);
        abortConfirmationBtn.addEventListener("click", function () {
          abortion(overlay, noCallback);
        });
        let confirmBtn = SecondaryButtonModule.createSecondaryButtonApi(["confirm"], undefined, "OK");
        confirmModalFooter.appendChild(confirmBtn);
        confirmBtn.addEventListener("click", function () {
          confirmation(overlay, yesCallback, confirmationCheck);
        });
        baseModal.appendChild(confirmModalFooter);
        overlay.appendChild(baseModal);
        break;

      case modalTypes.INFO:
        overlay.appendChild(baseModal);
        let infoModalFooter = GeneralModule.generateElementApi("div", ["mw-footer"]);
        let infoModalBtn = SecondaryButtonModule.createSecondaryButtonApi(["confirm"], undefined, "OK");
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
    let modal = GeneralModule.generateElementApi("div", ["modal-window"]);
    let closeBtn = GeneralModule.generateElementApi("a", ["primary-button", "close-modal", "close", "red"]);
    closeBtn.appendChild(GeneralModule.generateElementApi("i", ["material-icons"], "close"));
    closeBtn.appendChild(GeneralModule.generateElementApi("p", [], "Schließen"));
    modal.appendChild(closeBtn);
    closeBtn.addEventListener("click", function () {
      abortion(overlay, noCallback);
    });
    let modalHeader = GeneralModule.generateElementApi("div", ["mw-header"]);
    modalHeader.appendChild(GeneralModule.generateElementApi("h2", [], header));
    modal.appendChild(modalHeader);
    let modalContent = GeneralModule.generateElementApi("div", ["mw-content"]);
    if (isElement(content)) {
      modalContent.appendChild(content);
      // workaround to display single (or two) select(s) without scroll bars
      if (content.classList.contains("select-input-container")) {
        modalContent.style.overflowY = "unset";
      }
    } else {
      modalContent.appendChild(GeneralModule.generateElementApi("p", [], content));
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
    let mwHeader = overlay.querySelector(".mw-header");
    mwHeader.style.removeProperty("height");
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
      let mwHeader = overlay.querySelector(".mw-header");
      let h2 = overlay.querySelector(".mw-header h2");
      let headerHeight = h2.offsetHeight;
      mwHeader.style.height = headerHeight + "px";
    });
  }

  /**
   * This function appends a generic overlay to the body element
   */
  function appendOverlay() {
    if (!overlay) {
      overlay = GeneralModule.generateElementApi("div", ["just-overlay"]);
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
   * API:
   */
  return {
    /**
     * This api function creates and shows a delete modal window
     * @param header {string} Sets the heading of the modal window
     * @param content {string || HTMLElement} Sets the content of the element which is either plain text or an HTML element for more complex usages
     * @param deleteCallback {function} An optional function reference called when the modal window is "successfully" closed (e.g. delete modal was closed by clicking on "delete")
     * @param abortCallback {function} An optional function reference called when the modal window is "unsuccessfully" closed (e.g. delete modal was closed by clicking on "cancel")
     * @param confirmationCheck {function} An optional function reference called when the modal window is tried to be closed "successfully" and checks if the modal window is allowed to close "successfully" (e.g. check if all inputs are filled)
     */
    deleteModalApi : function (header, content, deleteCallback, abortCallback, confirmationCheck) {
      createModalFactory(modalTypes.DELETE, header, content, deleteCallback, abortCallback, confirmationCheck);
    },
    /**
     * This api function creates and show a confirmation modal window
     * @param header {string} Sets the heading of the modal window
     * @param content {string || HTMLElement} Sets the content of the element which is either plain text or an HTML element for more complex usages
     * @param confirmCallback {function} An optional function reference called when the modal window is "successfully" closed (e.g. delete modal was closed by clicking on "delete")
     * @param abortCallback {function} An optional function reference called when the modal window is "unsuccessfully" closed (e.g. delete modal was closed by clicking on "cancel")
     * @param confirmationCheck {function} An optional function reference called when the modal window is tried to be closed "successfully" and checks if the modal window is allowed to close "successfully" (e.g. check if all inputs are filled)
     */
    confirmModalApi : function (header, content, confirmCallback, abortCallback, confirmationCheck) {
      return createModalFactory(modalTypes.CONFIRM, header, content, confirmCallback, abortCallback, confirmationCheck);
    },
    /**
     * This api function creates and shows an info modal window
     * @param header {string} Sets the heading of the modal window
     * @param content {string || HTMLElement} Sets the content of the element which is either plain text or an HTML element for more complex usages
     * @param callback {function} An optional function reference called when the modal window is "successfully" closed (the user clicked on "OK")
     */
    infoModalApi : function (header, content, callback) {
      createModalFactory(modalTypes.INFO, header, content, callback, undefined, undefined);
    },
    /**
     * This api function appends a generic overlay to the body element
     */
    appendOverlayApi : function () {
      appendOverlay();
    },
    /**
     * This api function removes a generic overlay from the body element
     */
    removeOverlayApi : function () {
      removeOverlay();
    }
  }

})(window, document);