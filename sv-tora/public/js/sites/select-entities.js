/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */

(function(window, document, undefined) {

    let dependencies = ["TableModule", "SendRequestModule", "ModalModule", "TranslationModule"];
    App.GeneralModule.checkDependencies(dependencies);

    let selectTable = document.querySelector("table.table");
    let tableBody = selectTable.querySelector("tbody");
    let confirmButton = document.querySelector(".primary-button.confirm");
    let cancelButton = document.querySelector(".primary-button.cancel");
    App.PrimaryButtonModule.disablePrimaryButton(confirmButton);

    let tableObject = App.TableModule.getTableObject(selectTable);

    confirmButton.addEventListener("click", function (e) {
        e.preventDefault();
        let requestUrl = confirmButton.getAttribute("href");
        let data = {fighters: []};
        tableObject.selectedRows.forEach((row) => {
            let object = App.TranslationModule.translateToJson(Object.getOwnPropertyNames(row.values), row.values);
            data["fighters"].push(object);
        });
        App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.POST, requestUrl, undefined, data, true);
    });

    cancelButton.addEventListener("click", function (e) {
        e.preventDefault();
        let ModalWindow = App.ModalModule.confirmModal("Abbrechen", "Willst du wirklich die Auswahl abbrechen und die Seite verlassen?", function () {
            window.location.href = cancelButton.getAttribute("href");
        }, undefined, undefined);
    });

    tableBody.addEventListener("change", function () {
        let selectedRows = tableObject.selectedRows;
        if (selectedRows.length > 0) {
            if (selectedRows.length > App.GeneralModule.generalVariables.MAX_TEAM_MEMBERS) {
                App.PrimaryButtonModule.disablePrimaryButton(confirmButton);
            } else {
                App.PrimaryButtonModule.enablePrimaryButton(confirmButton);
            }
        } else {
            App.PrimaryButtonModule.disablePrimaryButton(confirmButton);
        }
    });


})(window, document);
