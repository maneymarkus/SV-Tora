/*
    Encapsulate (not anywhere else needed) code in anonymous function
*/

(function (window, document, undefined) {

    let dependencies = ["PrimaryButtonModule", "SecondaryButtonModule", "ModalModule", "FormModule", "TranslationModule", "MaterialInputsModule"];
    App.GeneralModule.checkDependencies(dependencies);

    let flipCardContainer = document.querySelector(".perspective-container");
    let flipCards = document.querySelectorAll(".tournament-card");
    let addTournamentButton = document.querySelector(".add-tournament");

    function setContainerWidth() {
        flipCards = document.querySelectorAll(".tournament-card");
        let containerMinWidth = 18.5 * flipCards.length;
        flipCardContainer.style.minWidth = containerMinWidth + "rem";
    }
    setContainerWidth();

    flipCardContainer.addEventListener("click", function (e) {
        let target = e.target;
        while (target.nodeName !== "BODY" && !target.classList.contains("secondary-button") && !target.classList.contains("tournament-card")) {
            target = target.parentElement;
        }

        // either delete or edit clicked tournament card
        if (target.classList.contains("secondary-button")) {
            e.preventDefault();
            let flipCard = target;
            while (!flipCard.classList.contains("tournament-card")) {
                flipCard = flipCard.parentElement;
            }

            if (target.classList.contains("edit")) {
                let url = target.getAttribute("href");
                changeTournamentTemplate(flipCard, url);
            }

            if (target.classList.contains("delete")) {
                let url = target.getAttribute("href");
                deleteTournamentTemplate(flipCard, url);
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

    addTournamentButton.addEventListener("click", function (e) {
        e.preventDefault();
        let url = addTournamentButton.getAttribute("href");
        App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.GET, url + "/create", (inputData) => {
            let container = App.TranslationModule.translateObjectToInputs(inputData, true);
            let ModalWindow = App.ModalModule.confirmModal("Neuen Wettkampf erstellen", container, undefined, undefined, function () {
                if (!App.FormModule.checkForm(container, true)) {
                    return false;
                } else {
                    let data = App.TranslationModule.translateInputsToObject(container);
                    App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.POST, url, () => {
                        ModalWindow.closeModal();
                        window.setTimeout(function () {
                            window.location.reload(true);
                        }, 5000);
                    }, data, true);
                }
            });
        }, undefined, true);
    });

    function deleteTournamentTemplate(flipCard, url) {
        App.ModalModule.deleteModal("Wettkampf-Vorlage löschen", "Bist du dir wirklich sicher, dass du diese Wettkampf-Vorlage komplett löschen möchtest? Das kann nicht rückgängig gemacht werden.", function () {
            App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.DELETE, url, () => {
                flipCard.remove();
                setContainerWidth();
            });
        });
    }

    function changeTournamentTemplate(flipCard, url) {
        App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.GET, url + "/edit", (inputData) => {
            let container = App.TranslationModule.translateObjectToInputs(inputData, true);
            let ModalWindow = App.ModalModule.confirmModal("Wettkampf ändern", container, undefined, undefined, function () {
                if (!App.FormModule.checkForm(container, true)) {
                    return false;
                } else {
                    let data = App.TranslationModule.translateInputsToObject(container);
                    App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.PUT, url, () => { ModalWindow.closeModal(); handleChangedTournamentTemplate(flipCard, data) }, data, true);
                }
            });
        }, undefined, true);

    }

    function handleChangedTournamentTemplate(flipCard, data) {
        flipCard.querySelector("[data-name=tournament_name]").innerHTML = data["Wettkampf-Name"];
        flipCard.querySelector("[data-name=age-range]").innerHTML = data["Mindestalter"] + " - " + data["Maximalalter"];
        flipCard.querySelector("[data-name=graduations]").innerHTML = data["Mindest-Graduierung"] + " - " + data["Maximal-Graduierung"];
        flipCard.querySelector("[data-name=teams]").innerHTML = data["Teams"] === true ? "Ja" : "Nein";
        flipCard.querySelector("[data-name=kihon]").innerHTML = data["Kihon"] === true ? "Ja" : "Nein";
    }

})(window, document);
