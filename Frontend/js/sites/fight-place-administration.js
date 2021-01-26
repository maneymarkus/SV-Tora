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
        let inputContainer = MaterialInputsModule.createInputApi(GeneralModule.generalVariables.inputTypes.TEXT, undefined, undefined, "fight-place-name", "Bezeichnung", name, undefined, undefined);
        ModalModule.confirmModalApi("Pool hinzufügen", inputContainer, function () {
            let inputObject = MaterialInputsModule.getInputObjectApi(inputContainer);
            let value = inputObject.getValue();
            let fightPlace = createFightPlace(value)
            fightPlacesContainer.appendChild(fightPlace);
        });

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

    let removedInput = false;

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
            removedInput = false;
            let width = h2.offsetWidth;
            h2.style.display = "none";
            let nameInput = GeneralModule.generateElementApi("input", ["fight-place-name"]);
            nameInput.value = h2.innerText;
            fightPlace.appendChild(nameInput);
            nameInput.style.width = width + "px";
            nameInput.focus();
            nameInput.addEventListener("focusout", function() {
                endInput(nameInput, fightPlace);
            });
            nameInput.addEventListener("keydown", function (e) {
                let keyCode = e.which || e.keyCode;
                if (keyCode === 13) {
                    endInput(nameInput, fightPlace);
                }
            });
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

    function endInput(input, fightPlace) {
        if (!removedInput) {
            let valueTarget = fightPlace.querySelector("h2.fight-place-name");
            removedInput = true;
            let value = input.value.trim();
            if (value === "") {
                input.focus();
                return;
            }
            input.remove();
            valueTarget.innerHTML = value;
            valueTarget.style.removeProperty("display");
        }
    }

})(window, document);
