function init(window, document, undefined) {

  let tiltOptions = {maxTilt: 15, scale: 1.15};
  const primaryButtonTilt = $(".primary-button").tilt(tiltOptions);

  $('.primary-button').click(function (e){
    e.preventDefault();
  });

  let TablesModule = (function(window, document, undefined) {

    let lastFilters = [];

    function getPossibleFilter(table) {
      let allFilters = {};
      let ths = table.getElementsByClassName("column-header");
      let headers = [];
      for (let i = 0; i < ths.length; i++) {
        let value = ths[i].innerHTML;
        headers.push(value);
        allFilters[value] = [];
      }
      let rows = table.getElementsByTagName("TR");
      for (let i = 1; i < rows.length; i++) {
        let tds = rows[i].getElementsByTagName("TD");
        for (let j = 0; j < (tds.length - 1); j++) {
          let value = tds[j].innerHTML;
          if (!allFilters[headers[j]].includes(value)) {
            allFilters[headers[j]].push(value);
          }
        }
      }
      return allFilters;
    }

    function applyFilter(table, column, value) {
      let ths = table.getElementsByClassName("column-header");
      let index = 0;
      for (let i = 0; i < ths.length; i++) {
        if (ths[i].innerHTML === column) {
          index = i;
        }
      }
      let rows = table.getElementsByTagName("TR");
      for (let i = 1; i < rows.length; i++) {
        let row = rows[i];
        let tdValue = row.getElementsByTagName("TD")[index].innerHTML;
        if (tdValue === value) {
          row.classList.remove("hide");
        }
      }
    }

    let Table = function(table) {

      let Row = function (tr) {
        let This = this;
        this.tr = tr;
        this.tds = this.tr.querySelectorAll("td");

        this.values = {}

        this.initializeValues = function() {
          This.tds.forEach((td) => {
            let value = td.innerHTML.trim();
            let key = td.getAttribute("data-column");
            if (key !== "Aktionen") {
              this.values[key] = value;
            }
          });
        }
        this.initializeValues();

        this.updateValue = function (key, value) {
          this.values[key] = value;
          This.tds.forEach((td) => {
            if (td.getAttribute("data-column") === key) {
              td.innerHTML = value;
            }
          });
        }
      }

      let This = this;
      this.tableElement = table;
      this.tableHeader = table.querySelector("thead");
      this.tableBody = table.querySelector("tbody");
      this.tableFooter = (table.querySelector("tfoot")) ? table.querySelector("tfoot") : undefined;
      this.trs = this.tableBody.querySelectorAll("tr");
      this.rows = [];
      this.trs.forEach((tr) => {
        this.rows.push(new Row(tr));
      });

      this.tableElement.addEventListener("click", function (e) {
        e.preventDefault();
        let target = e.target;
        while (target.nodeName !== "BODY" && !target.classList.contains("sort")  && !target.classList.contains("edit") && !target.classList.contains("delete")) {
          target = target.parentNode;
        }
        if (target.nodeName === "BODY") {
          return;
        }
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
          //console.log(columnIndex);
          //TODO: Optimize Performance
          This.sortTable(columnIndex, ascending);
          return;
        }
        if (target.classList.contains("edit")) {
          while (target.nodeName !== "TR") {
            target = target.parentNode;
          }
          let row = This.getRowObject(target);
          console.log(target);
          return;
        }
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

      this.getRowObject = function (tr) {
        let r = undefined;
        This.rows.forEach((row) => {
          if (row.tr === tr) {
            r = row;
          }
        });
        return r;
      }

      this.deleteRow = function (tr, rowObject) {
        This.rows.splice(This.rows.indexOf(rowObject), 1);
        tr.remove();
      }

      this.renumberRows = function () {
        let counter = 1;
        This.rows.forEach((row) => {
          row.updateValue("Nr.", counter++);
        });
      }

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

    }

    if (document.getElementsByTagName("table")[0] !== undefined) {
      initializeTables();
    }

    function initializeTables() {
      let tables = document.querySelectorAll("table");
      tables.forEach((t) => {
        new Table(t);
      });
    }

  })(window, document);

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
