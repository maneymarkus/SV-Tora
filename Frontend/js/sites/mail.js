/*
    Dependencies: GeneralModule, MaterialInputsModule
 */

if (typeof GeneralModule === "undefined") {
  console.log("Missing GeneralModule Dependency!");
}

if (typeof MaterialInputsModule === "undefined") {
  console.log("Missing MaterialInputsModule Dependency!");
}

/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function init(window, document, undefined) {

  if (document.querySelector("form.mail-content")) {

    let mailForm = document.querySelector("form.mail-content");
    let receiverSelection = mailForm.querySelector("div.receiver-selection");
    let chooseClubsBtn = mailForm.querySelector("a.choose-clubs");
    let freeTextBtn = mailForm.querySelector("a.free-text");
    let chosenClubs = mailForm.querySelector("div.chosen-clubs");
    let envelope = document.querySelector("i.envelope");
    let sendButton = mailForm.querySelector("a.send");
    let cancelButton = mailForm.querySelector("a.cancel");

    let receivers = [];

    chooseClubsBtn.classList.add("disabled");

    sendButton.addEventListener("click", function (e) {
      e.preventDefault();
      document.getElementsByTagName("body")[0].classList.add("sent");
      window.setTimeout(function() {
        envelope.innerHTML = "mail";
      }, 1000);
      //TODO: Send form via AJAX
    });

    cancelButton.addEventListener("click", function (e) {
      e.preventDefault();
      // TODO: Call confirm modal and ask if really want to leave page when already some content
    });

    function leavePage() {
      // TODO: positive callback if really want to leave page
    }

    receiverSelection.addEventListener("change", function (e) {
      chooseClubsBtn.classList.add("disabled");
      let target = e.target;
      if (target.nodeName !== "INPUT") {
        return;
      }
      if (target.value === "all") {
        // TODO: Get all available clubs and create spans for them
        return;
      }
      if (target.value === "only-enrolled") {
        // TODO: Get all enrolled clubs in current competition and create spans for them
        return;
      }
      if (target.value === "choose") {
        chooseClubsBtn.classList.remove("disabled");
      }

    });

    function createClubSpans(clubs) {
      clubs.forEach((club) => {
        let clubSpan = Module.generateElementApi("span", ["club"]);
        clubSpan.appendChild(Module.generateElementApi("span", ["club-name"], club));
        let deleteBtn = Module.generateElementApi("a", ["delete-button"]);
        deleteBtn.appendChild(Module.generateElementApi("i", ["material-icons"], "close"));
        clubSpan.appendChild(deleteBtn);
        chosenClubs.appendChild(clubSpan);
        // TODO: Add mail address of club to receivers array
      });
    }

    chooseClubsBtn.addEventListener("click", function () {
      // TODO: get all available clubs, create checkbox for each of them (input api) and then call confirm modal api
    });

    /**
     * This function is executed when the respective confirm modal (choose clubs as receivers) has been confirmed (positive callback)
     * @param chosenClubs Array of Strings that represent the chosen clubs to be emailed
     */
    function choseClubs(chosenClubs) {
      createClubSpans(chosenClubs);
    }

    /**
     * This Event Listener listens for a click on the free-text button which triggers a confirm modal with a text input field where an email address can be inserted manually
     */
    freeTextBtn.addEventListener("click", function () {
      // TODO: Call confirm modal api with already created text input (input api)
    });

    /**
     * This function is executed when the respective confirm modal (free text input to manually add email addresses) has been confirmed (positive callback)
     * @param address String that is extracted from the input of the respective confirm modal
     */
    function addManualMail(address) {
      createClubSpans([address]);
    }

    chosenClubs.addEventListener("click", function (e) {
      let target = e.target;
      while (target.nodeName !== "BODY" && !target.classList.contains("delete-button")) {
        target = target.parentElement;
      }
      if (target.nodeName === "BODY") {
        return;
      }
      if (target.classList.contains("delete-button")) {
        target = target.parentElement;
        target.remove();
        // TODO: Remove mail address of particular club from receivers array
      }
    });

  }

})(window, document);
