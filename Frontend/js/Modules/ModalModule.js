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
    modalContent.appendChild(GeneralModule.generateElementApi("p", [], content));
    modal.appendChild(modalContent);
    return modal;
  }

  function abortion(overlay, noCallback) {
    closeModalWindow(overlay);
    if (noCallback) {
      noCallback();
    }
  }

  function confirmation(overlay, yesCallback) {
    let modalContent = overlay.querySelector("div.mw-content");
    if (InputsModule.checkRequiredInputsApi(modalContent)) {
      closeModalWindow(overlay);
      yesCallback();
    }
  }

  function closeModalWindow(overlay) {
    let mwHeader = overlay.querySelector(".mw-header");
    mwHeader.style.height = mwHeader.offsetHeight + "px";
    window.setTimeout(function () {
      mwHeader.style.height = "0";
    }, 5);
    window.setTimeout(function() {
      overlay.remove();
    }, 1000);
    overlay.classList.remove("open");
    main.classList.remove("blur");
  }

  function showModalWindow(overlay) {
    let mwHeader = overlay.querySelector(".mw-header");
    body.appendChild(overlay);
    let headerHeight = mwHeader.offsetHeight;
    mwHeader.style.height = "0px";
    window.setTimeout(function () {
      overlay.classList.add("open");
      mwHeader.style.height = headerHeight + "px";
    }, 100);
    window.setTimeout(function () {
      mwHeader.style.height = "auto";
    },2500);
    main.classList.add("blur");
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