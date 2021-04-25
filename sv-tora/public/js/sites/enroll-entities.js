/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function(window, document, undefined) {

    let dependencies = ["TableModule"];
    App.GeneralModule.checkDependencies(dependencies);

    let enrollTable = document.querySelector("table.table");
    let tableBody = enrollTable.querySelector("tbody");
    let enrollButton = document.querySelector(".primary-button.enroll");
    App.PrimaryButtonModule.disablePrimaryButton(enrollButton);

    let tableObject = App.TableModule.getTableObject(enrollTable);

    enrollButton.addEventListener("click", function (e) {
        e.preventDefault();
        // TODO: identify selected entities in Backend, call link and hand over selected entities
        console.log(tableObject.selectedRows);
        window.location.href = enrollButton.getAttribute("href");
    });

    tableBody.addEventListener("change", function () {
        let selectedRows = tableObject.selectedRows;
        if (selectedRows.length > 0) {
            App.PrimaryButtonModule.enablePrimaryButton(enrollButton);
        } else {
            App.PrimaryButtonModule.disablePrimaryButton(enrollButton);
        }
    });


})(window, document);
