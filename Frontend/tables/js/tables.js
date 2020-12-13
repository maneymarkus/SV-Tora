function init(window, document, undefined) {

  let tiltOptions = {maxTilt: 15, scale: 1.15};
  const primaryButtonTilt = $(".primary-button").tilt(tiltOptions);

  $('.primary-button').click(function (e){
    e.preventDefault();
  });

  let Module = (function(window, document, undefined) {

    function generateElement(element, classNames = undefined, value = undefined) {
      let el = document.createElement(element.toUpperCase());
      if (classNames) {
        classNames.forEach(function (item) {
          el.classList.add(item);
        });
      }
      if (value) {
        el.innerHTML = value;
      }
      return el;
    }

    return {
      generateElementApi : function (element, classNames, value) {
        return generateElement(element, classNames, value);
      }
    }

  })(window, document);

  // Module contains code concerning tables
  let TablesModule = (function(window, document, undefined) {

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
        let filter = Module.generateElementApi("SPAN", ["filter"]);
        let filterDetails = Module.generateElementApi("SPAN", ["filter-details"]);
        let filterColumn = Module.generateElementApi("SPAN", ["filter-column"], This.key);
        filterDetails.appendChild(filterColumn);
        filterDetails.appendChild(document.createTextNode(": "));
        let filterValue = Module.generateElementApi("SPAN", ["filter-value"], This.value);
        filterDetails.appendChild(filterValue);
        filter.appendChild(filterDetails);
        let deleteBtn = Module.generateElementApi("A", ["delete"]);
        let deleteIcon = Module.generateElementApi("I", ["material-icons"], "close");
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

          //TODO: Create selects with possible values for this chosen filter and call ConfirmModalApi

          return;
        }

        // Delete the clicked filter
        if (target.classList.contains("delete")) {
          This.filterTable.removeFilter(This, This.filterElement);
        }
      });

      this.handleUpdatedFilter = function (modalContent) {
        let selectInputContainers = modalContent.querySelectorAll("div.select-input-container");
        selectInputContainers.forEach((selectInputContainer) => {
          // TODO: Let MaterialInputsModule return selectObject(s)
        });
        // TODO: update value of this filter
        this.filterTable.updateAppliedFilters();
      }

    }

    let tables = [];

    // Table Object
    let Table = function(table) {

      let rowCounter = 0;

      let Row = function (tr, tableObject) {
        let This = this;
        this.tr = tr;
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
            if (key !== "Aktionen") {
              this.values[key] = value;
              if (key in tableObject.possibleFilters) {
                if (!tableObject.possibleFilters[key].includes(value)) {
                  tableObject.possibleFilters[key].push(value);
                }
              } else {
                tableObject.possibleFilters[key] = [value];
              }
            }
          });
        }
        this.initializeValues();

        // Update table value after it has been changed in object and DOM
        this.updateValue = function (key, value) {
          this.values[key] = value;
          This.tds.forEach((td) => {
            if (td.getAttribute("data-column") === key) {
              td.innerHTML = value;
            }
          });
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

      }

      let This = this;
      this.tableElement = table;
      this.tableHeader = table.querySelector("thead");
      this.tableBody = table.querySelector("tbody");
      this.tableFooter = (table.querySelector("tfoot")) ? table.querySelector("tfoot") : undefined;

      // collection of tr elements of table body
      this.trs = this.tableBody.querySelectorAll("tr");

      // array for the row objects
      this.rows = [];

      // Creates filter object -> available filter (key) is property of this object and all available values for this key are collected in an array of this property
      this.possibleFilters = {};

      // Same like possible filters but only includes applied filters
      this.appliedFilters = {};

      // Responsible filter element for this table
      let filterContainerElementSelector = this.tableElement.getAttribute("data-filter");
      this.filterContainerElement = document.querySelector("#" + filterContainerElementSelector);

      // All the currently applied filters collected in an array
      this.activeFilterObjects = [];

      //Responsible add button for this table
      let addElementBtnSelector = this.tableElement.getAttribute("data-add");
      this.addElementBtn = document.querySelector("#" + addElementBtnSelector);

      // Iterate over all available rows in table body and read them into objects
      this.trs.forEach((tr) => {
        this.rows.push(new Row(tr, This));
      });

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
          //TODO: Create Input Elements according to row content
          while (target.nodeName !== "TR") {
            target = target.parentNode;
          }
          let row = This.getRowObject(target);
          console.log(target);
          return;
        }

        // Delete a table row
        if (target.classList.contains("delete")) {
          while (target.nodeName !== "TR") {
            target = target.parentNode;
          }
          let row = This.getRowObject(target);
          //TODO: Modal Window
          if (window.confirm("Delete " + row + "?")) {
            This.deleteRow(target, row);
            This.renumberRows();
          }
          return;
        }
      });

      // Listen for click on filter-add button
      this.filterContainerElement.querySelector(".add-filter").addEventListener("click", function () {
        // TODO: Create two selects (first one is key (column) and second one is value with possible filters -> Call Confirm Modal and give two selects and this.handleChosenFilter as positive callback
        This.activeFilterObjects.push(new Filter("Vorname", "Marcus", This, This.filterContainerElement));
        This.updateAppliedFilters();
      });

      // Listen for click on add element to table button
      this.addElementBtn.addEventListener("click", function () {
        // TODO: Generate Inputs based on table columns -> Call confirm modal api (Use data-column attribute on inputs?)
      });

      // Callback function if confirm modal is confirmed with proper input
      this.handleChosenFilter = function (modalContent) {
        let selectInputContainers = modalContent.querySelectorAll("div.select-input-container");
        selectInputContainers.forEach((selectInputContainer) => {
          // TODO: Let MaterialInputsModule return selectObject(s)
        });
        // TODO: create new Filter Object
        this.updateAppliedFilters();
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
      }

      // Renumber rows after e.g. deletion
      this.renumberRows = function () {
        let counter = 1;
        This.rows.forEach((row) => {
          row.updateValue("Nr.", counter++);
        });
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
            if (row.values.hasOwnProperty(key) && !This.appliedFilters[key].includes(row.values[key])) {
              row.hide();
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
              if (key in This.possibleFilters) {
                if (!This.possibleFilters[key].includes(row.values[key])) {
                  This.possibleFilters[key].push(row.values[key]);
                }
              } else {
                This.possibleFilters[key] = [row.values[key]];
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

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
