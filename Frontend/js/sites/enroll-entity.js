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

    let inheritance = TableModule.getTableObjectApi(enrollTable);

    let selectedRows = [];

    enrollButton.addEventListener("click", function (e) {
        e.preventDefault();
        // TODO: identify selected entities in Backend, call link and hand over selected entities
        console.log(selectedRows);
        window.location.href = enrollButton.getAttribute("href");
    });

    tableBody.addEventListener("click", function (e) {
        let target = e.target;
        while (target.nodeName !== "BODY" && !target.classList.contains("checkbox-input-container")) {
            target = target.parentElement;
        }
        if (target.classList.contains("checkbox-input-container")) {
            e.preventDefault();
            let selectedRowElement = target;
            let checkboxInput = target.querySelector("input");
            while (selectedRowElement.nodeName !== "TR") {
                selectedRowElement = selectedRowElement.parentElement;
            }
            let selectedRowObject = inheritance.getRowObject(selectedRowElement);
            if (checkboxInput.checked) {
                checkboxInput.checked = false;
                selectedRowElement.classList.remove("selected");
                if (selectedRows.includes(selectedRowObject)) {
                    selectedRows.splice(selectedRows.indexOf(selectedRowObject), 1);
                }
            } else {
                checkboxInput.checked = true;
                selectedRowElement.classList.add("selected");
                if (!selectedRows.includes(selectedRowObject)) {
                    selectedRows.push(selectedRowObject);
                }
            }
            if (selectedRows.length > 0) {
                PrimaryButtonModule.enablePrimaryButtonApi(enrollButton);
            } else {
                PrimaryButtonModule.disablePrimaryButtonApi(enrollButton);
            }
        }
    });


})(window, document);
