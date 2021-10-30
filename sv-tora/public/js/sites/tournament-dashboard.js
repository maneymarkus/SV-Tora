/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */

(function (window, document, undefined) {

    let GeneralModule = App.GeneralModule;
    let MaterialInputsModule = App.MaterialInputsModule;
    let SecondaryButtonModule = App.SecondaryButtonModule;
    let ModalModule = App.ModalModule;

    let dependencies = ["PrimaryButtonModule", "SecondaryButtonModule", "MaterialInputsModule", "ModalModule", "FormModule", "TranslationModule", "TagModule", "TiltModule"];
    GeneralModule.checkDependencies(dependencies);

    let body = document.querySelector("body");

    /**
     * This block handles the correct display of the progress of the current tournament
     */

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

    /**
     * This block handles the switching to competition mode
     */

    let fightModeButton = document.querySelector("a.fight-mode");
    let tournamentDateString = document.querySelector(".tournament-container span.tournament-date").innerText;
    let fightingSystemsContainer = document.querySelector("a.fighting-systems");

    fightModeButton.addEventListener("click", function (e) {
        ModalModule.infoModal("Wettkamf-Modus", "Leider ist der Wettkampf-Modus noch nicht implementiert und steht demnach leider nicht zur Verfügung.");
        /*
        if (checkPreparation()) {
            if (checkDate()) {
                // everything is fine so just do nothing and follow the link :)
                // TODO: Switch to competition mode
            } else {
                e.preventDefault();
                let targetUrl = fightModeButton.getAttribute("href");
                ModalModule.confirmModal("Wettkampftag noch nicht erreicht", "Der Wettkampf ist noch nicht heute sondern am " + tournamentDateString + " geplant. Willst du wirklich in den Wettkampftagmodus wechseln? Wenn die Anmeldung noch offen ist, wird diese jetzt geschlossen.", function () {
                    window.location.href = targetUrl;
                });
            }
        } else {
            e.preventDefault();
            ModalModule.infoModal("Wettkampf Vorbereitung nicht ausreichend.", "Du kannst noch nicht in den Wettkampf-Modus wechseln, da die Vorbereitung noch nicht abgeschlossen ist. Das Mindeste ist, dass jede Kategorie ein Kampfsystem zugewiesen bekommt.");
        }
         */
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
            e.preventDefault();
            let url = target.getAttribute("href");
            deleteTournament(url);
        }

        // change status of the tournament
        if (target.classList.contains("change-status")) {
            e.preventDefault();
            let url = target.getAttribute("href");
            changeStatusOfTournament(url);
        }

        // change tournament general properties
        if (target.classList.contains("change-tournament")) {
            e.preventDefault();
            let url = target.getAttribute("href");
            changeTournament(url);
        }

        // complete tournament
        if (target.classList.contains("complete-tournament")) {
            e.preventDefault();
            let url = target.getAttribute("href");
            completeTournament(url);
        }

        // exclude clubs
        if (target.classList.contains("exclude-clubs")) {
            e.preventDefault();
            openExclusionModal();
        }

    });


    /**
     * This function ends a successfully completed tournament and clears this page, making it available for new tournaments to be hosted
     */
    function completeTournament(url) {
        App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.POST, url, function () {
            ModalModule.infoModal("Wettkampf erfolgreich abgeschlossen", "Der Wettkampf wurde erfolgreich abgeschlossen. Hoffentlich habt ihr den Wettkampf ebenfalls erfolgreich abgeschlossen. Bis zum nächsten Mal. (Beim Klick auf \"OK\" oder beim Schließen des Modals lädt die Seite neu und du kannst einen neuen Wettkampf erstellen)", function () {
                window.location.reload();
            });
        }, undefined, true);
    }

    /**
     * This function handles the cancellation of the tournament
     */
    function deleteTournament(url) {
        ModalModule.deleteModal("Wettkampf absagen", "Willst du den Wettkampf wirklich absagen? Diese Aktion kann nicht rückgängig gemacht werden.", function () {
            App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.DELETE, url, (responseData) => {
                ModalModule.confirmModal("Wettkampf abgesagt", "Du hast den Wettkampf abgesagt. Willst du die anderen Vereine (dies beinhaltet alle eingeladenen Vereine) über die Absage informieren?", function () {
                    window.location.href = responseData["url"];
                }, function() {
                    ModalModule.infoModal("Wettkampf gelöscht", "Der Wettkampf wurde gelöscht. Wenn du dieses Info-Fenster schließt, läd die Seite neu und du kannst einen neuen Wettkampf erstellen.", function () {
                        window.location.reload();
                    });
                });
            }, undefined, true);
        });
    }

    /**
     * This function handles the change of the status of the current tournament
     */
    function changeStatusOfTournament(url) {
        App.SendRequestModule.getData(url, (data) => {
            let container = App.TranslationModule.translateObjectToInputs(data, true);
            ModalModule.confirmModal("Wettkampf Status ändern", container, function () {
                let data = App.TranslationModule.translateInputsToObject(container);
                App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.POST, url, (response) => {
                    window.setTimeout(function () {
                        window.location.reload();
                    }, 5000);
                }, data, true);
            }, undefined, function () {
                return App.FormModule.checkForm(container, true);
            });
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
    function changeTournament(url) {
        App.SendRequestModule.getData( url + "/edit", (responseData) => {
            let container = App.TranslationModule.translateObjectToInputs(responseData, true);
            let modalWindow = ModalModule.confirmModal("Wettkampf ändern", container, undefined, undefined, function () {
                if (!App.FormModule.checkForm(container, true)) {
                    return false;
                } else {
                    let data = App.TranslationModule.translateInputsToObject(container);
                    App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.PUT, url, (response) => {
                        modalWindow.closeModal();
                        handleChangedTournament(container, response["url"]);
                    }, data, true);
                }
            });
        });

    }

    /**
     * This function handles the chosen changes to the current tournament
     * @param content {HTMLElement} The content of the modal window with the chosen options
     * @param reloadUrl {string} The url to be relocated to
     */
    function handleChangedTournament(content, reloadUrl) {

        let tournamentObject = App.TranslationModule.translateInputsToObject(content);
        for (let property in tournamentObject) {
            console.log(property);
            if (tournamentObject.hasOwnProperty(property)) {
                let respectiveElement = tournamentContainer.querySelector("[data-name='" + property + "']");
                respectiveElement.innerHTML = tournamentObject[property];
            }
        }

        ModalModule.confirmModal("Wettkampf Änderungen", "Willst du die schon angemeldeten Vereine über die Änderungen informieren?", function () {
            window.location.href = reloadUrl;
        });
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
    let excludeInputObject = MaterialInputsModule.getInputObject(excludeInput);
    let countExcludedClubsSpan = excludedClubsCard.querySelector("span.count-excluded");
    let checkboxesObject = undefined;

    SecondaryButtonModule.disableSecondaryButton(excludeButton);

    let allClubsUrl = "/entities/clubs/names";
    let allClubs = [];
    let baseUrl = excludedClubsCard.getAttribute("href");
    let enrolledClubsUrl = baseUrl + "/clubs/enrolled";
    let enrolledClubs = [];
    let excludedClubsUrl = baseUrl + "/clubs/excluded";
    let excludedClubs = [];
    let excludeClubUrl = baseUrl + "/clubs/exclude";
    let includeClubUrl = baseUrl + "/clubs/include";

    /**
     * A click on the excluded club card in the dashboard should open the exclusion modal
     */
    excludedClubsCard.addEventListener("click", function (e) {
        e.preventDefault();
        openExclusionModal();
    });

    /**
     * A click on the exclude action button in the dashboard should open the exclusion modal
     */
    closeExclusionModalButton.addEventListener("click", function (e) {
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
                SecondaryButtonModule.disableSecondaryButton(excludeButton);
            } else {
                SecondaryButtonModule.enableSecondaryButton(excludeButton);
            }
        } else {
            SecondaryButtonModule.disableSecondaryButton(excludeButton);
        }
    }

    /**
     * A click on the exclude button triggers the exclusion of selected entities
     */
    excludeButton.addEventListener("click", function () {
        let selection = checkboxesObject.getValue();
        if (selection.length > 0) {
            excludeEntities(selection);
        }
        SecondaryButtonModule.disableSecondaryButton(excludeButton);
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
            let representedClub = clubTag.querySelector(".tag-value").innerText;
            App.ModalModule.confirmModal("Verein nicht mehr ausschließen?", "Möchtest du " + representedClub + " nicht mehr ausschließen? User, die diesem Verein angehören, sehen den Wettkampf dann wieder im Dashboard, bekommen Informationen (via E-Mail) und können Personen anmelden.", function () {
                let data = {"club": representedClub}
                App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.POST, includeClubUrl, () => {
                    excludedClubs.splice(excludedClubs.indexOf(representedClub), 1);
                    clubTag.remove();
                    updateCountExcludedClubs();
                    insertClubCheckboxes();
                    if (excludedClubs.length === 0 && !excludedContainer.querySelector(".no-exclusion")) {
                        excludedContainer.appendChild(GeneralModule.generateElement("span", ["no-exclusion"], "Keiner"));
                    }
                }, data, true);
            });
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

    /**
     * This function excludes a given entity (from this tournament)
     * @param entity {string} The given entity which will be excluded
     */
    function excludeEntity(entity) {
        if (!excludedClubs.includes(entity)) {
            if (enrolledClubs.includes(entity)) {
                ModalModule.confirmModal(entity + " ausschließen", "Willst du " + entity + " wirklich ausschließen? " + entity + " ist schon zum aktuellen Wettkampf angemeldet. Alle dies betreffenden Anmeldungen werden storniert. Das kann nicht rückgängig gemacht werden.", function () {
                    exclude();
                });
            } else {
                exclude();
            }
        }
        function exclude() {
            let data = {"club": entity};
            App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.POST, excludeClubUrl, () => {
                if (enrolledClubs.includes(entity)) {
                    enrolledClubs.splice(enrolledClubs.indexOf(entity), 1);
                }
                createAndAppendExclusionTag(entity);
                excludedClubs.push(entity);
                insertClubCheckboxes();
                updateCountExcludedClubs();
            }, data, true);
        }
    }

    /**
     * This function creates a tag element for the entity which has been excluded and directly appends it to the responsible container element
     * @param entity
     */
    function createAndAppendExclusionTag(entity) {
        let excludeTag = App.TagModule.createTag(["excluded-club"], entity);
        if (excludedContainer.querySelector("span.no-exclusion")) {
            excludedContainer.querySelector("span.no-exclusion").remove();
        }
        excludedContainer.appendChild(excludeTag);
    }

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
        checkboxesObject = MaterialInputsModule.createInput(GeneralModule.generalVariables.inputTypes.CHECKBOX, undefined, undefined, "exclude-clubs", undefined, undefined, undefined, options);
        clubContainer.appendChild(checkboxesObject.inputContainer);

        // if the user selects a club checkbox the exclusion button should be enabled
        checkboxesObject.inputContainer.addEventListener("input", function () {
            controlExclusionButton();
        });
    }

    /**
     * This function is responsible for opening the exclusion modal
     */
    function openExclusionModal() {
        ModalModule.appendOverlay();
        exclusionModal.classList.add("open");
        App.LoaderModule.addBigLoader();
        App.SendRequestModule.getData(allClubsUrl, (data) => {
            // remove "SV Tora" as this can't be excluded from the tournament
            data.splice(data.indexOf("SV Tora"), 1);
            allClubs = data;
            App.SendRequestModule.getData(enrolledClubsUrl, (data) => {
                enrolledClubs = data;
            });
            App.SendRequestModule.getData(excludedClubsUrl, (data) => {
                excludedClubs = data;
                App.LoaderModule.removeBigLoader();
                insertClubCheckboxes();
            });
        });
    }

    /**
     * This function is responsible for closing the exclusion modal
     */
    function closeExclusionModal() {
        ModalModule.removeOverlay();
        exclusionModal.classList.remove("open");
        excludeInputObject.setValue("");
    }

})(window, document);
