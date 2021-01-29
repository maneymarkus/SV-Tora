/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function(window, document, undefined) {

    let dependencies = ["PrimaryButtonModule", "MaterialInputsModule", "ModalModule"];
    GeneralModule.checkDependenciesApi(dependencies);

    let fightPlacesContainer = document.querySelector("div.fight-places-container");
    let addButton = document.querySelector("a.primary-button.add");

    addButton.addEventListener("click", function () {

        let counter = document.querySelectorAll("div.fight-place").length + 1;
        let name = "Pool " + counter;
        let input = MaterialInputsModule.createInputApi(GeneralModule.generalVariables.inputTypes.TEXT, undefined, undefined, "fight-place-name", "Bezeichnung", name, undefined, undefined);
        ModalModule.confirmModalApi("Pool hinzufügen", input.inputContainer, function () {
            let value = input.getValue();
            let fightPlace = createFightPlace(value)
            fightPlacesContainer.appendChild(fightPlace);
        }, undefined, undefined);

    });

    function createFightPlace(name) {
        let fightPlace = GeneralModule.generateElementApi("div", ["fight-place"]);
        fightPlace.appendChild(GeneralModule.generateElementApi("h2", ["fight-place-name"], name));
        fightPlace.appendChild(PrimaryButtonModule.createPrimaryButtonApi(["rename"], undefined, "edit", "Namen ändern"));
        fightPlace.appendChild(PrimaryButtonModule.createPrimaryButtonApi(["delete"], undefined, "delete", "Pool löschen"));
        let fightsP = GeneralModule.generateElementApi("p", ["fights"]);
        fightsP.appendChild(GeneralModule.generateElementApi("span", ["count-fights"], "0"));
        fightsP.appendChild(document.createTextNode(" Kämpfe"));
        fightPlace.appendChild(fightsP);

        return fightPlace;
    }

    let renameH2 = undefined;

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
            MaterialInputsModule.createQuickInputApi(width, value, endInput, nextSibling);
            return;
        }

        // delete fight place
        if (target.classList.contains("delete")) {
            let countFightPlaces = document.querySelectorAll("div.fight-place").length;
            let countFights = parseInt(fightPlace.querySelector("span.count-fights").innerText);
            let fightPlaceName = fightPlace.querySelector("h2").innerText;
            if (countFightPlaces <= 1) {
                ModalModule.infoModalApi("Pool löschen", "Mindestens ein Pool muss existieren, da sonst der Wettkampf nicht ausgetragen werden kann. Das heißt, diesen letzten Pool kannst du nicht löschen. Du kannst allerdings einen neuen Pool hinzufügen und dann diesen Pool löschen.");
            } else {
                if (countFights > 0) {
                    ModalModule.confirmModalApi("Wettkampffläche löschen", "Willst du \"" + fightPlaceName + "\" wirklich löschen? Alle schon zugeordneten Kämpfe werden damit gelöscht. Dies kann nicht rückgängig gemacht werden.", function () {
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

})(window, document);
