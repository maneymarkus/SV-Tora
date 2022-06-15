/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */

(function (window, document, undefined) {

    let dependencies = ["PrimaryButtonModule", "SecondaryButtonModule", "MaterialInputsModule", "ModalModule", "FormModule", "TranslationModule", "TagModule", "TiltModule"];
    App.GeneralModule.checkDependencies(dependencies);

    let createTournamentBtn = document.querySelector(".host-tournament");

    if (createTournamentBtn !== null) {
        createTournamentBtn.addEventListener("click", function (e) {
            e.preventDefault();
            let url = createTournamentBtn.getAttribute("href");
            App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.GET, url + "/create", (data) => {
                let container = App.TranslationModule.translateObjectToInputs(data, true);
                let modalWindow = App.ModalModule.confirmModal("Wettkampf veranstalten", container, undefined, undefined, function () {
                    if (!App.FormModule.checkForm(container, true)) {
                        return false;
                    } else {
                        let data = App.TranslationModule.translateInputsToObject(container);
                        App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.POST, url, () => {
                            modalWindow.closeModal();
                            window.setTimeout(function () {
                                window.location.reload();
                            }, 5000);
                        }, data, true);
                    }
                });
            }, undefined, true);

        });
    }

})(window, document);
