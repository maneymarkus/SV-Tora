/**
 * DEPENDENCIES
 */

import { generateElement, generalVariables, isAdmin } from "./GeneralModule";
import { createPrimaryButton } from "./PrimaryButtonModule";
import * as ModalModule from "./ModalModule";
import { checkForm } from "./FormModule";
import * as TranslationModule from "./TranslationModule";
import { sendRequest, getData } from "./SendRequestModule";
import { createInput } from "./MaterialInputsModule";
import {SendRequestModule} from "../app";

/**
 * This Module contains code responsible for managing application specific tables
 */

let tables = [];

/**
 * This "class" represents a table object
 * @param table {HTMLElement} The respective html element this object represents
 * @constructor
 */
let Table = function(table) {

    let rowCounter = 0;

    /**
     * This inner "class" represents a table row as an object for accurate control
     * @param tr {HTMLElement} The respective row of the table
     * @param tableObject {object} The table object responsible for this row and row object
     * @constructor
     */
    let Row = function (tr, tableObject) {
        let This = this;
        this.tr = tr;
        this.table = tableObject;
        if (rowCounter % 2) {
            This.tr.classList.add("even");
        } else {
            This.tr.classList.add("odd");
        }
        rowCounter++;
        this.tds = this.tr.querySelectorAll("td");
        this.visible = true;

        /**
         * This object contains the values of the row in the pattern: "column-name": "row-value"
         * @type {{}}
         */
        this.values = {};

        /**
         * This function reads all the values (td elements) into the values property
         */
        this.initializeValues = function() {
            This.tds.forEach((td) => {
                let value = td.innerHTML.trim();
                let key = td.getAttribute("data-column");
                if (key && key.toLowerCase() !== "aktionen" && key.toLowerCase() !== "nr.") {
                    this.values[key] = value;
                    if (key in tableObject.allFilters) {
                        if (!tableObject.allFilters[key].includes(value)) {
                            tableObject.allFilters[key].push(value);
                        }
                    } else {
                        tableObject.allFilters[key] = [value];
                    }
                }
            });
        }
        this.initializeValues();

        /**
         * This function updates a value of this object and also the html equivalent
         * @param key {string} The key (column(-name)) that should be updated
         * @param value {string} The new value
         */
        this.updateValue = function (key, value) {
            if (this.values.hasOwnProperty(key)) {
                this.values[key] = value;
                This.tds.forEach((td) => {
                    if (td.getAttribute("data-column") === key) {
                        td.innerHTML = value;
                    }
                });
            }
        }

        /**
         * This function hides the respective tr element from displaying (when it does not fit the current filter e.g.)
         */
        this.hide = function () {
            if (This.visible) {
                This.visible = false;
                This.tr.classList.add("no-display");
            }
        }

        /**
         * This function shows an earlier hidden tr element (when it fits the current filter again)
         */
        this.show = function () {
            if (!This.visible) {
                This.visible = true;
                This.tr.classList.remove("no-display");
            }
        }

        /**
         * This function creates a new row element and returns it
         * @param values {object} The values of the td elements of the new row
         * @param dataColumns {string[]} The name of the data-column attribute in the correct order
         * @param count {Number} The number of the row (for continuous numbering)
         * @return {HTMLElement|undefined}
         */
        Row.createRow = function (values, dataColumns, count) {
            if (Object.getOwnPropertyNames(values).length !== (dataColumns.length  - 1)) {
                return undefined;
            }
            let row = generateElement("tr", []);

            //first td
            let nrTd = generateElement("td", [], count);
            nrTd.setAttribute("data-column", "Nr.");
            row.appendChild(nrTd);

            //all values
            let counter = 1;
            for (let i in values) {
                if (values.hasOwnProperty(i)) {
                    let key = dataColumns[counter++];
                    if (values.hasOwnProperty(key)) {
                        let td = generateElement("td", [], values[key]);
                        td.setAttribute("data-column", key);
                        row.appendChild(td);
                    }
                }
            }

            //last td
            let actionTd = GeneralModule.generateElementApi("td", []);
            let editBtn = createPrimaryButton(["edit"], undefined, "create", "Bearbeiten");
            actionTd.appendChild(editBtn);
            let deleteBtn = createPrimaryButton(["delete"], undefined, "delete", "Löschen");
            actionTd.appendChild(deleteBtn);
            actionTd.setAttribute("data-column", "Aktionen");
            row.appendChild(actionTd);

            return row;
        };

    }

    let This = this;
    this.tableElement = table;
    this.tableHeader = table.querySelector("thead");
    this.tableBody = table.querySelector("tbody");
    this.tableFooter = (table.querySelector("tfoot")) ? table.querySelector("tfoot") : undefined;

    // collect the headings of every column
    this.dataColumns = [];
    let ths = this.tableHeader.querySelectorAll("th");
    ths.forEach((th) => {
        if (th.querySelector("span.column-heading")) {
            let dataColumn = th.querySelector("span.column-heading").innerText;
            this.dataColumns.push(dataColumn);
        }
    });

    // collection of tr elements of table body
    this.trs = this.tableBody.querySelectorAll("tr");

    // array for the row objects
    this.rows = [];

    // Creates filter object -> the columns of the table represent the filter (keys) and the whole of the values represent the possible filter values
    this.allFilters = {};

    // Creates filter object -> available filter (key) is property of this object and all available values for this key are collected in an array of this property
    this.possibleFilters = {};

    // Same like possible filters but only includes applied filters
    this.appliedFilters = {};

    this.possibleFilters = this.allFilters;

    // All the currently applied filters collected in an array
    this.activeFilterObjects = [];

    // Contains all the selected row objects
    this.selectedRows = [];

    // Contains the maximum amount of selectable entries
    this.selectLimit = parseInt(This.tableElement.getAttribute("data-select-limit"));

    // Iterate over all available rows in table body and read them into objects
    this.trs.forEach((tr) => {
        this.rows.push(new Row(tr, This));
    });

    /**
     * This function listens for clicks on the table element to initiate any actions (editing rows, deleting rows, etc.)
     */
    this.tableElement.addEventListener("click", function (e) {
        let target = e.target;
        while (target.nodeName !== "BODY" && !target.classList.contains("sort")  && !target.classList.contains("edit") && !target.classList.contains("delete") && !target.classList.contains("select-row")) {
            target = target.parentElement;
        }
        if (target.nodeName === "BODY") {
            return;
        }

        // Sort the table
        if (target.classList.contains("sort")) {
            let ths = This.tableHeader.querySelectorAll("th");
            let ascending = true;
            if (target.classList.contains("ascending")) {
                ascending = false;
                target.classList.remove("ascending");
                target.classList.add("descending");
            } else {
                target.classList.remove("descending");
                target.classList.add("ascending");
            }
            let t = target;
            while (t && t.nodeName !== "TH") {
                t = t.parentNode;
            }
            let columnIndex = 0;
            let counter = 0;
            ths.forEach((th) => {
                let sort = th.querySelector("a.sort");
                if (sort && sort !== target) {
                    sort.classList.remove("ascending", "descending");
                }
                if (t === th) {
                    columnIndex = counter;
                }
                counter++;
            });
            This.sortTable(columnIndex, ascending);
            This.recolorRows();
            return;
        }

        // Determine which row has been clicked on
        let clickedRow = target;
        while (clickedRow.nodeName !== "TR") {
            clickedRow = clickedRow.parentElement;
        }

        // Edit a table row
        if (target.classList.contains("edit")) {
            e.preventDefault();
            let rowObject = This.getRowObject(clickedRow);
            getData(target.getAttribute("href") + "/edit", (data) => {
                This.editRow(rowObject, data);
            });
            return;
        }

        // Delete a table row
        if (target.classList.contains("delete")) {
            e.preventDefault();
            let rowObject = This.getRowObject(clickedRow);
            This.deleteRow(clickedRow, rowObject);
            return;
        }

        // Select a table row
        if (target.classList.contains("select-row")) {
            // Somehow this is necessary as without this this handler will react to two click events
            e.preventDefault();
            let rowObject = This.getRowObject(clickedRow);
            This.handleSelection(rowObject);
            return;
        }

    });

    this.handleSelection = function (rowObject) {
        let checkBox = rowObject.tr.querySelector(".checkbox-input-container.select-row input");
        if (checkBox.checked) {
            checkBox.checked = false;
            rowObject.tr.classList.remove("selected");
            if (This.selectedRows.includes(rowObject)) {
                This.selectedRows.splice(This.selectedRows.indexOf(rowObject), 1);
            }
        } else {
            // check if it is allowed to add more items
            if (This.selectedRows.length === This.selectLimit) {
                ModalModule.infoModal("Maximale Anzahl", "Die maximale Anzahl an auswählbaren Einträgen beträgt " + This.selectLimit + ". Das kann sich zum Beispiel auf die maximale Anzahl an Teammitgliedern beziehen.");
                return;
            } else {
                checkBox.checked = true;
                rowObject.tr.classList.add("selected");
                if (!This.selectedRows.includes(rowObject)) {
                    This.selectedRows.push(rowObject);
                }
            }
        }
        checkBox.dispatchEvent(new Event("change", {bubbles: true, cancelable: true}));
    }

    /**
     * This function initializes the addition of a new entity/element to the table. This sets up a modal window that asks the user for the required input and calls the addEntity method afterwards
     */
    this.addingEntity = function (entity, url) {
        // clone the array not just store the reference!
        let keys = This.dataColumns.slice();

        let object = TranslationModule.translateRowToObject(keys, undefined);
        let container = TranslationModule.translateObjectToInputs(object, true);
        let ModalWindow = ModalModule.confirmModal(entity + " erstellen", container, undefined, undefined, function () {
            if (!checkForm(container, true)) {
                return false;
            } else {
                let data = TranslationModule.translateInputsToObject(container);
                sendRequest(generalVariables.requests.POST, url, () => {ModalWindow.closeModal(); This.addEntity()}, data, true);
            }
        });
    }

    /**
     * This function adds a new element as a row element to the table
     * @param userInputObject {object} The object containing the translated user input from the input elements regarding the creation of a new element
     */
    this.addEntity = function () {
        window.setTimeout(function () {
            window.location.reload(true);
        }, 5000);
    }.bind(this);

    /**
     * This function returns the responsible row object for a given tr element
     * @param tr {HTMLElement} The respective tr element
     * @return {*}
     */
    this.getRowObject = function (tr) {
        let r = undefined;
        This.rows.forEach((row) => {
            if (row.tr === tr) {
                r = row;
            }
        });
        return r;
    }

    /**
     * This function deletes a row from the table
     * @param tr {HTMLElement} The respective tr element
     * @param rowObject {object} The responsible row object
     */
    this.deleteRow = function (tr, rowObject) {
        let url = tr.querySelector("a.primary-button.delete").getAttribute("href");
        let object = TranslationModule.translateToJson(Object.getOwnPropertyNames(rowObject.values), rowObject.values);

        let ModalWindow = ModalModule.deleteModal("Eintrag löschen?", "Willst du den Eintrag Nr. <span class='highlighted-span'>" + tr.querySelector("td").innerText + "</span> wirklich löschen?", function () {
            sendRequest(generalVariables.requests.DELETE, url, () => {
                This.rows.splice(This.rows.indexOf(rowObject), 1);
                tr.remove();
                This.recolorRows();
                This.renumberRows();
            }, object, true);
        }, undefined, undefined);
    }

    /**
     * This function renumbers the rows of this table (after deleting a table row)
     */
    this.renumberRows = function () {
        let counter = 1;
        This.rows.forEach((row) => {
            row.updateValue("Nr.", counter++ + "");
        });
    }

    /**
     * This function initializes the editing of a given (/chosen) table row
     * @param row {object} The desired updated table row object
     * @param data {object} Contains the data from the backend concerning the entity to be edited
     */
    this.editRow = function (row, data) {
        let url = row.tr.querySelector("a.primary-button.edit").getAttribute("href");
        let container = TranslationModule.translateObjectToInputs(data, true);
        let ModalWindow = ModalModule.confirmModal("Eintrag bearbeiten", container, undefined, undefined, function () {
            if (!checkForm(container, true)) {
                return false;
            } else {
                let data = TranslationModule.translateInputsToObject(container);
                sendRequest(generalVariables.requests.PUT, url, () => {
                    ModalWindow.closeModal();
                    This.updateRow(row, container);
                }, data, true);
            }
        });
    }

    /**
     * This function updates a row with given user input
     * @param row {object} The row object that should be updated
     * @param container {HTMLElement} The container element that contains the new user chosen values
     */
    this.updateRow = function (row, container) {
        let userInputObject = TranslationModule.translateInputsToObject(container);
        for (let key in userInputObject) {
            if (userInputObject.hasOwnProperty(key)) {
                row.updateValue(key, userInputObject[key]);
            }
        }
    }

    /**
     * This function sorts the table according to a given column
     * @param column {Number} The index of the column to sorted accordingly to
     * @param ascending {boolean} Indicates if the table should be sorted in ascending (if true) or descending order
     */
    this.sortTable = function (column, ascending) {
        let rows, switching, i, x, y, shouldSwitch;
        switching = true;
        while (switching) {
            switching = false;
            rows = This.tableBody.querySelectorAll("tr");
            for (i = 0; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[column].innerHTML;
                y = rows[i + 1].getElementsByTagName("TD")[column].innerHTML;
                if (!isNaN(Number(x))) {
                    x = Number(x);
                    y = Number(y);
                } else {
                    x = x.toLowerCase();
                    y = y.toLowerCase();
                }
                if (ascending) {
                    if (x > y) { //ascending
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (x < y) { //descending
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }

    /**
     * This function updates the visible rows of this table (after adding a new filter e.g.)
     */
    this.updateVisibleRows = function () {
        This.rows.forEach((row) => {
            row.show();
            for (let key in This.appliedFilters) {
                if (This.appliedFilters.hasOwnProperty(key)) {
                    if (row.values.hasOwnProperty(key) && !This.appliedFilters[key].includes(row.values[key])) {
                        row.hide();
                    }
                }
            }
        });
        this.recolorRows();
        this.updatePossibleFilters();
    }

    /**
     * This function updates the possible filters that a user can choose from then on
     */
    this.updatePossibleFilters = function () {
        This.possibleFilters = {};
        This.rows.forEach((row) => {
            // Iterate only over the visible rows
            if (row.visible) {
                // Then iterate over every key (column / td) of row
                for (let key in row.values) {
                    if (row.values.hasOwnProperty(key)) {
                        if (key in This.possibleFilters) {
                            if (!This.possibleFilters[key].includes(row.values[key])) {
                                This.possibleFilters[key].push(row.values[key]);
                            }
                        } else {
                            This.possibleFilters[key] = [row.values[key]];
                        }
                    }
                }
            }
        });
    }

    /**
     * This function manages the coloring of the rows
     */
    this.recolorRows = function () {
        let rows = This.tableBody.querySelectorAll("tr");
        rowCounter = 0;
        rows.forEach((row) => {
            if (!row.classList.contains("no-display")) {
                row.classList.remove("even", "odd");
                if (rowCounter % 2) {
                    row.classList.add("even");
                } else {
                    row.classList.add("odd");
                }
                rowCounter++;
            }
        });
    }

}

/**
 * This block initializes static html table elements
 */
let tableElements = document.querySelectorAll("table.table");
tableElements.forEach((t) => {
    tables.push(new Table(t));
});

/**
 * This function returns the responsible table object for a given html table element
 * @param tableElement {HTMLElement} The table element for which the object is wanted
 * @return {*}
 */
function getTableObject(tableElement) {
    if (tableElement.classList.contains("table")) {
        let tableObject = undefined;
        tables.forEach((table) => {
            if (table.tableElement === tableElement) {
                tableObject = table;
            }
        });
        return tableObject;
    }
}



/**
 * API:
 */
export {
    getTableObject
}
