/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function(window, document, undefined) {

    let dependencies = ["PrimaryButtonModule", "MaterialInputsModule", "ModalModule", "FormModule"];
    GeneralModule.checkDependenciesApi(dependencies);

    let fighterCards = document.querySelectorAll("div.fighter-card");
    let availableFighterCards = [];

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

        PrimaryButtonModule.disablePrimaryButtonApi(enrollButton);

        configuration.addEventListener("input", function () {
            handleEnrollButton(configuration, enrollButton);
        });

        enrollButton.addEventListener("click", function () {
            enrollFighter(fighterCard);
        });

        cancelButton.addEventListener("click", function () {
            if (fighterCard.classList.contains("current")) {
                ModalModule.confirmModalApi("Kämpfer nicht anmelden", "Willst du " + fighterName + " wirklich nicht anmelden?", function () {
                    dontEnrollFighter(fighterCard);
                });
            }
        });

        if (fighterCard.querySelector("div.category-configuration")) {
            let kumiteChoice = fighterCard.querySelector("div.kumite .radio-group");
            let kumiteChoiceObject = MaterialInputsModule.getInputObjectApi(kumiteChoice);
            let categorySelect = fighterCard.querySelector("div.kumite .select-input-container");
            let categorySelectObject = MaterialInputsModule.getInputObjectApi(categorySelect);

            kumiteChoice.addEventListener("input", function () {
                if (kumiteChoiceObject.getValue() === "yes") {
                    handleCategoryConfiguration(true, categorySelectObject, configuration, enrollButton);
                } else {
                    handleCategoryConfiguration(false, categorySelectObject, configuration, enrollButton);
                }
            });
        }

    });

    let firstCard = availableFighterCards.shift();
    let lastCard = false;
    firstCard.classList.add("current");

    function checkConfiguration(configuration) {
        if (!FormModule.checkFormApi(configuration, false)) {
            return false;
        }
        let participationRadios = configuration.querySelectorAll(".radio-group");
        let atLeastOneParticipation = false;
        participationRadios.forEach((radioGroup) => {
            let radioObject = MaterialInputsModule.getInputObjectApi(radioGroup);
            if (!atLeastOneParticipation && radioObject.getValue().toLowerCase() === "yes") {
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
            PrimaryButtonModule.enablePrimaryButtonApi(primaryButton);
        } else {
            PrimaryButtonModule.disablePrimaryButtonApi(primaryButton);
        }
    }

    function handleCategoryConfiguration(enable, selectObject, configuration, enrollButton) {
        if (enable) {
            selectObject.inputContainer.classList.add("required");
            selectObject.enable();
        } else {
            selectObject.inputContainer.classList.remove("required");
            selectObject.disable();
        }
        handleEnrollButton(configuration, enrollButton);
    }

    function enrollFighter(fighterCard) {
        // TODO: enroll fighter to tournament in backend
        fighterCard.classList.add("enrolled");
        showNextCard(fighterCard);
    }

    function dontEnrollFighter(fighterCard) {
        fighterCard.classList.add("not-enrolled");
        showNextCard(fighterCard);
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
        ModalModule.infoModalApi("Fertig", "Alle ausgwählten Kämpfer wurden konfiguriert und gegebenenfalls zum Wettkampf angemeldet. Du kommst jetzt zum Wettkampf Dashboard zurück.", function () {
            // TODO: Switch back to Dashboard
            window.location.href  = "#";
        });
    }

})(window, document);
