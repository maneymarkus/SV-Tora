/*
    Encapsulate (not anywhere else needed) code in anonymous function
*/
(function (window, document, undefined) {

  let dependencies = ["PrimaryButtonModule", "SecondaryButtonModule", "ModalModule", "FormModule", "TranslationModule", "MaterialInputsModule"];
  GeneralModule.checkDependenciesApi(dependencies);

  let flipCardContainer = document.querySelector(".perspective-container");
  let flipCards = document.querySelectorAll(".tournament-card");
  let addTournamentButton = document.querySelector(".add-tournament");

  function setContainerWidth() {
    flipCards = document.querySelectorAll(".tournament-card");
    let containerMinWidth = 24 + 22 * flipCards.length;
    flipCardContainer.style.minWidth = containerMinWidth + "rem";
  }
  setContainerWidth();

  flipCardContainer.addEventListener("click", function (e) {
    let target = e.target;
    while (target.nodeName !== "BODY" && !target.classList.contains("secondary-button") && !target.classList.contains("tournament-card") && !target.classList.contains("add-tournament")) {
      target = target.parentElement;
    }

    // add completely new tournament
    if (target.classList.contains("add-tournament")) {
      let container = createTournamentModalContent();
      ModalModule.confirmModalApi("Neuen Wettkampf erstellen", container, function () {
        createTournamentCard(container);
      }, undefined, function () {
        return FormModule.checkFormApi(container, true);
      });
    }

    // either delete or edit clicked tournament card
    if (target.classList.contains("secondary-button")) {
      let flipCard = target;
      while (!flipCard.classList.contains("tournament-card")) {
        flipCard = flipCard.parentElement;
      }
      if (target.classList.contains("edit")) {
        changeTournament(flipCard);
      }
      if (target.classList.contains("delete")) {
        ModalModule.deleteModalApi("Wettkampf löschen", "Bist du dir wirklich sicher, dass du diesen Wettkampf komplett löschen möchtest? Das kann nicht rückgängig gemacht werden.", function () {
          // TODO: delete tournament in backend
          flipCard.remove();
          setContainerWidth();
        });
      }
      return;
    }

    // flip clicked tournament card
    if (target.classList.contains("tournament-card")) {
      let flipCard = target;
      while (!flipCard.classList.contains("tournament-card")) {
        flipCard = flipCard.parentElement;
      }
      flipCard.classList.toggle("flipped");
    }
  });

  let flipper = document.querySelector(".flip-control .flip");

  flipper.addEventListener("click", function () {
    let alreadyToggled = false;
    flipCards.forEach((fc) => {
      if (fc.classList.contains("flipped")) {
        alreadyToggled = true;
      }
    });
    if (!alreadyToggled) {
      flipCards.forEach((fc) => {
        fc.classList.add("flipped");
      });
    } else {
      flipCards.forEach((fc) => {
        fc.classList.remove("flipped");
      });
    }
  });

  function createTournamentCard(content) {
    let tournamentObject = adjustTournamentObject(content);

    let tournamentCard = GeneralModule.generateElementApi("div", ["tournament-card"]);

    let front = GeneralModule.generateElementApi("div", ["front"]);
    let bg = GeneralModule.generateElementApi("div", ["bg"]);
    bg.appendChild(GeneralModule.generateElementApi("p", ["number"], (flipCardContainer.querySelectorAll(".tournament-card").length + 1 + "")));
    front.appendChild(bg);
    front.appendChild(GeneralModule.generateElementApi("p", ["bg-text"], tournamentObject["tournament-name"]));
    front.appendChild(GeneralModule.generateElementApi("h3", ["district"], tournamentObject["tournament-name"]));
    tournamentCard.appendChild(front);

    let back = GeneralModule.generateElementApi("div", ["back"]);
    back.appendChild(GeneralModule.generateElementApi("h3", [], tournamentObject["tournament-name"], {"data-name":"tournament-name", "data-key":"Wettkampfname"}));

    back.appendChild(GeneralModule.generateElementApi("p", [], tournamentObject["age-range"], {"data-name":"age-range", "data-key":"Alter"}));

    back.appendChild(GeneralModule.generateElementApi("p", [], tournamentObject["graduations"], {"data-name":"graduations", "data-key":"Graduierungen"}));

    back.appendChild(GeneralModule.generateElementApi("p", [], tournamentObject["teams"], {"data-name":"teams", "data-key":"Teams"}));

    back.appendChild(GeneralModule.generateElementApi("p", [], tournamentObject["kihon"], {"data-name":"teams", "data-key":"Teams"}));

    back.appendChild(SecondaryButtonModule.createSecondaryButtonApi(["edit"], undefined, "Bearbeiten"));
    back.appendChild(SecondaryButtonModule.createSecondaryButtonApi(["delete"], undefined, "Löschen"));

    tournamentCard.appendChild(back);

    flipCardContainer.insertBefore(tournamentCard, addTournamentButton.parentElement);
    setContainerWidth();

  }

  function createTournamentModalContent(name, ageStart, ageEnd, graduations, teams, kihon) {
    let container = GeneralModule.generateElementApi("div", ["container"]);
    //TODO: get all tournaments
    let allGraduations = GeneralModule.generalVariables.graduations;
    let inputTypes = GeneralModule.generalVariables.inputTypes;
    let allAges = [];
    for (let i = 0; i < 100; i++) {
      allAges.push(i + "");
    }
    let graduationsOptions = [];
    allGraduations.forEach((graduation) => {
      let optionObject = {};
      optionObject["text"] = graduation;
      optionObject["value"] = graduation;
      if (graduations && graduations.includes(graduation)) {
        optionObject["checked"] = true;
      }
      graduationsOptions.push(optionObject);
    });

    let tournamentNameInput = MaterialInputsModule.createInputApi(inputTypes.TEXT, ["required", "tournament-name"], undefined, "tournament-name", "Wettkampfname", undefined, undefined, undefined);
    let ageStartInput = MaterialInputsModule.createInputApi(inputTypes.SELECT, ["required", "age-start"], undefined, "age-start", "Mindestalter", undefined, undefined, allAges);
    let ageEndInput = MaterialInputsModule.createInputApi(inputTypes.SELECT, ["required", "age-end"], undefined, "age-end", "Maximalalter", undefined, undefined, allAges);
    let graduationsInput = MaterialInputsModule.createInputApi(inputTypes.CHECKBOX, ["required"], undefined, "graduations", undefined, undefined, undefined, graduationsOptions);
    let teamsSwitch = MaterialInputsModule.createInputApi(inputTypes.SWITCH, [], undefined, "teams", "Teams", undefined, undefined, undefined);
    let kihonSwitch = MaterialInputsModule.createInputApi(inputTypes.SWITCH, [], undefined, "kihon", "Kihon", undefined, undefined, undefined);

    if (name) {
      tournamentNameInput.setValue(name);
    }
    if (ageStart) {
      ageStartInput.setValue(ageStart);
    }
    if (ageEnd) {
      ageEndInput.setValue(ageEnd);
    }
    if (teams) {
      teamsSwitch.turnOn();
    }
    if (kihon) {
      kihonSwitch.turnOn();
    }

    container.appendChild(GeneralModule.generateElementApi("h2", [], "Wettkampfname"))
    container.appendChild(tournamentNameInput.inputContainer);
    container.appendChild(GeneralModule.generateElementApi("h2", [], "Altersgrenzen"))
    container.appendChild(ageStartInput.inputContainer);
    container.appendChild(ageEndInput.inputContainer);
    container.appendChild(GeneralModule.generateElementApi("h2", [], "Graduierungen"));
    container.appendChild(graduationsInput.inputContainer);
    container.appendChild(GeneralModule.generateElementApi("h2", [], "Teams?"));
    container.appendChild(teamsSwitch.inputContainer);
    container.appendChild(GeneralModule.generateElementApi("h2", [], "Kihon?"));
    container.appendChild(kihonSwitch.inputContainer);

    checkAgeRange(ageStartInput, ageEndInput);

    return container;
  }

  function checkAgeRange(input1, input2) {
    let inputTypes = GeneralModule.generalVariables.inputTypes;
    if (input1.inputType === input2.inputType && input1.inputType === inputTypes.SELECT) {

      input1.inputContainer.addEventListener("change", function () {
        if (input2.hasUserInput()) {
          checkAges(input1, input2);
        }
      });
      input2.inputContainer.addEventListener("change", function () {
        if (input1.hasUserInput()) {
          checkAges(input1, input2);
        }
      });

    }
  }

  function checkAges(input1, input2) {
    let errorTypes = GeneralModule.generalVariables.errorTypes;
    let age1 = parseInt(input1.getValue());
    let age2 = parseInt(input2.getValue());

    if (age1 > age2) {
      input2.throwInputError(errorTypes.CUSTOM, "Die Differenz der Altersgrenzen muss eine natürliche Zahl ergeben.");
    } else {
      input2.revokeInputError(errorTypes.CUSTOM);
    }
  }

  function changeTournament(flipCard) {
    let tournamentName = flipCard.querySelector("[data-name=tournament-name]").innerText;
    let ageRange = flipCard.querySelector("[data-name=age-range]").innerText;
    let ageStart = ageRange.substring(0, ageRange.indexOf("-")).trim();
    let ageEnd = ageRange.substring(ageRange.indexOf("-") + 1).trim();
    let graduationRange = flipCard.querySelector("[data-name=graduations]").innerText;
    let graduationStart = graduationRange.substring(0, graduationRange.indexOf("-")).trim();
    let graduationEnd = graduationRange.substring(graduationRange.indexOf("-") + 1).trim();
    let allGraduations = GeneralModule.generalVariables.graduations;
    let graduations = allGraduations.slice(allGraduations.indexOf(graduationStart), allGraduations.indexOf(graduationEnd) + 1);
    let teams = flipCard.querySelector("[data-name=teams]").innerText === "Ja";
    let kihon = flipCard.querySelector("[data-name=kihon]").innerText === "Ja";

    let container = createTournamentModalContent(tournamentName, ageStart, ageEnd, graduations, teams, kihon);

    ModalModule.confirmModalApi("Wettkampf ändern", container, function () {
      handleChangedTournament(flipCard, container);
    },undefined, function () {
      return FormModule.checkFormApi(container, true);
    });

  }

  function handleChangedTournament(flipCard, content) {
    let adjustedTournamentObject = adjustTournamentObject(content);
    for (let property in adjustedTournamentObject) {
      if (adjustedTournamentObject.hasOwnProperty(property)) {
        flipCard.querySelector("[data-name=" + property + "]").innerHTML = adjustedTournamentObject[property];
      }
    }
  }

  function adjustTournamentObject(content) {
    let tournamentObject = TranslationModule.translateInputsToObjectApi(content);
    let adjustedTournamentObject = {};
    adjustedTournamentObject["tournament-name"] = tournamentObject["tournament-name"];
    adjustedTournamentObject["age-range"] = tournamentObject["age-start"] + "-" + tournamentObject["age-end"];
    let graduationStart = tournamentObject["graduations"][0];
    let graduationEnd = tournamentObject["graduations"][tournamentObject["graduations"].length - 1];
    adjustedTournamentObject["graduations"] = graduationStart + " - " + graduationEnd;
    adjustedTournamentObject["teams"] = tournamentObject["teams"] ? "Ja" : "Nein";
    adjustedTournamentObject["kihon"] = tournamentObject["kihon"] ? "Ja" : "Nein";
    return adjustedTournamentObject;
  }

})(window, document);
