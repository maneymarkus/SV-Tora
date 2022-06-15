/**
 * DEPENDENCIES
 */

import * as GeneralModule from "./GeneralModule";
import { getTableObject } from "./TableModule";
import { getAdminTableObject } from "./AdministrationModule";
import { infoModal } from "./ModalModule";
import { sendRequest } from "./SendRequestModule";

/**
 * This Module contains code responsible for managing actions related to tables as e.g. adding an element/entity to a table
 */

let tableActionsContainers = [];

/**
 * This "class" represents a table actions container object
 * @param tableActionsContainer {HTMLElement} The respective html element this object represents
 * @constructor
 */
let TableActionsContainer = function(tableActionsContainer) {

    let This = this;

    this.tableIdentificator = undefined;
    this.connectedTableElement = undefined;
    this.connectedTableObject = undefined;
    if (tableActionsContainer.getAttribute("data-table")) {
        this.tableIdentificator = tableActionsContainer.getAttribute("data-table");
        this.connectedTableElement = document.getElementById(this.tableIdentificator);
        this.connectedTableObject = getTableObject(this.connectedTableElement);
    } else if (tableActionsContainer.getAttribute("data-admin-table")) {
        this.tableIdentificator = tableActionsContainer.getAttribute("data-admin-table");
        this.connectedTableElement = document.getElementById(this.tableIdentificator);
        this.connectedTableObject = getAdminTableObject(this.connectedTableElement);
    }

    this.tableActionsContainerElement = tableActionsContainer;
    this.addEntityButton = tableActionsContainer.querySelector(".primary-button.add-entity");
    this.printButton = (tableActionsContainer.querySelector(".primary-button.print")) ? tableActionsContainer.querySelector(".primary-button.print") : undefined;

    /**
     * This functions listens for clicks on the add entity button and triggers the modal window that requires the necessary input from the user and then adds the newly configured element to the table
     */
    if (this.addEntityButton) {
        this.addEntityButton.addEventListener("click", function (e) {
            e.preventDefault();
            let url = This.addEntityButton.getAttribute("href");
            sendRequest(GeneralModule.generalVariables.requests.GET, url + "/create", (data) => {
                let entity = This.addEntityButton.querySelector("p").innerText.split(" ")[0];
                This.connectedTableObject.addingEntity(data, entity, url);
            }, undefined, true);
        });
    }

    if (this.printButton) {
        this.printButton.addEventListener("click", function () {
            infoModal("Drucken!", "Ich drucke die Tabelle jetzt aus! (Vielleicht...)", undefined);
        });
    }

}

/**
 * This block initializes static html table actions elements
 */
let tableActionsContainerElements = document.querySelectorAll("div.table-actions");
tableActionsContainerElements.forEach((tAC) => {
    tableActionsContainers.push(new TableActionsContainer(tAC));
});

/**
 * API:
 */
export {

}
