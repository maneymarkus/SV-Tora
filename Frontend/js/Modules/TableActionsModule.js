/**
 * This Module contains code responsible for managing actions related to tables as e.g. adding an element/entity to a table
 */
var TableActionsModule = (function(window, document, undefined) {

  /**
   * DEPENDENCIES
   */
  let dependencies = ["PrimaryButtonModule", "TableModule"];
  GeneralModule.checkDependenciesApi(dependencies);

  let tableActionsContainers = [];

  /**
   * This "class" represents a table actions container object
   * @param tableActionsContainer {HTMLElement} The respective html element this object represents
   * @constructor
   */
  let TableActionsContainer = function(tableActionsContainer) {

    let This = this;
    this.tableIdentificator = tableActionsContainer.getAttribute("data-table");
    this.connectedTableElement = document.getElementById(this.tableIdentificator);
    this.connectedTableObject = TableModule.getTableObjectApi(this.connectedTableElement);

    this.tableActionsContainerElement = tableActionsContainer;
    this.addEntityButton = tableActionsContainer.querySelector(".primary-button.add-entity");
    this.printButton = (tableActionsContainer.querySelector(".primary-button.print")) ? tableActionsContainer.querySelector(".primary-button.print") : undefined;

    /**
     * This functions listens for clicks on the add entity button and triggers the modal window that requires the necessary input from the user and then adds the newly configured element to the table
     */
    this.addEntityButton.addEventListener("click", function () {
      // clone the array not just store the reference!
      let keys = This.connectedTableObject.dataColumns.slice();

      let object = TranslationModule.translateRowToObjectApi(keys, undefined);
      let container = TranslationModule.translateObjectToInputsApi(object, true);
      ModalModule.confirmModalApi("Neuen Kämpfer anlegen", container, function () {
        let userInputObject = TranslationModule.translateInputsToObjectApi(container);
        This.connectedTableObject.addElement(userInputObject);
      }, undefined, function () {
        return FormModule.checkFormApi(container, true);
      });
    });

    if (this.printButton) {
      this.printButton.addEventListener("click", function () {
        ModalModule.infoModalApi("Drucken!", "Ich drucke die Tabelle jetzt aus! (Vielleicht...)", undefined);
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
  return {

  }

})(window, document);
