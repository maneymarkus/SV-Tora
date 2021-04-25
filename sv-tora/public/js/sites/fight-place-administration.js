/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function(window, document, undefined) {

    let dependencies = ["PrimaryButtonModule", "MaterialInputsModule", "ModalModule"];
    App.GeneralModule.checkDependencies(dependencies);

    let fightPlacesContainer = document.querySelector("div.fight-places-container");
    let addButton = document.querySelector("a.primary-button.add");

    addButton.addEventListener("click", function () {

        let counter = document.querySelectorAll("div.fight-place").length + 1;
        let name = "Pool " + counter;
        let input = App.MaterialInputsModule.createInput(GeneralModule.generalVariables.inputTypes.TEXT, undefined, undefined, "fight-place-name", "Bezeichnung", name, undefined, undefined);
        App.ModalModule.confirmModal("Pool hinzufügen", input.inputContainer, function () {
            let value = input.getValue();
            let fightPlace = createFightPlace(value)
            fightPlacesContainer.appendChild(fightPlace);
        }, undefined, undefined);

    });

    function createFightPlace(name) {
        let fightPlace = App.GeneralModule.generateElement("div", ["fight-place"]);
        fightPlace.appendChild(App.GeneralModule.generateElement("h2", ["fight-place-name"], name));
        fightPlace.appendChild(App.PrimaryButtonModule.createPrimaryButton(["rename"], undefined, "edit", "Namen ändern"));
        fightPlace.appendChild(App.PrimaryButtonModule.createPrimaryButton(["delete"], undefined, "delete", "Pool löschen"));
        let fightsP = App.GeneralModule.generateElement("p", ["fights"]);
        fightsP.appendChild(App.GeneralModule.generateElement("span", ["count-fights"], "0"));
        fightsP.appendChild(document.createTextNode(" Kämpfe"));
        fightPlace.appendChild(fightsP);

        return fightPlace;
    }

    let renameH2 = undefined;

    let fightPlaceNames = [];
    let fightPlaceElements = fightPlacesContainer.querySelectorAll("div.fight-place");
    fightPlaceElements.forEach((fightPlace) => {
        fightPlaceNames.push(fightPlace.querySelector("h2.fight-place-name").innerText);
    });

    fightPlacesContainer.addEventListener("click", function (e) {
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
            let h2 = fightPlace.querySelector("h2.fight-place-name");
            renameH2 = h2;
            let width = h2.offsetWidth - 40;
            h2.classList.add("no-display");
            let value = h2.innerText;
            let nextSibling = fightPlace.querySelector(".primary-button.rename");
            App.MaterialInputsModule.createQuickTextInput(width, value, endInput, nextSibling, quickInputValidation);
            return;
        }

        // delete fight place
        if (target.classList.contains("delete")) {
            let countFightPlaces = document.querySelectorAll("div.fight-place").length;
            let countFights = parseInt(fightPlace.querySelector("span.count-fights").innerText);
            let fightPlaceName = fightPlace.querySelector("h2").innerText;
            if (countFightPlaces <= 1) {
                App.ModalModule.infoModal("Pool löschen", "Mindestens ein Pool muss existieren, da sonst der Wettkampf nicht ausgetragen werden kann. Das heißt, diesen letzten Pool kannst du nicht löschen. Du kannst allerdings einen neuen Pool hinzufügen und dann diesen Pool löschen.");
            } else {
                if (countFights > 0) {
                    App.ModalModule.confirmModal("Wettkampffläche löschen", "Willst du \"" + fightPlaceName + "\" wirklich löschen? Alle schon zugeordneten Kämpfe werden damit gelöscht. Dies kann nicht rückgängig gemacht werden.", function () {
                        fightPlace.remove();
                    });
                } else {
                    fightPlace.remove();
                }
            }
        }
    });

    function endInput(value) {
            renameH2.innerHTML = value;
            renameH2.classList.remove("no-display");
            renameH2 = undefined;
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
