/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function(window, document, undefined) {

    let dependencies = ["TableModule"];
    GeneralModule.checkDependenciesApi(dependencies);

    let enrollTable = document.querySelector("table.table");
    let tableBody = enrollTable.querySelector("tbody");
    let enrollButton = document.querySelector(".primary-button.enroll");
    PrimaryButtonModule.disablePrimaryButtonApi(enrollButton);

    let tableObject = TableModule.getTableObjectApi(enrollTable);

    enrollButton.addEventListener("click", function (e) {
        e.preventDefault();
        // TODO: identify selected entities in Backend, call link and hand over selected entities
        console.log(tableObject.selectedRows);
        window.location.href = enrollButton.getAttribute("href");
    });

    tableBody.addEventListener("change", function () {
        let selectedRows = tableObject.selectedRows;
        if (selectedRows.length > 0) {
            PrimaryButtonModule.enablePrimaryButtonApi(enrollButton);
        } else {
            PrimaryButtonModule.disablePrimaryButtonApi(enrollButton);
        }
    });


})(window, document);
