/**
 * DEPENDENCIES
 */

import * as GeneralModule from "./GeneralModule";
import { createInput } from "./MaterialInputsModule";
import * as ModalModule from "./ModalModule";
import { checkForm } from "./FormModule";
import { createTag } from "./TagModule";
import { getTableObject } from "./TableModule";

/**
 * This Module contains code responsible for managing the filtering of tables
 */

let tableFilterContainers = [];

/**
 * This "class" represents a filter object
 * @param key {string} The key of the filter (which column to filter for)
 * @param value {string} The value of the filter (which values to filter the column for)
 * @param table {object} The table the filter affects
 * @param filterContainerObject {object} The responsible filter container object
 * @constructor
 */
let Filter = function (key, value, table, filterContainerObject) {
    let This = this;

    // determines which column to search for values
    this.key = key;

    // filter for this specific value in the key column;
    this.value = value;
    this.filterTable = table;
    this.filterElement = undefined;
    this.filterContainerObject = filterContainerObject;
    this.filterContainerElement = filterContainerObject.tableFilterContainerElement;
    this.chosenFilterContainerElement =  this.filterContainerElement.querySelector("div.chosen-filters");

    /**
     * This function creates and appends a filter tag element
     */
    this.createFilterElement = function () {
        let filter = createTag(["filter"], This.key, This.value);
        this.chosenFilterContainerElement.appendChild(filter);
        this.filterElement = filter;
    }
    this.createFilterElement();

    /**
     * This function listens for click events on the filter element to either delete it or change its value
     */
    this.filterElement.addEventListener("click", function (e) {
        let target = e.target;
        while (target && !target.classList.contains("filter") && !target.classList.contains("delete")) {
            target = target.parentNode;
        }

        // Change the clicked filter
        if (target.classList.contains("filter")) {
            let filterKey = This.filterElement.querySelector(".tag-key").innerText;
            let possibleFilterValues = This.filterTable.allFilters[filterKey];
            let placeHolder = This.filterElement.querySelector(".tag-value").innerText;
            let select = createInput(GeneralModule.generalVariables.inputTypes.SELECT, ["filter-value"], undefined, "filter-value", placeHolder, undefined, undefined, possibleFilterValues);

            ModalModule.confirmModal("Filter " + filterKey + " updaten", select.inputContainer, function () {
                let newValue = select.getValue();
                This.updateFilter(newValue);
            }, undefined, undefined);

            return;
        }

        // Delete the clicked filter
        if (target.classList.contains("delete")) {
            This.filterContainerObject.removeFilter(This, This.filterElement);
        }
    });

    /**
     * This function updates the chosen new filter value
     * @param newValue String: the new value to filter for
     */
    this.updateFilter = function (newValue) {
        This.value = newValue;
        This.filterElement.querySelector(".tag-value").innerHTML = newValue;
        This.filterContainerObject.updateAppliedFilters();
    }

}

/**
 * This "class" represents a table filter container object
 * @param tableFilterContainer {HTMLElement} The respective html element this object represents
 * @constructor
 */
let TableFilterContainer = function(tableFilterContainer) {

    let This = this;
    this.tableIdentificator = tableFilterContainer.getAttribute("data-table");
    this.connectedTableElement = document.getElementById(this.tableIdentificator);
    this.connectedTableObject = getTableObject(this.connectedTableElement);

    this.tableFilterContainerElement = tableFilterContainer;
    this.addFilterButton = tableFilterContainer.querySelector(".secondary-button.add-filter");

    // Creates filter object -> the columns of the table represent the filter (keys) and the whole of the values represent the possible filter values
    this.allFilters = this.connectedTableObject.allFilters;

    // Creates filter object -> available filter (key) is property of this object and all available values for this key are collected in an array of this property
    this.possibleFilters = this.connectedTableObject.possibleFilters;

    // Same like possible filters but only includes applied filters
    this.appliedFilters = this.connectedTableObject.appliedFilters;

    // All the currently applied filters collected in an array
    this.activeFilterObjects = this.connectedTableObject.activeFilterObjects;

    /**
     * This functions listens for clicks on the add filter button and triggers the modal window that requires the user to choose a desired filter
     */
    this.addFilterButton.addEventListener("click", function () {
        let keys = Object.keys(This.connectedTableObject.possibleFilters);
        let keySelect = createInput(GeneralModule.generalVariables.inputTypes.SELECT, ["filter-column", "required"], undefined, "filter-column", "Spalte", undefined, undefined, keys);
        let valueSelect = createInput(GeneralModule.generalVariables.inputTypes.SELECT, ["filter-value", "required"], undefined, "filter-value", "Wert", undefined, undefined, undefined);
        valueSelect.disable();
        let container = GeneralModule.generateElement("div");
        container.appendChild(keySelect.inputContainer);
        container.appendChild(valueSelect.inputContainer);
        keySelect.inputContainer.addEventListener("change", function () {
            This.updateFilterValueSelect(keySelect.getValue(), valueSelect);
        });
        ModalModule.confirmModal("Neuen Filter wählen", container, function () {
            This.handleChosenFilter(keySelect, valueSelect);
        }, undefined, function () {
            return checkForm(container, true);
        });
    });

    /**
     * This function enables the second select input element when choosing a new filter (choose the filter value for the filter key)
     */
    this.updateFilterValueSelect = function (filterKey, valueSelect) {
        valueSelect.enable();
        let possibleFilterValues = This.possibleFilters[filterKey];
        valueSelect.updateOptions(possibleFilterValues);
    }

    /**
     * This function adds a new filter to the table and filters it accordingly
     * @param keySelect
     * @param valueSelect
     */
    this.handleChosenFilter = function (keySelect, valueSelect) {
        let filterKey = keySelect.getValue();
        let filterValue = valueSelect.getValue();
        This.activeFilterObjects.push(new Filter(filterKey, filterValue, This.connectedTableObject, This));
        This.updateAppliedFilters();
    }

    /**
     * This function updates the currently applied filters (after adding a new filter e.g.)
     */
    this.updateAppliedFilters = function() {
        Object.keys(This.appliedFilters).forEach((property) => {
            delete This.appliedFilters[property];
        });
        This.activeFilterObjects.forEach((filter) => {
            if (filter.key in This.appliedFilters) {
                if (!This.appliedFilters[filter.key].includes(filter.value)) {
                    This.appliedFilters[filter.key].push(filter.value);
                }
            } else {
                This.appliedFilters[filter.key] = [filter.value];
            }
        });
        This.connectedTableObject.updateVisibleRows();
        this.possibleFilters = this.connectedTableObject.possibleFilters;
        this.appliedFilters = this.connectedTableObject.appliedFilters;
    }

    /**
     * This function removes a filter from the connected table
     * @param filter {object} The filter to be removed
     * @param filterElement {HTMLElement} The respective html filter element
     */
    this.removeFilter = function (filter, filterElement) {
        filterElement.remove();
        if (This.activeFilterObjects.includes(filter)) {
            This.activeFilterObjects.splice(This.activeFilterObjects.indexOf(filter), 1);
        }
        filter = undefined;
        This.updateAppliedFilters();
    }

}

/**
 * This block initializes static html table filter elements
 */
let tableFilterContainerElements = document.querySelectorAll("div.filter-container");
tableFilterContainerElements.forEach((tFC) => {
    tableFilterContainers.push(new TableFilterContainer(tFC));
});

/**
 * This block checks if there are filter set via cookies and applies them
 */
let filterCookie;
if (filterCookie = GeneralModule.getCookie("tableFilters")) {
    let filterJSON = JSON.parse(filterCookie);
    for (let key in filterJSON) {
        if (filterJSON.hasOwnProperty(key)) {
            let value = filterJSON[key];
            tableFilterContainers[0].activeFilterObjects.push(new Filter(key, value, tableFilterContainers[0].connectedTableObject, tableFilterContainers[0]));
            tableFilterContainers[0].updateAppliedFilters();
        }
    }
    GeneralModule.deleteCookie("tableFilters");
}

/**
 * API:
 */
export {

}
