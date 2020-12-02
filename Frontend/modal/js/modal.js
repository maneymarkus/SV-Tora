function init(window, document, undefined) {

  let tiltOptions = {maxTilt: 15, scale: 1.15};
  const primaryButtonTilt = $(".primary-button").tilt(tiltOptions);

  $('.primary-button').click(function (e){
    e.preventDefault();
  });

  const modalTypes = {
    DELETE: "delete",
    INFO: "info",
    CONFIRM: "confirm"
  }

  let Module = (function(window, document, undefined) {

    function generateElement(element, classNames = undefined, value = undefined) {
      let el = document.createElement(element.toUpperCase());
      if (classNames) {
        classNames.forEach(function (item) {
          el.classList.add(item);
        });
      }
      if (value) {
        el.innerHTML = value;
      }
      return el;
    }

    return {
      generateElementApi : function (element, classNames, value) {
        return generateElement(element, classNames, value);
      }
    }

  })(window, document);

  let ModalModule = (function(window, document, undefined) {

    let body = document.querySelector("body");
    let main = document.querySelector("main");

    function createModalFactory(modalType, header, content, yesCallback, noCallback) {
      let overlay = Module.generateElementApi("div", ["overlay"]);
      let baseModal = createBaseModal(overlay, header, content, noCallback);
      switch (modalType) {
        case modalTypes.DELETE:
          let deleteModalFooter = Module.generateElementApi("div", ["mw-footer"]);
          let abortDeletionBtn = Module.generateElementApi("a", ["secondary-button"]);
          abortDeletionBtn.appendChild(Module.generateElementApi("span", ["text"], "Abbrechen"));
          deleteModalFooter.appendChild(abortDeletionBtn);
          abortDeletionBtn.addEventListener("click", function () {
            closeModalWindow(overlay);
            noCallback();
          });
          let deleteBtn = Module.generateElementApi("a", ["secondary-button", "delete"]);
          deleteBtn.appendChild(Module.generateElementApi("span", ["text"], "Löschen"));
          deleteModalFooter.appendChild(deleteBtn);
          deleteBtn.addEventListener("click", function () {
            closeModalWindow(overlay);
            yesCallback("1");
          });
          baseModal.appendChild(deleteModalFooter);
          overlay.appendChild(baseModal);
          break;
        case modalTypes.CONFIRM:
          let confirmModalFooter = Module.generateElementApi("div", ["mw-footer"]);
          let abortConfirmationBtn = Module.generateElementApi("a", ["secondary-button", "abort"]);
          abortConfirmationBtn.appendChild(Module.generateElementApi("span", ["text"], "Abbrechen"));
          confirmModalFooter.appendChild(abortConfirmationBtn);
          abortConfirmationBtn.addEventListener("click", function () {
            closeModalWindow(overlay);
            noCallback();
          });
          let confirmBtn = Module.generateElementApi("a", ["secondary-button"]);
          confirmBtn.appendChild(Module.generateElementApi("span", ["text"], "OK"));
          confirmModalFooter.appendChild(confirmBtn);
          confirmBtn.addEventListener("click", function () {
            closeModalWindow(overlay);
            yesCallback();
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
      let modal = Module.generateElementApi("div", ["modal-window"]);
      let closeBtn = Module.generateElementApi("a", ["primary-button", "close-modal", "close"]);
      closeBtn.appendChild(Module.generateElementApi("i", ["material-icons"], "close"));
      closeBtn.appendChild(Module.generateElementApi("p", [], "Schließen"));
      modal.appendChild(closeBtn);
      closeBtn.addEventListener("click", function () {
        closeModalWindow(overlay);
        if (noCallback) {
          noCallback();
        }
      });
      let modalHeader = Module.generateElementApi("div", ["mw-header"]);
      modalHeader.appendChild(Module.generateElementApi("h2", [], header));
      modal.appendChild(modalHeader);
      let modalContent = Module.generateElementApi("div", ["mw-content"]);
      modalContent.appendChild(Module.generateElementApi("p", [], content));
      modal.appendChild(modalContent);
      return modal;
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

  /*

  document.querySelector(".modal-button").addEventListener("click", function () {
    ModalModule.infoModalApi("Information", "Wichtige Info. Einfach akzeptieren und dann biddö wegklicken. Ganz easy.");
  });

  document.querySelector(".modal-button").addEventListener("click", function () {
    ModalModule.confirmModalApi("Entscheidung", "Ja oder nein.", confirmBack, abortion);
  });

   */

  document.querySelector(".modal-button").addEventListener("click", function () {
    ModalModule.deleteModalApi("Entscheidung", "Ja oder nein.", confirmBack, abortion);
  });
  /*

   */

  function confirmBack (element) {
    console.log("Confirm! " + element);
  }

  function abortion () {
    console.log("Abort!");
  }

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
