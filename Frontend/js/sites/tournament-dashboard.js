/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

  let dependencies = ["PrimaryButtonModule", "SecondaryButtonModule", "MaterialInputsModule", "ModalModule", "FormModule", "TranslationModule", "TagModule", "TiltModule"];
  GeneralModule.checkDependenciesApi(dependencies);

  let body = document.querySelector("body");

  function createTournamentModalContent(tournament, date, time, enrollmentStart, enrollmentEnd, place) {
    let container = GeneralModule.generateElementApi("div", ["container"]);
    //TODO: get all tournaments
    let allTournaments = GeneralModule.generalVariables.tournaments;
    let inputTypes = GeneralModule.generalVariables.inputTypes;

    let tournamentSelect = MaterialInputsModule.createInputApi(inputTypes.SELECT, ["required", "tournament-name"], undefined, "tournament", "Wettkampf", undefined, undefined, allTournaments);
    let dateInput = MaterialInputsModule.createInputApi(inputTypes.DATE, ["required", "date"], undefined, "date", "Datum", undefined, undefined, undefined);
    let timeInput = MaterialInputsModule.createInputApi(inputTypes.TIME, ["required"], undefined, "time", "Uhrzeit", undefined, undefined, undefined);
    let startDateInput = MaterialInputsModule.createInputApi(inputTypes.DATE, ["required", "enrollment-start"], undefined, "enrollment-start", "Start", undefined, undefined, undefined);
    let endDateInput = MaterialInputsModule.createInputApi(inputTypes.DATE, ["required", "enrollment-end"], undefined, "enrollment-end", "Ende", undefined, undefined, undefined);
    let placeInput = MaterialInputsModule.createInputApi(inputTypes.TEXT, ["required"], undefined, "place", "Ort", undefined, undefined, undefined);

    if (tournament) {
      tournamentSelect.setValue(tournament);
    }
    if (date) {
      dateInput.setValue(date);
    }
    if (time) {
      timeInput.setValue(time);
    }
    if (enrollmentStart) {
      startDateInput.setValue(enrollmentStart);
    }
    if (enrollmentEnd) {
      endDateInput.setValue(enrollmentEnd);
    }
    if (place) {
      placeInput.setValue(place);
    }

    container.appendChild(tournamentSelect.inputContainer);
    container.appendChild(dateInput.inputContainer);
    container.appendChild(timeInput.inputContainer);
    container.appendChild(GeneralModule.generateElementApi("h2", [], "Anmeldezeitraum"));
    container.appendChild(startDateInput.inputContainer);
    container.appendChild(endDateInput.inputContainer);
    container.appendChild(GeneralModule.generateElementApi("h2", [], "Veranstaltungsort"));
    container.appendChild(placeInput.inputContainer);

    FormModule.checkTimeApi(startDateInput.inputContainer, endDateInput.inputContainer);

    return container;
  }

  function checkTournamentModalContent(content) {
    function checkFormGenerally() {
      if (!FormModule.checkFormApi(content, true)) {
        check = false;
      }
    }

    let check = false;
    checkFormGenerally();

    let dateInput = content.querySelector(".date");
    let enrollmentEndInput = content.querySelector(".enrollment-end");
    let dateInputObject = MaterialInputsModule.getInputObjectApi(dateInput);
    let enrollmentEndInputObject = MaterialInputsModule.getInputObjectApi(enrollmentEndInput);
    let date = dateInputObject.getValue();
    let enrollmentEndDate = enrollmentEndInputObject.getValue();
    if (!MaterialInputsModule.compareDatesApi(enrollmentEndDate, date)) {
      enrollmentEndInputObject.throwInputError(GeneralModule.generalVariables.errorTypes.CUSTOM, "Der Anmeldezeitraum muss mindestens einen Tag vor Beginn des Wettkampfes beendet sein.");
      check = false;
    } else {
      enrollmentEndInputObject.revokeInputError(GeneralModule.generalVariables.errorTypes.CUSTOM);
      check = true;
      checkFormGenerally();
    }

    return check;
  }

  function createTournament(content) {
    let tournamentObject = TranslationModule.translateInputsToObjectApi(content);
    //TODO: send data to backend, create tournament and reload page
    console.log(tournamentObject);
    ModalModule.infoModalApi("Veranstalte Wettkampf!", tournamentObject);
  }





  if (document.querySelector("main.tournament")) {

    /**
     * This block handles the correct display of the progress of the current tournament
     */

    let allClubs = GeneralModule.generalVariables.clubs;
    let enrolledClubs = GeneralModule.generalVariables.enrolledClubs;
    let excludedClubs = GeneralModule.generalVariables.excludedClubs;

    let statusContainer = document.querySelector("div.status-container");
    let progressSteps = GeneralModule.generalVariables.progressSteps;

    function showProgress() {
      let textStatus = statusContainer.querySelector("span.status");
      let currentProgress = parseInt(statusContainer.getAttribute("data-progress"));
      let steps = statusContainer.querySelectorAll("p.step");
      let counter = 0;
      steps.forEach((step) => {
        if (counter === currentProgress) {
          step.classList.add("current");
          textStatus.innerHTML = step.innerText;
        } else if (counter < currentProgress) {
          step.classList.add("done");
          step.classList.remove("current");
        } else {
          step.classList.remove("current", "done");
        }
        counter++;
      });

      let progressSlider = document.querySelector("div.progress-container");
      let countSteps = steps.length;
      let progressInFraction = Math.round(((currentProgress + 1) / countSteps) * 100) / 100;
      let progressInPercent = progressInFraction * 100;
      if (progressInPercent === 100) {
        changeCancelTournamentButton();
      }
      progressSlider.querySelector(".progress").style.width = progressInPercent + "%";
      progressSlider.querySelector(".handle").style.left = progressInPercent + "%";
    }

    window.setTimeout(function () {
      showProgress();
    }, 1000);

    function changeProgress(step) {
      if (typeof step === "number" && step >= 0 && step < Object.keys(progressSteps).length) {
        statusContainer.setAttribute("data-progress", step);
        showProgress();
      }
    }

    function changeCancelTournamentButton() {
      let cancelTournamentButton = document.querySelector(".actions .cancel-tournament");
      cancelTournamentButton.classList.remove("cancel", "cancel-tournament");
      cancelTournamentButton.classList.add("complete-tournament");
      cancelTournamentButton.querySelector("p").innerHTML = "Wettkampf abschließen";
    }

    /**
     * This block handles the switching to competition mode
     */

    let fightModeButton = document.querySelector("a.fight-mode");
    let tournamentDateString = document.querySelector(".tournament-container span.tournament-date").innerText;
    let fightingSystemsContainer = document.querySelector("a.fighting-systems");

    fightModeButton.addEventListener("click", function (e) {
      if (checkPreparation()) {
        if (checkDate()) {
          // everything is fine so just do nothing and follow the link :)
          // TODO: Switch to competition mode
        } else {
          e.preventDefault();
          let targetUrl = fightModeButton.getAttribute("href");
          ModalModule.confirmModalApi("Wettkampftag noch nicht erreicht", "Der Wettkampf ist noch nicht heute sondern am " + tournamentDateString + " geplant. Willst du wirklich in den Wettkampftagmodus wechseln? Wenn die Anmeldung noch offen ist, wird diese jetzt geschlossen.", function () {
            window.location.href = targetUrl;
          });
        }
      } else {
        e.preventDefault();
        ModalModule.infoModalApi("Wettkampf Vorbereitung nicht ausreichend.", "Du kannst noch nicht in den Wettkampf-Modus wechseln, da die Vorbereitung noch nicht abgeschlossen ist. Das Mindeste ist, dass jede Kategorie ein Kampfsystem zugewiesen bekommt.");
      }
    });

    function checkDate() {
      let day = tournamentDateString.substring(0, tournamentDateString.indexOf("."));
      let month = tournamentDateString.substring(tournamentDateString.indexOf(".") + 1, tournamentDateString.indexOf(".", tournamentDateString.indexOf(".") + 1));
      let year = tournamentDateString.substring(tournamentDateString.indexOf(".", tournamentDateString.indexOf(".") + 1) + 1);

      let tournamentDate = new Date(month + "/" + day + "/" + year).setHours(0, 0, 0, 0);
      let today = new Date().setHours(0,0, 0, 0);

      return tournamentDate === today;
    }

    function checkPreparation() {
      return fightingSystemsContainer.classList.contains("prepared");
    }

    /**
     * This block handles clicks on the actions container, as well as specific behavior to change the status, the tournament itself or delete it
     */

    let actionsContainer = document.querySelector("div.actions");
    let tournamentContainer = document.querySelector("div.tournament-container");

    actionsContainer.addEventListener("click", function (e) {
      let target = e.target;
      while (target.nodeName !== "BODY" && !target.classList.contains("primary-button")) {
        target = target.parentElement;
      }

      // delete tournament
      if (target.classList.contains("cancel-tournament")) {
        deleteTournament();
      }

      // change status of the tournament
      if (target.classList.contains("change-status")) {
        changeStatusOfTournament();
      }

      // change tournament general properties
      if (target.classList.contains("change-tournament")) {
        changeTournament();
      }

      // complete tournament
      if (target.classList.contains("complete-tournament")) {
        completeTournament();
      }

      // exclude clubs
      if (target.classList.contains("exclude-clubs")) {
        openExclusionModal();
      }

    });


    /**
     * This function ends a successfully completed tournament and clears this page, making it available for new tournaments to be hosted
     */
    function completeTournament() {
      ModalModule.infoModalApi("Wettkampf erfolgreich abgeschlossen", "Ich hoffe, ihr habt den Wettkampf ebenfalls erfolgreich abgeschlossen. Ich bin nun jedenfalls damit durch und will nichts mehr damit zu tun haben.", function () {
        // TODO: Archive tournament
      });
    }

    /**
     * This function handles the cancellation of the tournament
     */
    function deleteTournament() {
      // TODO: If cancellation is chosen delete the tournament in backend and reload page or redirect to mail page
      ModalModule.deleteModalApi("Wettkampf absagen", "Willst du den Wettkampf wirklich absagen? Diese Aktion kann nicht rückgängig gemacht werden.", function () {
        // TODO: check if there are already enrolled clubs
        ModalModule.confirmModalApi("Wettkampf absagen", "Willst du den schon angemeldeten Vereinen eine Absagenotiz schicken?", function () {
          // TODO: go to Mail page and insert enrolled clubs
          ModalModule.infoModalApi("Wettkampf Absage", "Okay, eigentlich würdest du jetzt an der Mail schreiben, aber das funktioniert so noch nicht. Sorry :)")
        });
      });
    }

    /**
     * This function handles the change of the status of the current tournament
     */
    function changeStatusOfTournament() {
      let statuus = GeneralModule.generalVariables.tournamentSelectableStatuus;
      let select = MaterialInputsModule.createInputApi(GeneralModule.generalVariables.inputTypes.SELECT, undefined, undefined, "tournament-status", "Wettkampf-Status", undefined, undefined, statuus);
      ModalModule.confirmModalApi("Wettkampf Status ändern", select.inputContainer, function () {
        let status = select.getValue();
        let progressStep = GeneralModule.generalVariables.progressSteps[status];
        window.setTimeout(function () {
          changeProgress(progressStep);
        }, 1000);
      });
    }

    /**
     * This variable contains if the tournament type has been changed
     * @type {boolean}
     */
    let changedTournamentType = false;

    /**
     * This function initiates general changes to the tournament
     */
    function changeTournament() {
      let tournamentNameElement = tournamentContainer.querySelector("h3.tournament-name");
      let tournamentName = tournamentNameElement.innerText;
      let tournamentDateElement = tournamentContainer.querySelector("span.tournament-date");
      let tournamentDate = tournamentDateElement.innerText;
      let tournamentTimeElement = tournamentContainer.querySelector("span.tournament-time");
      let tournamentTime = tournamentTimeElement.innerText;
      let enrollmentStartElement = tournamentContainer.querySelector("span.enrollment-start");
      let enrollmentStart = enrollmentStartElement.innerText;
      let enrollmentEndElement = tournamentContainer.querySelector("span.enrollment-end");
      let enrollmentEnd = enrollmentEndElement.innerText;
      let tournamentPlaceElement = tournamentContainer.querySelector("span.tournament-place");
      let tournamentPlace = tournamentPlaceElement.innerText;

      let content = createTournamentModalContent(tournamentName, tournamentDate, tournamentTime, enrollmentStart, enrollmentEnd, tournamentPlace);

      body.addEventListener("openModal", activateWarning);

      ModalModule.confirmModalApi("Wettkampf ändern", content, function () {
        handleChangedTournament(content);
      }, undefined, function () {
        return checkTournamentModalContent(content);
      });

    }

    /**
     * This function handles the chosen changes to the current tournament
     * @param content {HTMLElement} The content of the modal window with the chosen options
     */
    function handleChangedTournament(content) {
      body.removeEventListener("openModal", activateWarning);
      // TODO: handle change of tournament (graduations that might not be able to compete anymore)
      if (changedTournamentType) {
        createTournament(content);
      } else {
        let tournamentObject = TranslationModule.translateInputsToObjectApi(content);

        for (let property in tournamentObject) {
          if (tournamentObject.hasOwnProperty(property)) {
            let respectiveElement = tournamentContainer.querySelector("[data-name=" + property + "]");
            respectiveElement.innerHTML = tournamentObject[property];
          }
        }

        ModalModule.confirmModalApi("Wettkampf Änderungen", "Willst du die schon angemeldeten Vereine über die Änderungen informieren?", function () {
          ModalModule.infoModalApi("Änderungen publizieren", "Jetzt kannst du eigentlich die Mail an die Vereine schicken. Eigentlich.");
        });
      }
    }

    /**
     * This function activates a global warning modal and registers an event listener for the change of the tournament type. If the user wants to change the tournament type a warning is displayed
     * @param e {Event} The event object
     */
    function activateWarning(e) {
      let target = e.target;
      if (target.querySelector("div.select-input-container.tournament-name")) {
        target.querySelector("div.select-input-container.tournament-name").addEventListener("click", warnChanges);
      }

      function warnChanges() {
        changedTournamentType = true;
        ModalModule.infoModalApi("Info zu Wettkampf Änderungen", "Änderungen am Wettkampf sollten vorsichtig durchgeführt werden. Den Wettkampf-Typ (z.B. Tora-Pokal) zu ändern, setzt den Wettkampf neu auf und alle bereits angemeldeten Entitäten werden zurückgesetzt.", function () {
          target.querySelector("div.select-input-container.tournament-name").removeEventListener("click", warnChanges);
        });
      }

    }

    /**
     * This block handles club exclusion
     */

    let excludedClubsCard = document.querySelector("a.excluded-clubs");
    let exclusionModal = document.querySelector(".exclude-clubs-modal");
    let closeExclusionModalButton = exclusionModal.querySelector(".close");
    let excludedContainer = exclusionModal.querySelector("div.excluded-clubs");
    let clubContainer = exclusionModal.querySelector(".club-selection");
    let excludeButton = exclusionModal.querySelector(".secondary-button.exclude");
    let excludeInput = exclusionModal.querySelector(".text-input-container");
    let excludeInputObject = MaterialInputsModule.getInputObjectApi(excludeInput);
    let countExcludedClubsSpan = excludedClubsCard.querySelector("span.count-excluded");
    let checkboxesObject = undefined;

    SecondaryButtonModule.disableSecondaryButtonApi(excludeButton);

    /**
     * A click on the excluded club card in the dashboard should open the exclusion modal
     */
    excludedClubsCard.addEventListener("click", function () {
      openExclusionModal();
    });

    /**
     * A click on the exclude action button in the dashboard should open the exclusion modal
     */
    closeExclusionModalButton.addEventListener("click", function () {
      closeExclusionModal();
    });

    /**
     * This function decides whether to enable the button to finally exclude a selected entity/e-mail address or not
     */
    function controlExclusionButton() {
      let value = excludeInputObject.getValue();
      let selection = checkboxesObject.getValue();
      if (selection.length > 0 || value !== "") {
        if (excludeInputObject.incorrect) {
          SecondaryButtonModule.disableSecondaryButtonApi(excludeButton);
        } else {
          SecondaryButtonModule.enableSecondaryButtonApi(excludeButton);
        }
      } else {
        SecondaryButtonModule.disableSecondaryButtonApi(excludeButton);
      }
    }

    /**
     * A click on the exclude button triggers the exclusion of selected/typed-in entities
     */
    excludeButton.addEventListener("click", function () {
      let value = excludeInputObject.getValue();
      let selection = checkboxesObject.getValue();
      if (selection.length > 0) {
        excludeEntities(selection);
      } else {
        excludeEntity(value);
      }
      SecondaryButtonModule.disableSecondaryButtonApi(excludeButton);
    });

    /**
     * Clicks in the container containing the excluded club tags should be captured and if the user clicked a delete button ("wants to remove this club from the excluded club list) than the club should be removed from the excluded club list, as well as the clicked element
     */
    excludedContainer.addEventListener("click", function (e) {
      let target = e.target;
      while (target.nodeName !== "BODY" && !target.classList.contains("delete")) {
        target = target.parentElement;
      }
      if (target.classList.contains("delete")) {
        let clubTag = target;
        while (!clubTag.classList.contains("excluded-club")) {
          clubTag = clubTag.parentElement;
        }
        let representedClub = clubTag.querySelector(".tag-key").innerText;
        excludedClubs.splice(excludedClubs.indexOf(representedClub), 1);
        clubTag.remove();
        updateCountExcludedClubs();
        insertClubCheckboxes();
        if (excludedClubs.length === 0 && !excludedContainer.querySelector(".no-exclusion")) {
          excludedContainer.appendChild(GeneralModule.generateElementApi("span", ["no-exclusion"], "Keiner"));
        }
      }
    });

    /**
     * This function simply updates the span html element in the dashboard responsible for showing the count of excluded clubs
     */
    function updateCountExcludedClubs() {
      countExcludedClubsSpan.innerHTML = excludedClubs.length + "";
    }

    /**
     * This function iterates over a given array of entities that should be excluded
     * @param entities {string[]} The entities that are about to be excluded
     */
    function excludeEntities(entities) {
      entities.forEach((entity) => {
        excludeEntity(entity);
      });
    }
    excludeEntities(excludedClubs);

    /**
     * This function excludes a given entity (from this tournament)
     * @param entity {string} The given entity which will be excluded
     */
    function excludeEntity(entity) {
      if (!excludedClubs.includes(entity)) {
        if (enrolledClubs.includes(entity)) {
          ModalModule.confirmModalApi(entity + " ausschließen", "Willst du " + entity + " wirklich ausschließen? " + entity + " ist schon zum aktuellen Wettkampf angemeldet. Alle dies betreffenden Anmeldungen werden storniert. Das kann nicht rückgängig gemacht werden.", function () {
            exclude();
          });
        } else {
          exclude();
        }
      }
      function exclude() {
        // TODO: exclude entity in backend too (and maybe remove it from enrolled clubs too)
        if (enrolledClubs.includes(entity)) {
          enrolledClubs.splice(enrolledClubs.indexOf(entity), 1);
        }
        createAndAppendExclusionTag(entity);
        excludedClubs.push(entity);
        insertClubCheckboxes();
        updateCountExcludedClubs();
      }
    }

    /**
     * This function creates a tag element for the entity which has been excluded and directly appends it to the responsible container element
     * @param entity
     */
    function createAndAppendExclusionTag(entity) {
      let excludeTag = TagModule.createTagApi(["excluded-club"], entity);
      if (excludedContainer.querySelector("span.no-exclusion")) {
        excludedContainer.querySelector("span.no-exclusion").remove();
      }
      excludedContainer.appendChild(excludeTag);
    }
    excludedClubs.forEach((excludedClub) => {
      createAndAppendExclusionTag(excludedClub);
    });

    /**
     * The input element serves as a search bar and a free text input. While typing the list of registered clubs is being updated serving the purpose of searching. When no club is found anymore it is assumed that the user wants to exclude a custom e-mail-address (and the input is therefore then validated with a RegExp)
     */
    excludeInput.addEventListener("input", function () {
      let value = excludeInputObject.getValue().toLowerCase();
      controlExclusionButton();
      let checkboxGroup = checkboxesObject.inputContainer;
      let allCheckboxes = checkboxGroup.querySelectorAll(".checkbox-input-container");
      let countCheckboxes = 0;
      allCheckboxes.forEach((checkbox) => {
        let input = checkbox.querySelector("input")
        let representedClub = input.getAttribute("value");
        if (representedClub.toLowerCase().indexOf(value) !== -1 || input.checked) {
          checkbox.style.display = "inline-block";
          countCheckboxes++;
        } else {
          checkbox.style.display = "none";
        }
      });
      if (countCheckboxes === 0) {
        if (!excludeInputObject.inputContainer.classList.contains("mail")) {
          excludeInputObject.inputContainer.classList.add("mail");
          excludeInputObject.updateInputValidation();
        }
      } else {
        if (excludeInputObject.inputContainer.classList.contains("mail")) {
          excludeInputObject.inputContainer.classList.remove("mail");
          excludeInputObject.updateInputValidation();
        }
      }
    });

    /**
     * This function inserts the (still available = all not so far excluded clubs) club checkboxes in the responsible container element
     */
    function insertClubCheckboxes() {
      clubContainer.innerHTML = "";
      let options = [];
      allClubs.forEach((club) => {
        if (!excludedClubs.includes(club)) {
          let optionObject = {};
          optionObject["text"] = club;
          options.push(optionObject);
        }
      });
      checkboxesObject = MaterialInputsModule.createInputApi(GeneralModule.generalVariables.inputTypes.CHECKBOX, undefined, undefined, "exclude-clubs", undefined, undefined, undefined, options);
      clubContainer.appendChild(checkboxesObject.inputContainer);

      // if the user selects a club checkbox the exclusion button should be enabled
      checkboxesObject.inputContainer.addEventListener("input", function () {
        controlExclusionButton();
      });
    }
    insertClubCheckboxes();

    /**
     * This function is responsible for opening the exclusion modal
     */
    function openExclusionModal() {
      ModalModule.appendOverlayApi();
      exclusionModal.classList.add("open");
    }

    /**
     * This function is responsible for closing the exclusion modal
     */
    function closeExclusionModal() {
      ModalModule.removeOverlayApi();
      exclusionModal.classList.remove("open");
      insertClubCheckboxes();
      excludeInputObject.setValue("");
    }

  }



  if (document.querySelector("main.no-tournament")) {

    let createTournamentBtn = document.querySelector(".host-tournament");

    createTournamentBtn.addEventListener("click", function (e) {
      e.preventDefault();
      let content = createTournamentModalContent();

      ModalModule.confirmModalApi("Wettkampf veranstalten", content, function () {
        createTournament(content);
      }, undefined, function () {
        return checkTournamentModalContent(content);
      });

    });

  }

})(window, document);
