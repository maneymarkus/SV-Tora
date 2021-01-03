/*
    Dependencies: GeneralModule, MaterialInputsModule, ModalModule, TranslationModule, FormModule
 */

if (typeof GeneralModule === "undefined") {
  console.log("Missing GeneralModule Dependency!");
}

if (typeof MaterialInputsModule === "undefined") {
  console.log("Missing MaterialInputsModule Dependency!");
}

if (typeof ModalModule === "undefined") {
  console.log("Missing ModalModule Dependency!");
}

if (typeof TranslationModule === "undefined") {
  console.log("Missing TranslationModule Dependency!");
}

if (typeof FormModule === "undefined") {
  console.log("Missing FormModule Dependency!");
}

/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function init(window, document, undefined) {

  if (document.querySelector("form.mail-content")) {

    let mailForm = document.querySelector("form.mail-content");
    let receiverSelection = mailForm.querySelector("div.receiver-selection");
    let chooseReceiversBtn = mailForm.querySelector("a.choose-receivers");
    let freeTextBtn = mailForm.querySelector("a.free-text");
    let chosenReceivers = mailForm.querySelector("div.chosen-receivers");
    let envelope = document.querySelector("i.envelope");
    let sendButton = mailForm.querySelector("a.send");
    let cancelButton = mailForm.querySelector("a.cancel");

    let allClubs = GeneralModule.generalVariables.clubs;

    let enrolledClubs = GeneralModule.generalVariables.enrolledClubs;

    /**
     * This array contains the name of the clubs that should receive this mail
     * @type {string[]}
     */
    let receivers = [];

    chooseReceiversBtn.classList.add("disabled");

    sendButton.addEventListener("click", function (e) {
      e.preventDefault();
      if (FormModule.checkFormApi(mailForm)) {
        document.getElementsByTagName("body")[0].classList.add("sent");
        window.setTimeout(function () {
          envelope.innerHTML = "mail";
        }, 1000);
        //TODO: Send form via AJAX
      }
    });

    cancelButton.addEventListener("click", function (e) {
      e.preventDefault();
      ModalModule.confirmModalApi("Seite wirklich verlassen?", "Willst du die Seite wirklich verlassen?", leavePage);
    });

    function leavePage() {
      ModalModule.infoModalApi("Seite verlassen!", "Du verlässt nun die Seite.");
    }

    let lastSelected = undefined;

    receiverSelection.addEventListener("change", function (e) {
      e.preventDefault();
      chooseReceiversBtn.classList.add("disabled");
      let target = e.target;
      if (target.nodeName !== "INPUT") {
        return;
      }
      target.checked = false;
      if (chosenReceivers.querySelector("span.receiver")) {
        ModalModule.confirmModalApi("Empfänger ändern?", "Willst du die Empfänger wirklich ändern? Dies löscht alle bisher hinzugefügten Empfänger!", function () {
          clearReceiverSection();
          changeReceiverSelection(target);
        }, function () {
          lastSelected.checked = true;
        });
      } else {
        changeReceiverSelection(target);
      }

    });

    function changeReceiverSelection(target) {
      target.checked = true;
      if (target.value === "all") {
        addReceivers(allClubs);
      }
      if (target.value === "only-enrolled") {
        addReceivers(enrolledClubs);
      }
      if (target.value === "choose") {
        chooseReceiversBtn.classList.remove("disabled");
      }
      lastSelected = target;
    }

    function clearReceiverSection() {
      let clubSpans = chosenReceivers.querySelectorAll("span.receiver");
      clubSpans.forEach((span) => {
        let receiverName = span.querySelector("span.receiver-name").innerText;
        receivers.splice(receivers.indexOf(receiverName), 1);
        span.remove();
      });
    }

    function addReceivers(receivers) {
      receivers.forEach((receiver) => {
        addReceiver(receiver);
      });
    }

    function addReceiver(receiver) {
      // TODO: If receiver already present don't add it
      receivers.push(receiver);
      let clubSpan = createReceiverSpan(receiver);
      chosenReceivers.appendChild(clubSpan);
    }

    function createReceiverSpan(receiver) {
      let clubSpan = GeneralModule.generateElementApi("span", ["receiver"]);
      clubSpan.appendChild(GeneralModule.generateElementApi("span", ["receiver-name"], receiver));
      let deleteBtn = GeneralModule.generateElementApi("a", ["delete-button"]);
      deleteBtn.appendChild(GeneralModule.generateElementApi("i", ["material-icons"], "close"));
      clubSpan.appendChild(deleteBtn);
      return clubSpan;
    }

    chooseReceiversBtn.addEventListener("click", function () {
      // TODO: if pre selected options...
      let options = [];
      allClubs.forEach((club) => {
        let object = {};
        object["value"] = club;
        object["text"] = club;
        object["checked"] = false;
        options.push(object);
      });
      let container = MaterialInputsModule.createInputApi(GeneralModule.generalVariables.inputTypes.CHECKBOX, [], undefined, "receiver", undefined, undefined, undefined, options);
      ModalModule.confirmModalApi("Vereine auswählen", container, function () {
        clearReceiverSection();
        let chosenClubs = TranslationModule.translateInputsToObjectApi(container);
        let receivers = chosenClubs["receiver"];
        addReceivers(receivers);
      });
    });

    /**
     * This Event Listener listens for a click on the free-text button which triggers a confirm modal with a text input field where an email address can be inserted manually
     */
    freeTextBtn.addEventListener("click", function () {
      let inputContainer = MaterialInputsModule.createInputApi(GeneralModule.generalVariables.inputTypes.TEXT, ["email"], undefined, "receiver-address", "E-Mail", undefined, undefined, undefined);
      ModalModule.confirmModalApi("Empfänger hinzufügen", inputContainer, function () {
        addManualMail(inputContainer);
      });
    });


    /**
     * This function is executed when the respective confirm modal (free text input to manually add email addresses) has been confirmed (positive callback)
     * @param inputContainer String that is extracted from the input of the respective confirm modal
     */
    function addManualMail(inputContainer) {
      let address = inputContainer.querySelector("input").value;
      addReceiver(address);
    }

    chosenReceivers.addEventListener("click", function (e) {
      let target = e.target;
      while (target.nodeName !== "BODY" && !target.classList.contains("delete-button")) {
        target = target.parentElement;
      }
      if (target.nodeName === "BODY") {
        return;
      }
      if (target.classList.contains("delete-button")) {
        target = target.parentElement;
        let receiverName = target.querySelector("span.receiver-name").innerText;
        receivers.splice(receivers.indexOf(receiverName), 1)
        target.remove();
      }
    });

  }

})(window, document);