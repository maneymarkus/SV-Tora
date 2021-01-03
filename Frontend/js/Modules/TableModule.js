/*
  Dependencies: GeneralModule, ModalModule, MaterialInputsModule, TranslationModule, FormModule
 */

if (typeof GeneralModule === "undefined") {
  console.warn("Missing GeneralModule Dependency!");
}

if (typeof ModalModule === "undefined") {
  console.warn("Missing ModalModule Dependency!");
}

if (typeof MaterialInputsModule === "undefined") {
  console.warn("Missing MaterialInputsModule Dependency!");
}

if (typeof TranslationModule === "undefined") {
  console.warn("Missing TranslationModule Dependency!");
}

if (typeof FormModule === "undefined") {
  console.warn("Missing FormModule Dependency!");
}

// Module contains code concerning tables
let TableModule = (function(window, document, undefined) {

  // Filter Object to filter a corresponding table
  let Filter = function (key, value, table, filterContainer) {
    let This = this;

    // determines to filter for which column in table
    this.key = key;

    // filter for this specific value in specific column;
    this.value = value;
    this.filterTable = table;
    this.filterElement = undefined;
    this.filterContainer = filterContainer;

    this.createFilterElement = function () {
      let filter = GeneralModule.generateElementApi("SPAN", ["filter"]);
      let filterDetails = GeneralModule.generateElementApi("SPAN", ["filter-details"]);
      let filterColumn = GeneralModule.generateElementApi("SPAN", ["filter-column"], This.key);
      filterDetails.appendChild(filterColumn);
      filterDetails.appendChild(document.createTextNode(": "));
      let filterValue = GeneralModule.generateElementApi("SPAN", ["filter-value"], This.value);
      filterDetails.appendChild(filterValue);
      filter.appendChild(filterDetails);
      let deleteBtn = GeneralModule.generateElementApi("A", ["delete"]);
      let deleteIcon = GeneralModule.generateElementApi("I", ["material-icons"], "close");
      deleteBtn.appendChild(deleteIcon);
      filter.appendChild(deleteBtn);
      this.filterContainer.querySelector("div.chosen-filters").appendChild(filter);
      this.filterElement = filter;
    }
    this.createFilterElement();

    this.filterElement.addEventListener("click", function (e) {
      let target = e.target;
      while (target && !target.classList.contains("filter") && !target.classList.contains("delete")) {
        target = target.parentNode;
      }

      // Change the clicked filter
      if (target.classList.contains("filter")) {
        let filterKey = This.filterElement.querySelector(".filter-column").innerText;
        let possibleFilterValues = This.filterTable.allFilters[filterKey];
        let placeHolder = This.filterElement.querySelector(".filter-value").innerText;
        let select = MaterialInputsModule.createInputApi(GeneralModule.generalVariables.inputTypes.SELECT, ["filter-value"], undefined, "filter-value", placeHolder, undefined, possibleFilterValues, undefined);

        ModalModule.confirmModalApi("Filter " + filterKey + " updaten", select, function () {
          let newValue = MaterialInputsModule.getInputApi(select)
          This.updateFilter(newValue);
        });

        return;
      }

      // Delete the clicked filter
      if (target.classList.contains("delete")) {
        This.filterTable.removeFilter(This, This.filterElement);
      }
    });

    /**
     * This function updates the chosen new filter value
     * @param newValue String: the new value to filter for
     */
    this.updateFilter = function (newValue) {
      This.value = newValue;
      This.filterElement.querySelector(".filter-value").innerHTML = newValue;
      This.filterTable.updateAppliedFilters();
    }

  }

  let tables = [];

  // Table Object
  let Table = function(table) {

    let rowCounter = 0;

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

      this.values = {};

      // Read td elements of row (tr element) into property of this object and simultaneously create filter object
      this.initializeValues = function() {
        This.tds.forEach((td) => {
          let value = td.innerHTML.trim();
          let key = td.getAttribute("data-column");
          if (key.toLowerCase() !== "aktionen" && key.toLowerCase() !== "nr.") {
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

      // Update table value after it has been changed in object and DOM
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

      this.hide = function () {
        if (This.visible) {
          This.visible = false;
          This.tr.classList.add("hidden");
        }
      }

      this.show = function () {
        if (!This.visible) {
          This.visible = true;
          This.tr.classList.remove("hidden");
        }
      }

      Row.createRow = function (values, dataColumns, count) {
        if (Object.getOwnPropertyNames(values).length !== (dataColumns.length - 1)) {
          return undefined;
        }
        let row = GeneralModule.generateElementApi("tr", []);

        //first td
        let nrTd = GeneralModule.generateElementApi("td", [], count);
        nrTd.setAttribute("data-column", "Nr.");
        row.appendChild(nrTd);

        //all values
        let counter = 1;
        for (let i in values) {
          if (values.hasOwnProperty(i)) {
            let key = dataColumns[counter++];
            if (values.hasOwnProperty(key)) {
              let td = GeneralModule.generateElementApi("td", [], values[key]);
              td.setAttribute("data-column", key);
              row.appendChild(td);
            }
          }
        }

        //last td
        let actionTd = GeneralModule.generateElementApi("td", []);
        let editBtn = GeneralModule.generateElementApi("a", ["primary-button", "edit"]);
        editBtn.appendChild(GeneralModule.generateElementApi("i", ["material-icons"], "create"));
        editBtn.appendChild(GeneralModule.generateElementApi("p", [], "Bearbeiten"));
        actionTd.appendChild(editBtn);
        let deleteBtn = GeneralModule.generateElementApi("a", ["primary-button", "delete"]);
        deleteBtn.appendChild(GeneralModule.generateElementApi("i", ["material-icons"], "delete"));
        deleteBtn.appendChild(GeneralModule.generateElementApi("p", [], "Löschen"));
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
      if (th.querySelector("span.column-header")) {
        let dataColumn = th.querySelector("span.column-header").innerText;
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

    // Responsible filter element for this table
    this.filterContainerElement = undefined;
    if (this.tableElement.getAttribute("data-filter")) {
      let filterContainerElementSelector = this.tableElement.getAttribute("data-filter");
      this.filterContainerElement = document.querySelector("#" + filterContainerElementSelector);
    }

    // All the currently applied filters collected in an array
    this.activeFilterObjects = [];

    //Responsible add button for this table
    this.addElementBtn = undefined;
    if (this.tableElement.getAttribute("data-add")) {
      let addElementBtnSelector = this.tableElement.getAttribute("data-add");
      this.addElementBtn = document.querySelector("#" + addElementBtnSelector);
    }

    // Iterate over all available rows in table body and read them into objects
    this.trs.forEach((tr) => {
      this.rows.push(new Row(tr, This));
    });

    this.possibleFilters = this.allFilters;

    // Eventhandler for clicks in table element
    this.tableElement.addEventListener("click", function (e) {
      e.preventDefault();
      let target = e.target;
      while (target.nodeName !== "BODY" && !target.classList.contains("sort")  && !target.classList.contains("edit") && !target.classList.contains("delete")) {
        target = target.parentNode;
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

      // Edit a table row
      if (target.classList.contains("edit")) {
        while (target.nodeName !== "TR") {
          target = target.parentNode;
        }
        let row = This.getRowObject(target);
        This.editRow(row);
        return;
      }

      // Delete a table row
      if (target.classList.contains("delete")) {
        while (target.nodeName !== "TR") {
          target = target.parentNode;
        }
        let row = This.getRowObject(target);
        ModalModule.deleteModalApi("Eintrag löschen", "Willst du diesen Eintrag wirklich löschen?", function () {
          This.deleteRow(target, row);
        });
        return;
      }
    });

    // This block handles adding new filters
    if (this.filterContainerElement) {
      this.filterContainerElement.querySelector(".add-filter").addEventListener("click", function () {
        let keys = Object.keys(This.possibleFilters);
        let keySelect = MaterialInputsModule.createInputApi(GeneralModule.generalVariables.inputTypes.SELECT, ["filter-column", "required"], undefined, "filter-column", "Spalte", undefined, keys, undefined);
        let valueSelect = MaterialInputsModule.createInputApi(GeneralModule.generalVariables.inputTypes.SELECT, ["filter-value", "disabled", "required"], undefined, "filter-value", "Wert", undefined, undefined, undefined);
        let container = GeneralModule.generateElementApi("div");
        container.appendChild(keySelect);
        container.appendChild(valueSelect);
        keySelect.addEventListener("changeSelect", function () {
          let filterKey = MaterialInputsModule.getInputApi(keySelect);
          This.chooseFilterValue(filterKey, valueSelect);
        });
        ModalModule.confirmModalApi("Neuen Filter wählen", container, function () {
          This.handleChosenFilter(keySelect, valueSelect);
        });
      });
    }

    // Listen for click on add element to table button
    if (this.addElementBtn) {
      this.addElementBtn.addEventListener("click", function () {
        let keys = This.dataColumns;
        let object = TranslationModule.translateRowToObjectApi(keys);
        if (object.hasOwnProperty("Nr.")) {
          delete object["Nr."];
        }
        let container = TranslationModule.translateObjectToInputsApi(object, true);
        ModalModule.confirmModalApi("Neuen Kämpfer anlegen", container, function () {
          let userInputObject = TranslationModule.translateInputsToObjectApi(container);
          This.addElement(userInputObject);
        });

      });
    }

    this.addElement = function (userInputObject) {
      let newTr = Row.createRow(userInputObject, This.dataColumns, This.rows.length + 1);
      This.tableBody.appendChild(newTr);
      this.trs = This.tableBody.querySelectorAll("tr");
      This.rows.push(new Row(newTr, This));
      This.updateVisibleRows();
    }

    /**
     * This function enables the second select input element when choosing a new filter (choose the filter value for the filter key)
     */
    this.chooseFilterValue = function (filterKey, valueSelect) {
      valueSelect.classList.remove("disabled");
      let possibleFilterValues = This.possibleFilters[filterKey];
      let valueSelectObject = MaterialInputsModule.getSelectObjectApi(valueSelect);
      valueSelectObject.updateOptions(possibleFilterValues);
    }

    // Callback function if confirm modal is confirmed with proper input
    this.handleChosenFilter = function (keySelect, valueSelect) {
      let filterKey = MaterialInputsModule.getInputApi(keySelect);
      let filterValue = MaterialInputsModule.getInputApi(valueSelect);
      This.activeFilterObjects.push(new Filter(filterKey, filterValue, This, This.filterContainerElement));
      This.updateAppliedFilters();
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
    this.deleteRow = function (tr, rowObject) {
      This.rows.splice(This.rows.indexOf(rowObject), 1);
      tr.remove();
      This.recolorRows();
      This.renumberRows();
    }

    // Renumber rows after e.g. deletion
    this.renumberRows = function () {
      let counter = 1;
      This.rows.forEach((row) => {
        row.updateValue("Nr.", counter++);
      });
    }

    this.editRow = function (row) {
      let object = TranslationModule.translateRowToObjectApi(Object.getOwnPropertyNames(row.values), row.values);
      let container = TranslationModule.translateObjectToInputsApi(object);
      ModalModule.confirmModalApi("Tabelleneintrag bearbeiten", container, function () {
        This.updateRow(row, container);
      });
    }

    this.updateRow = function (row, container) {
      let userInputObject = TranslationModule.translateInputsToObjectApi(container);
      for (let key in userInputObject) {
        if (userInputObject.hasOwnProperty(key)) {
          row.updateValue(key, userInputObject[key]);
        }
      }
    }

    // Sort the table
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

    // update applied filters on table
    this.updateAppliedFilters = function() {
      This.appliedFilters = {};
      This.activeFilterObjects.forEach((filter) => {
        if (filter.key in This.appliedFilters) {
          if (!This.appliedFilters[filter.key].includes(filter.value)) {
            This.appliedFilters[filter.key].push(filter.value);
          }
        } else {
          This.appliedFilters[filter.key] = [filter.value];
        }
      });
      This.updateVisibleRows();
    }

    // update the visible Rows in the table after changing filters
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

    this.removeFilter = function (filter, filterElement) {
      filterElement.remove();
      if (This.activeFilterObjects.includes(filter)) {
        This.activeFilterObjects.splice(This.activeFilterObjects.indexOf(filter), 1);
      }
      filter = undefined;
      This.updateAppliedFilters();
    }

    this.recolorRows = function () {
      let rows = This.tableBody.querySelectorAll("tr");
      rowCounter = 0;
      rows.forEach((row) => {
        if (!row.classList.contains("hidden")) {
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

  // if there are tables then intialize them
  if (document.getElementsByTagName("table")[0] !== undefined) {
    initializeTables();
  }

  // read all tables on page into objects
  function initializeTables() {
    let tableElements = document.querySelectorAll("table");
    tableElements.forEach((t) => {
      tables.push(new Table(t));
    });
  }

})(window, document);
