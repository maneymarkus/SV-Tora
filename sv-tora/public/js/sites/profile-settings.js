/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

    let dependencies = ["ModalModule", "TooltipModule"];
    App.GeneralModule.checkDependencies(dependencies);

    // Tooltips
    App.TooltipModule.createTooltip(".tt-trigger.darkmode", "Dieser Switch stellt ein, ob der dunkle oder der helle Modus verwendet werden soll. Einfach ausprobieren! :)");
    App.TooltipModule.createTooltip(".tt-trigger.table-optimization", "Dieser Switch kontrolliert die optimierte Tabellen-Darstellung auf kleinen Displays, wie zum Beispiel Smartphones.");

    let nameElement = document.querySelector("p.current-name");
    let nameChangeBtn = document.querySelector("a.change-name");
    let updateUrl = nameChangeBtn.getAttribute("href");

    // User wants to change name
    nameChangeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        let currentName = nameElement.innerText;
        let nameInput = App.MaterialInputsModule.createInput(App.GeneralModule.generalVariables.inputTypes.TEXT, ["required", "name"], undefined, "name", "Name", currentName, undefined, undefined);
        let ModalWindow = App.ModalModule.confirmModal("Namen ändern", nameInput.inputContainer, undefined, undefined, function () {
            if (!App.FormModule.checkForm(nameInput.inputContainer, true)) {
                return false;
            } else {
                let data = {name: nameInput.getValue()}
                App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.PUT, updateUrl, () => {
                    ModalWindow.closeModal();
                    nameElement.innerHTML = data.name;
                }, data, true);
            }
        });
    });

    // User wants to change Password
    let passwordChangeBtn = document.querySelector("a.change-password");
    const passwordUpdateUrl = passwordChangeBtn.getAttribute("href");
    passwordChangeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        let oldPasswordInput = App.MaterialInputsModule.createInput(App.GeneralModule.generalVariables.inputTypes.PASSWORD, ["required", "password", "old-password"], undefined, "old-password", "Altes Passwort", undefined, undefined, undefined);
        let passwordInput = App.MaterialInputsModule.createInput(App.GeneralModule.generalVariables.inputTypes.PASSWORD, ["required", "password"], undefined, "password", "Neues Passwort", undefined, undefined, undefined);
        let passwordConfirmInput = App.MaterialInputsModule.createInput(App.GeneralModule.generalVariables.inputTypes.PASSWORD, ["required", "password", "password-confirmation"], undefined, "password-confirmation", "Neues Passwort bestätigen", undefined, undefined, undefined);
        let content = App.GeneralModule.generateElement("div");
        content.appendChild(oldPasswordInput.inputContainer);
        content.appendChild(passwordInput.inputContainer);
        content.appendChild(passwordConfirmInput.inputContainer);
        App.FormModule.checkConfirmation(passwordInput.inputContainer, passwordConfirmInput.inputContainer);
        let ModalWindow = App.ModalModule.confirmModal("Passwort ändern", content, undefined, undefined, function () {
            if (!App.FormModule.checkForm(content, true)) {
                return false;
            } else {
                let data = {
                    password: passwordInput.getValue(),
                    oldPassword: oldPasswordInput.getValue(),
                }
                App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.PUT, passwordUpdateUrl, () => {
                    ModalWindow.closeModal();
                }, data, true);
            }
        });
    });

    // User toggles theme mode
    let darkmodeSwitch = App.MaterialInputsModule.getInputObject(document.querySelector("label.darkmode-switch"));
    darkmodeSwitch.inputContainer.addEventListener("click", function (e) {
        e.preventDefault();
        App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.PUT, updateUrl, () => {
            document.querySelector("body").classList.toggle("darkmode");
            darkmodeSwitch.toggle();
        }, {dark_mode: (true !== darkmodeSwitch.getValue())}, true);
    });

    // User toggles table smartphone optimization
    let tableSwitch = App.MaterialInputsModule.getInputObject(document.querySelector("label.table-optimization-switch"));
    tableSwitch.inputContainer.addEventListener("click", function (e) {
        e.preventDefault();
        App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.PUT, updateUrl, () => {
            tableSwitch.toggle();
        }, {smartphone_optimized_tables: (true !== tableSwitch.getValue())}, true);
    });

})(window, document);
