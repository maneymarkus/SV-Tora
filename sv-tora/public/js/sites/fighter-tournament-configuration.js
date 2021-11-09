/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function(window, document, undefined) {

    let dependencies = ["PrimaryButtonModule", "MaterialInputsModule", "ModalModule", "FormModule"];
    App.GeneralModule.checkDependencies(dependencies);

    let backButton = document.querySelector("a.link.cancel-configuration");
    let fighterCards = document.querySelectorAll("div.fighter-card");
    let availableFighterCards = [];

    backButton.addEventListener("click", function (e) {
        e.preventDefault();
        if (availableFighterCards.length > 0 || document.querySelector(".current")) {
            App.ModalModule.confirmModal("Abbrechen", "Willst du die Konfigurierung der verbleibenden Kämpfer wirklich abbrechen?", function () {
                window.location.href  = backButton.getAttribute("href");
            });
        } else {
            window.location.href  = backButton.getAttribute("href");
        }
    });

    let counter = 0;

    fighterCards.forEach((fighterCard) => {

        if (counter > 1) {
            fighterCard.style.display = "none";
        } else {
            counter++;
        }

        availableFighterCards.push(fighterCard);

        let fighterName = fighterCard.querySelector("h2.fighter-name").innerText;

        let enrollButton = fighterCard.querySelector("a.primary-button.enroll-fighter");
        let cancelButton = fighterCard.querySelector("a.primary-button.unenroll-fighter");
        let configuration = fighterCard.querySelector("div.configuration");

        App.PrimaryButtonModule.disablePrimaryButton(enrollButton);

        configuration.addEventListener("input", function (e) {
            handleEnrollButton(configuration, enrollButton);
            let target = e.target;
            while (!target.classList.contains("exam-type-configuration") && target.parentElement) {
                target = target.parentElement;
            }
            if (target.classList.contains("exam-type-configuration")) {
                if (target.querySelector(".select-input-container")) {
                    let enrollmentChoice = target.querySelector(".radio-group");
                    let enrollmentChoiceObject = App.MaterialInputsModule.getInputObject(enrollmentChoice);
                    let categorySelect = target.querySelector(".select-input-container");
                    let categorySelectObject = App.MaterialInputsModule.getInputObject(categorySelect);
                    if (enrollmentChoiceObject.getValue() === "1") {
                        handleCategoryConfiguration(true, categorySelectObject, configuration, enrollButton);
                    } else {
                        handleCategoryConfiguration(false, categorySelectObject, configuration, enrollButton);
                    }
                }
            }
        });

        enrollButton.addEventListener("click", function (e) {
            e.preventDefault();
            enrollFighter(enrollButton.getAttribute("href"), fighterCard);
        });

        cancelButton.addEventListener("click", function (e) {
            e.preventDefault();
            if (fighterCard.classList.contains("current")) {
                let url = cancelButton.getAttribute("href");
                if (url !== "#") {
                    App.ModalModule.confirmModal("Kämpfer abmelden", "Willst du " + fighterName + " wirklich abmelden?", function () {
                        dontEnrollFighter(fighterCard, url);
                    });
                } else {
                    App.ModalModule.confirmModal("Kämpfer nicht anmelden", "Willst du " + fighterName + " wirklich nicht anmelden?", function () {
                        dontEnrollFighter(fighterCard);
                    });
                }
            }
        });

    });

    let firstCard = availableFighterCards.shift();
    let lastCard = false;
    if (availableFighterCards.length <= 0) {
        lastCard = true;
    }
    firstCard.classList.add("current");

    function checkConfiguration(configuration) {
        if (!App.FormModule.checkForm(configuration, false)) {
            return false;
        }
        let participationRadios = configuration.querySelectorAll(".radio-group");
        let atLeastOneParticipation = false;
        participationRadios.forEach((radioGroup) => {
            let radioObject = App.MaterialInputsModule.getInputObject(radioGroup);
            if (!atLeastOneParticipation && radioObject.getValue().toLowerCase() === "1") {
                atLeastOneParticipation = true;
            }
        });
        if (!atLeastOneParticipation) {
            return false;
        }
        return true;
    }

    function handleEnrollButton(configuration, primaryButton) {
        if (checkConfiguration(configuration)) {
            App.PrimaryButtonModule.enablePrimaryButton(primaryButton);
        } else {
            App.PrimaryButtonModule.disablePrimaryButton(primaryButton);
        }
    }

    function handleCategoryConfiguration(enable, selectObject, configuration, enrollButton) {
        if (enable) {
            selectObject.setRequired(true)
            selectObject.enable();
        } else {
            selectObject.setRequired(false);
            selectObject.disable();
        }
        handleEnrollButton(configuration, enrollButton);
    }

    function enrollFighter(url, fighterCard) {
        let data = {
            "Disziplin": {},
            "Kategorie": {},
        };
        fighterCard.querySelectorAll(".radio-group").forEach((inputContainer) => {
            let inputObject = App.MaterialInputsModule.getInputObject(inputContainer);
            data["Disziplin"][inputObject.name] = inputObject.getValue();
        });
        fighterCard.querySelectorAll(".select-input-container").forEach((inputContainer) => {
            let inputObject = App.MaterialInputsModule.getInputObject(inputContainer);
            data["Kategorie"][inputObject.name] = inputObject.getValue();
        });
        App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.POST, url, function () {
            fighterCard.classList.add("enrolled");
            showNextCard(fighterCard);
        }, data, true);
    }

    function dontEnrollFighter(fighterCard, url = undefined) {
        function aux() {
            fighterCard.classList.add("not-enrolled");
            showNextCard(fighterCard);
        }
        if (typeof url !== "undefined") {
            App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.DELETE, url, () => {
                aux();
            }, undefined, true);
        } else {
            aux();
        }
    }

    function showNextCard(previousCard) {
        if (lastCard) {
            done(previousCard);
        } else {
            window.setTimeout(function () {
                previousCard.remove();
                let nextCard = availableFighterCards.shift();
                nextCard.classList.add("current");
                if (availableFighterCards[0]) {
                    availableFighterCards[0].style.removeProperty("display");
                } else {
                    lastCard = true;
                }
            }, 1000);
        }
    }

    function done(lastCard) {
        window.setTimeout(function () {
            lastCard.remove();
        }, 1000);
        App.ModalModule.infoModal("Fertig", "Alle ausgwählten Kämpfer wurden konfiguriert und gegebenenfalls zum Wettkampf angemeldet.", function () {
            window.location.href  = backButton.getAttribute("href");
        });
    }

})(window, document);
