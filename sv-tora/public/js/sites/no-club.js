/*
    Encapsulate (not anywhere else needed) code in anonymous function
*/
(function (window, document, undefined) {

    let dependencies = [];
    App.GeneralModule.checkDependencies(dependencies);

    let informButton = document.querySelector(".secondary-button.inform-admins");

    informButton.addEventListener("click", function () {
        let preferredClubInput = App.MaterialInputsModule.createInput(App.GeneralModule.generalVariables.inputTypes.TEXT, ["required"], undefined, "preferred-club", "Gewünschter Verein", undefined, undefined, undefined);
        let ModalWindow = App.ModalModule.confirmModal("Administratoren informieren", preferredClubInput.inputContainer, undefined, undefined, function () {
            if (!App.FormModule.checkInput(preferredClubInput.inputContainer, true)) {
                return false;
            } else {
                let data = {preferredClub: preferredClubInput.getValue()};
                App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.POST, "/inform-admins-about-no-club", () => {ModalWindow.closeModal()}, undefined, data, true);
            }
        });
    });

})(window, document);
