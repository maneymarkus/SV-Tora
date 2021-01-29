// Module contains code concerning admin table
var AdministrationModule = (function(window, document, undefined) {

  let dependencies = ["MaterialInputsModule", "ModalModule", "FormModule"];
  GeneralModule.checkDependenciesApi(dependencies);

  let adminTable = undefined;

  // Table Object
  let AdminTable = function(table) {

    let This = this;
    this.tableElement = table;
    this.tableHeader = table.querySelector("thead");
    this.tableBody = table.querySelector("tbody");
    this.tableFooter = (table.querySelector("tfoot")) ? table.querySelector("tfoot") : undefined;
    this.ths = this.tableHeader.querySelectorAll("th");

    let Row = function (tr, tableObject) {
      let This = this;
      this.tr = tr;
      this.containingTable = tableObject;
      this.tds = this.tr.querySelectorAll("td");
      this.editMode = false;

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
                td.appendChild(createSwitch(true))
              } else {
                td.innerHTML = "";
                td.appendChild(createSwitch(false));
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

      function createSwitch(checked) {
        // TODO: Use InputsModule.Api
        // InputsModule.createInputFactory(inputTypes.SWITCH, [""], undefined, undefined, undefined, checked, undefined, undefined);
        let switchId = Math.random().toString(16).substr(2, 10);
        let switchContainer = GeneralModule.generateElementApi("label", ["switch-container", "input-container"]);
        switchContainer.setAttribute("for", switchId);
        let input = GeneralModule.generateElementApi("input", ["switch-input"]);
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", switchId);
        if (name) {
          input.setAttribute("name", name);
        }
        if (checked) {
          input.setAttribute("checked", "checked");
        }
        switchContainer.appendChild(input);
        switchContainer.appendChild(GeneralModule.generateElementApi("span", ["switch"]));
        return switchContainer;
      }

      function createIcon(hasRight) {
        let icon;
        if (hasRight) {
          icon = GeneralModule.generateElementApi("i", ["material-icons"], "done");
        } else {
          icon = GeneralModule.generateElementApi("i", ["material-icons"], "close");
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
          endEditRow(true);
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
      this.addElementBtn = document.querySelector("#" + addElementBtnSelector);
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
        while (target.nodeName !== "TR") {
          target = target.parentNode;
        }
        let row = This.getRowObject(target);
        //TODO: Modal Window
        if (window.confirm("Delete " + row + "?")) {
          This.deleteRow(target, row);
        }
        return;
      }
    });

    /**
     * This function initializes the addition of a new entity/element to the table which is a new admin. New admins can be registered by inviting them via an e-mail address. Then they can register themselves on a custom landing page for them.
     */
    this.addingEntity = function () {
      let mailInput = MaterialInputsModule.createInputApi(GeneralModule.generalVariables.inputTypes.TEXT, ["mail", "required"], undefined, "new-admin-mail", "E-Mail-Adresse", undefined, undefined, undefined);
      ModalModule.confirmModalApi("Neuen Administrator hinzufügen (einladen)", mailInput.inputContainer, function () {
        ModalModule.infoModalApi("Neuer Administrator!" ,"Der (möglicherweise) neue Administrator wird nun per E-Mail benachrichtigt, dass er sich ab sofort in diesem Tool registrieren kann.", undefined);
      }, undefined, function () {
        return FormModule.checkInputApi(mailInput.inputContainer, true);
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
    this.deleteRow = function (tr, rowObject) {
      This.rows.splice(This.rows.indexOf(rowObject), 1);
      tr.remove();
    }

  }

  // if there is an admin table then initialize it
  if (document.querySelector("table.admin-table")) {
    let adminTableElement = document.querySelector("table.admin-table");
    adminTable = new AdminTable(adminTableElement);
  }

  /**
   * API:
   */
  return {
    getAdminTableObjectApi : function (adminTableElement) {
      if (adminTableElement.classList.contains("admin-table")) {
        if (adminTableElement === adminTable.tableElement) {
          return adminTable;
        }
      }
    }
  }

})(window, document);