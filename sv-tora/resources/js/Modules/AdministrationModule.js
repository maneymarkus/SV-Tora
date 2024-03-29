/**
 * Dependencies
 */

import * as GeneralModule from "./GeneralModule";
import { createInput } from "./MaterialInputsModule";
import * as ModalModule from "./ModalModule";
import { checkInput } from "./FormModule";
import { sendRequest } from "./SendRequestModule";
import * as TranslationModule from "./TranslationModule";
import * as TooltipModule from "./TooltipModule";

/**
 * Module contains code concerning admin table
 */

let adminTable = undefined;

// Table Object
let AdminTable = function(table) {

    let This = this;
    this.tableElement = table;
    this.tableHeader = table.querySelector("thead");
    this.tableBody = table.querySelector("tbody");
    this.tableFooter = (table.querySelector("tfoot")) ? table.querySelector("tfoot") : undefined;
    this.ths = this.tableHeader.querySelectorAll("th");
    this.addAdminBtn = document.querySelector(".add-admin");

    let Row = function (tr, tableObject) {
        let This = this;
        this.tr = tr;
        this.containingTable = tableObject;
        this.tds = this.tr.querySelectorAll("td");
        this.editMode = false;
        this.editUrl = (this.tr.querySelector("a.primary-button.edit")) ? this.tr.querySelector("a.primary-button.edit").getAttribute("href") : undefined;

        this.rights = {};

        // Read td elements of row (tr element) into property of this object and simultaneously create filter object
        this.updateValues = function() {
            This.tds.forEach((td) => {
                if (td.getAttribute("data-privilege")) {
                    let hasRight = td.querySelector("i").innerText === "done";
                    let right = td.getAttribute("data-privilege");
                    if (right && right !== "") {
                        this.rights[right] = hasRight;
                    }
                }
            });
        }
        this.updateValues();

        this.startEditRow = function () {
            This.editMode = true;
            This.tr.classList.add("edit-mode");
            This.tr.addEventListener("click", editRow);

            // Change edit icon to save icon
            let editIcon = This.tr.querySelector("a.edit");
            editIcon.querySelector("i").innerHTML = "save";
            editIcon.querySelector("p").innerHTML = "Speichern";

            //change delete icon to cancel (the edit) icon
            let deleteIcon = This.tr.querySelector("a.delete");
            deleteIcon.querySelector("i").innerHTML = "close";
            deleteIcon.querySelector("p").innerHTML = "Abbrechen";

            switchTdContent(true, false);
        }

        /**
         * This functions switches the content of the particular td element to either inputs or just icons depending on the parameter
         * @param switchToInputs Boolean that determines the content to switch to
         * @param saved Boolean that determines if to use old values since editing might have been canceled
         */
        function switchTdContent (switchToInputs, saved) {
            This.tds.forEach((td) => {
                if (td.getAttribute("data-privilege")) {
                    if (switchToInputs) {
                        if (td.classList.contains("privileged")) {
                            td.innerHTML = "";
                            td.appendChild(createSwitch(true, td.getAttribute("data-privilege")))
                        } else {
                            td.innerHTML = "";
                            td.appendChild(createSwitch(false, td.getAttribute("data-privilege")));
                        }
                        td.classList.remove("privileged");
                    } else {

                        // editing has been saved so convert switches to icons
                        if (saved) {
                            if (td.querySelector("input").checked) {
                                td.classList.add("privileged");
                                td.innerHTML = "";
                                td.appendChild(createIcon(true));
                            } else {
                                td.innerHTML = "";
                                td.appendChild(createIcon(false));
                            }

                            // editing has been canceled -> so restore the old privileges
                        } else {
                            if (This.rights[td.getAttribute("data-privilege")]) {
                                td.classList.add("privileged");
                                td.innerHTML = "";
                                td.appendChild(createIcon(true));
                            } else {
                                td.innerHTML = "";
                                td.appendChild(createIcon(false));
                            }
                        }
                    }
                }
            });
        }

        function createSwitch(checked, privilegeName) {
            let switchInput = createInput(GeneralModule.generalVariables.inputTypes.SWITCH, [], undefined, privilegeName, undefined, privilegeName, checked, undefined);
            return switchInput.inputContainer;
        }

        function createIcon(hasRight) {
            let icon;
            if (hasRight) {
                icon = GeneralModule.generateElement("i", ["material-icons"], "done");
            } else {
                icon = GeneralModule.generateElement("i", ["material-icons"], "close");
            }
            return icon;
        }

        function endEditRow(saved) {
            switchTdContent(false, saved);
            This.editMode = false;
            This.tr.removeEventListener("click", editRow);
            This.tr.classList.remove("edit-mode");
            This.containingTable.editMode = false;

            // change save icon back to edit icon
            let saveIcon = This.tr.querySelector("a.edit");
            saveIcon.querySelector("i").innerHTML = "create";
            saveIcon.querySelector("p").innerHTML = "Bearbeiten";

            // change cancel icon back to delete icon
            let cancelIcon = This.tr.querySelector("a.delete");
            cancelIcon.querySelector("i").innerHTML = "delete";
            cancelIcon.querySelector("p").innerHTML = "Löschen";

            This.updateValues();
        }

        function editRow(e) {
            e.stopImmediatePropagation();
            let target = e.target;
            while (target.nodeName !== "BODY" && !target.classList.contains("edit") && !target.classList.contains("delete")) {
                target = target.parentElement;
            }
            if (target.nodeName === "BODY") {
                return;
            }
            if (target.classList.contains("edit")) {
                e.preventDefault();
                let data = TranslationModule.translateInputsToObject(This.tr);
                sendRequest(GeneralModule.generalVariables.requests.PUT, This.editUrl, () => {
                    endEditRow(true);
                }, data, true);
                return;
            }
            if (target.classList.contains("delete")) {
                e.preventDefault();
                endEditRow(false);
                return;
            }
        }

    }
    // collection of tr elements of table body
    this.trs = this.tableBody.querySelectorAll("tr");

    // array for the row objects
    this.rows = [];

    // keeps track of the current (active) mode: editMode enables the current user to change privileges of the selected row
    this.editMode = false;

    //Responsible add button for this table
    this.addElementBtn = undefined;
    if (this.tableElement.getAttribute("data-add")) {
        let addElementBtnSelector = this.tableElement.getAttribute("data-add");
        this.ElementBtn = document.querySelector("#" + addElementBtnSelector);
    }

    // Iterate over all available rows in table body and read them into objects
    this.trs.forEach((tr) => {
        this.rows.push(new Row(tr, This));
    });

    // Eventhandler for clicks in table element
    this.tableElement.addEventListener("click", function (e) {
        if (This.editMode) {
            return;
        }
        e.preventDefault();
        let target = e.target;
        while (target.nodeName !== "BODY" && !target.classList.contains("edit") && !target.classList.contains("delete")) {
            target = target.parentNode;
        }
        if (target.nodeName === "BODY") {
            return;
        }

        // Edit a table row
        if (target.classList.contains("edit")) {
            This.editMode = true;
            while (target.nodeName !== "TR") {
                target = target.parentNode;
            }

            let row = This.getRowObject(target);
            row.startEditRow(e);

            return;
        }

        // Delete a table row
        if (target.classList.contains("delete")) {
            let url = target.getAttribute("href");
            while (target.nodeName !== "TR") {
                target = target.parentNode;
            }
            let row = This.getRowObject(target);
            This.deleteRow(target, row, url);
            return;
        }
    });

    /**
     * This function initializes the addition of a new entity/element to the table which is a new admin. New admins can be registered by inviting them via an e-mail address. Then they can register themselves on a custom landing page for them.
     */
    if (this.addAdminBtn) {
        this.addAdminBtn.addEventListener("click", function () {
            let mailInput = createInput(GeneralModule.generalVariables.inputTypes.TEXT, ["mail", "required"], undefined, "new-admin-mail", "E-Mail-Adresse", undefined, undefined, undefined);
            let ModalWindow = ModalModule.confirmModal("Neuen Administrator hinzufügen (einladen)", mailInput.inputContainer, undefined, undefined, function () {
                if (!checkInput(mailInput.inputContainer, true)) {
                    return false;
                } else {
                    let data = {email: mailInput.getValue()};
                    sendRequest(GeneralModule.generalVariables.requests.POST, "/admin/registration/invitation", () => {
                        ModalWindow.closeModal()
                    }, data, true);
                }
            });
        });
    }

    // Return row object corresponding to given tr element
    this.getRowObject = function (tr) {
        let r = undefined;
        This.rows.forEach((row) => {
            if (row.tr === tr) {
                r = row;
            }
        });
        return r;
    }

    // Delete a table row
    this.deleteRow = function (tr, rowObject, url) {
        let adminName = tr.querySelector("td:first-child").innerText;
        let ModalWindow = App.ModalModule.deleteModal("Admin löschen", "Willst du den Admin " + adminName + " wirklich löschen?", function () {
            App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.DELETE, url, () => {
                This.rows.splice(This.rows.indexOf(rowObject), 1);
                tr.remove();
            }, undefined, true);
        }, undefined, undefined);
    }

}

// if there is an admin table then initialize it
if (document.querySelector("table.admin-table")) {
    let adminTableElement = document.querySelector("table.admin-table");
    adminTable = new AdminTable(adminTableElement);

    // initialize the tooltips
    let permissionDiv = document.querySelector("div.permissions");
    let permissionSpans = permissionDiv.querySelectorAll("div.permission");
    let ths = adminTable.tableHeader.querySelectorAll("th");
    permissionSpans.forEach((permissionSpan) => {
        let permissionName = permissionSpan.querySelector("span.name").innerText;
        let permissionDescription = permissionSpan.querySelector("span.description").innerText;
        ths.forEach((th) => {
            if (th.innerText.includes(permissionName)) {
                let ttTrigger = th.querySelector("span.tt-trigger");
                let identifier = GeneralModule.createUniqueRandomIdentifier();
                ttTrigger.classList.add(identifier);
                TooltipModule.createTooltip("." + identifier, permissionDescription);
            }
        });
    });

}


function getAdminTableObject(adminTableElement) {
    if (adminTableElement.classList.contains("admin-table")) {
        if (adminTableElement === adminTable.tableElement) {
            return adminTable;
        }
    }
}


/**
 * API:
 */
export {
    getAdminTableObject
}
