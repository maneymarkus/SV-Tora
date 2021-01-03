/*
    Dependencies: GeneralModule, TranslationModule, ModalModule, MaterialInputsModule
 */

if (typeof GeneralModule === "undefined") {
  console.warn("Missing GeneralModule Dependency!");
}

if (typeof TranslationModule === "undefined") {
  console.warn("Missing TranslationModule Dependency!");
}

if (typeof ModalModule === "undefined") {
  console.warn("Missing ModalModule Dependency!");
}

if (typeof MaterialInputsModule === "undefined") {
  console.warn("Missing MaterialInputsModule Dependency!");
}

/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

  if (document.querySelector("main.tournament")) {
    let progressSlider = document.querySelectorAll("div.progress-container");
    progressSlider.forEach((ps) => {
      let currentProgress = ps.getAttribute("data-progress");
      ps.querySelector(".progress").style.width = currentProgress + "%";
      ps.querySelector(".handle").style.left = currentProgress + "%";
    });

    let progressSteps = document.querySelectorAll("div.step-container");
    progressSteps.forEach((pStep) => {
      let currentProgress = parseInt(pStep.getAttribute("data-step"));
      let steps = pStep.querySelectorAll("p.step");
      let counter = 0;
      steps.forEach((step) => {
        if (counter === currentProgress) {
          step.classList.add("current");
        } else if (counter < currentProgress) {
          step.classList.add("done");
        }
        counter++;
      });
    });
  }

  if (document.querySelector("main.no-tournament")) {

    const tournamentTilt = $('.host-tournament').tilt({maxTilt: 15, scale: 1.1});

    let createTournamentBtn = document.querySelector(".host-tournament");

    function createModalContent() {
      let container = GeneralModule.generateElementApi("div", ["container"]);
      //TODO: get all tournaments
      let allTournaments = GeneralModule.generalVariables.tournaments;
      let select = GeneralModule.generalVariables.inputTypes.SELECT;
      let date = GeneralModule.generalVariables.inputTypes.DATE;
      let time = GeneralModule.generalVariables.inputTypes.TIME;

      let tournamentSelect = MaterialInputsModule.createInputApi(select, ["required"], undefined, "tournament", "Wettkampf", undefined, undefined, allTournaments);
      let dateInput = MaterialInputsModule.createInputApi(date, ["required"], undefined, "date", "Datum", undefined, undefined, undefined);
      let timeInput = MaterialInputsModule.createInputApi(time, ["required"], undefined, "date", "Uhrzeit", undefined, undefined, undefined);
      let startDateInput = MaterialInputsModule.createInputApi(date, ["required"], undefined, "startdate", "Start", undefined, undefined, undefined);
      let endDateInput = MaterialInputsModule.createInputApi(date, ["required"], undefined, "enddate", "Ende", undefined, undefined, undefined);

      container.appendChild(tournamentSelect);
      container.appendChild(dateInput);
      container.appendChild(timeInput);
      container.appendChild(GeneralModule.generateElementApi("h2", [], "Anmeldezeitraum"));
      container.appendChild(startDateInput);
      container.appendChild(endDateInput);

      FormModule.checkTimeApi(startDateInput, endDateInput);

      return container;
    }

    createTournamentBtn.addEventListener("click", function (e) {
      e.preventDefault();
      let content = createModalContent();

      ModalModule.confirmModalApi("Wettkampf erstellen", content, function () {
        createTournament(content);
      });

    });

    function createTournament(content) {
      let tournamentObject = TranslationModule.translateInputsToObjectApi(content);
      //TODO: finish
      ModalModule.infoModalApi("Erstelle Wettkampf!", tournamentObject);
    }

  }

})(window, document);
