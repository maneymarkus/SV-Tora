/*
  Dependencies: GeneralModule
 */

if (typeof GeneralModule === "undefined") {
  console.log("Missing GeneralModule Dependency!");
}

let ModalModule = (function(window, document, undefined) {

  let modalTypes = GeneralModule.generalVariables.modalTypes;

  let body = document.querySelector("body");
  let main = document.querySelector("main");

  function createModalFactory(modalType, header, content, yesCallback, noCallback) {
    let overlay = GeneralModule.generateElementApi("div", ["overlay"]);
    let baseModal = createBaseModal(overlay, header, content, noCallback);
    switch (modalType) {

      case modalTypes.DELETE:
        let deleteModalFooter = GeneralModule.generateElementApi("div", ["mw-footer"]);
        let abortDeletionBtn = GeneralModule.generateElementApi("a", ["secondary-button"]);
        abortDeletionBtn.appendChild(GeneralModule.generateElementApi("span", ["text"], "Abbrechen"));
        deleteModalFooter.appendChild(abortDeletionBtn);
        abortDeletionBtn.addEventListener("click", function () {
          abortion(overlay, noCallback);
        });
        let deleteBtn = GeneralModule.generateElementApi("a", ["secondary-button", "delete"]);
        deleteBtn.appendChild(GeneralModule.generateElementApi("span", ["text"], "Löschen"));
        deleteModalFooter.appendChild(deleteBtn);
        deleteBtn.addEventListener("click", function () {
          confirmation(overlay, yesCallback);
        });
        baseModal.appendChild(deleteModalFooter);
        overlay.appendChild(baseModal);
        break;

      case modalTypes.CONFIRM:
        let confirmModalFooter = GeneralModule.generateElementApi("div", ["mw-footer"]);
        let abortConfirmationBtn = GeneralModule.generateElementApi("a", ["secondary-button", "abort"]);
        abortConfirmationBtn.appendChild(GeneralModule.generateElementApi("span", ["text"], "Abbrechen"));
        confirmModalFooter.appendChild(abortConfirmationBtn);
        abortConfirmationBtn.addEventListener("click", function () {
          abortion(overlay, noCallback);
        });
        let confirmBtn = GeneralModule.generateElementApi("a", ["secondary-button"]);
        confirmBtn.appendChild(GeneralModule.generateElementApi("span", ["text"], "OK"));
        confirmModalFooter.appendChild(confirmBtn);
        confirmBtn.addEventListener("click", function () {
          confirmation(overlay, yesCallback);
        });
        baseModal.appendChild(confirmModalFooter);
        overlay.appendChild(baseModal);
        break;

      case modalTypes.INFO:
        overlay.appendChild(baseModal);
        break;
    }
    showModalWindow(overlay);
  }

  function createBaseModal(overlay, header, content, noCallback) {
    let modal = GeneralModule.generateElementApi("div", ["modal-window"]);
    let closeBtn = GeneralModule.generateElementApi("a", ["primary-button", "close-modal", "close"]);
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

  function abortion(overlay, noCallback) {
    closeModalWindow(overlay);
    if (noCallback) {
      noCallback();
    }
  }

  function confirmation(overlay, yesCallback) {
    if (typeof FormModule !== "undefined") {
      let modalContent = overlay.querySelector("div.mw-content");
      if (FormModule.checkFormApi(modalContent)) {
        closeModalWindow(overlay);
        yesCallback();
      }
    } else {
      closeModalWindow(overlay);
      yesCallback();
    }
  }

  function closeModalWindow(overlay) {
    let mwHeader = overlay.querySelector(".mw-header");
    mwHeader.style.removeProperty("height");
    overlay.classList.remove("open");
    if (main) {
      main.classList.remove("blur");
    }
    window.removeEventListener("resize", resizeHeader);

    window.setTimeout(function() {
      overlay.remove();
    }, 1000);
  }

  function showModalWindow(overlay) {
    if (main) {
      main.classList.add("blur");
    }
    body.appendChild(overlay);

    // the document needs this little time offset to apply animations
    window.setTimeout(function () {
      overlay.classList.add("open");
    }, 5);

    //after opening the modal window wait 1s to resize the header
    window.setTimeout(function () {
      resizeHeader();
    },1000);
    window.addEventListener("resize", resizeHeader);
  }

  function resizeHeader() {
    let mwHeader = document.querySelector(".overlay .mw-header");
    let h2 = document.querySelector(".overlay .mw-header h2");
    let headerHeight = h2.offsetHeight;
    mwHeader.style.height = headerHeight + "px";
  }

  return {
    deleteModalApi : function (header, content, deleteCallback, abortCallback) {
      createModalFactory(modalTypes.DELETE, header, content, deleteCallback, abortCallback)
    },
    confirmModalApi : function (header, content, confirmCallback, abortCallback) {
      return createModalFactory(modalTypes.CONFIRM, header, content, confirmCallback, abortCallback);
    },
    infoModalApi : function (header, content) {
      createModalFactory(modalTypes.INFO, header, content);
    }
  }

})(window, document);