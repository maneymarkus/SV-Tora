/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */

(function(window, document, undefined) {

    let dependencies = ["PrimaryButtonModule", "MaterialInputsModule", "ModalModule"];
    App.GeneralModule.checkDependencies(dependencies);

    let fightPlacesContainer = document.querySelector("div.fight-places-container");
    let addButton = document.querySelector("a.primary-button.add");

    addButton.addEventListener("click", function (e) {
        e.preventDefault();
        let url = addButton.getAttribute("href");
        let counter = document.querySelectorAll("div.fight-place").length + 1;
        let name = "Pool " + counter;
        let input = App.MaterialInputsModule.createInput(App.GeneralModule.generalVariables.inputTypes.TEXT, undefined, undefined, "fight-place-name", "Bezeichnung", name, undefined, undefined);
        let ModalWindow = App.ModalModule.confirmModal("Pool hinzufügen", input.inputContainer, undefined, undefined, function () {
            if (!App.FormModule.checkInput(input.inputContainer, true)) {
                return false;
            } else {
                let data = {"Name": input.getValue()}
                App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.POST, url, () => {
                    ModalWindow.closeModal();
                    window.setTimeout(() => {
                        window.location.reload();
                    }, 5000);
                }, data, true);
            }
        });

    });

    let renameH2 = undefined;

    let fightPlaceNames = [];
    let fightPlaceElements = fightPlacesContainer.querySelectorAll("div.fight-place");
    fightPlaceElements.forEach((fightPlace) => {
        fightPlaceNames.push(fightPlace.querySelector("h2.fight-place-name").innerText);
    });

    fightPlacesContainer.addEventListener("click", function (e) {
        e.preventDefault();
        let target = e.target;
        while (target.nodeName !== "BODY" && !target.classList.contains("primary-button")) {
            target = target.parentElement;
        }
        let fightPlace = target;
        if (target.classList.contains("primary-button")) {
            while (fightPlace.nodeName !== "BODY" && !fightPlace.classList.contains("fight-place")) {
                fightPlace = fightPlace.parentElement;
            }
        }

        // rename fight place
        if (target.classList.contains("rename")) {
            let url = target.getAttribute("href");
            let h2 = fightPlace.querySelector("h2.fight-place-name");
            renameH2 = h2;
            let width = h2.offsetWidth - 40;
            h2.classList.add("no-display");
            let value = h2.innerText;
            let nextSibling = fightPlace.querySelector(".primary-button.rename");
            App.MaterialInputsModule.createQuickTextInput(width, value, endInput.bind(url), nextSibling, quickInputValidation);
            return;
        }

        // delete fight place
        if (target.classList.contains("delete")) {
            let url = target.getAttribute("href");
            let countFightPlaces = document.querySelectorAll("div.fight-place").length;
            let countFights = parseInt(fightPlace.querySelector("span.count-fights").innerText);
            let fightPlaceName = fightPlace.querySelector("h2").innerText;
            if (countFightPlaces <= 1) {
                App.ModalModule.infoModal("Pool löschen", "Mindestens ein Pool muss existieren, da sonst der Wettkampf nicht ausgetragen werden kann. Das heißt, diesen letzten Pool kannst du nicht löschen. Du kannst allerdings einen neuen Pool hinzufügen und dann diesen Pool löschen.");
            } else {
                if (countFights > 0) {
                    App.ModalModule.confirmModal("Wettkampffläche löschen", "Willst du \"" + fightPlaceName + "\" wirklich löschen? Alle schon zugeordneten Kämpfe werden damit gelöscht. Dies kann nicht rückgängig gemacht werden.", function () {
                        deletePool(url, fightPlace);
                    });
                } else {
                    deletePool(url, fightPlace);
                }
            }
        }
    });

    function deletePool(url, fightPlace) {
        App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.DELETE, url, () => {
            fightPlace.remove();
        }, undefined, true);
    }

    function endInput(value) {
        // this should be set to url due to bind hack
        if (value !== renameH2.innerText) {
            let data = {"Name": value};
            App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.PUT, this, () => {
                renameH2.innerHTML = value;
            }, data, true);
        }
        renameH2.classList.remove("no-display");
    }

    let errorShown = false;

    function quickInputValidation(value) {
        let names = fightPlaceNames.slice();
        names.splice(names.indexOf(renameH2.innerText), 1);
        if (names.includes(value)) {
            if (!errorShown) {
                App.ModalModule.infoModal("Änderung Pool Name", "Pools müssen einen einzigartigen Namen haben.", function () {
                    return false;
                });
            }
            errorShown = true;
        } else {
            return true;
        }
    }

})(window, document);
