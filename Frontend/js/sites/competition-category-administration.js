/*
  Dependencies: GeneralModule, ModalModule, MaterialInputsModule, TranslationModule
 */

if (typeof GeneralModule === "undefined") {
  console.log("Missing GeneralModule Dependency!");
}

if (typeof ModalModule === "undefined") {
  console.log("Missing ModalModule Dependency!");
}

if (typeof MaterialInputsModule === "undefined") {
  console.log("Missing MaterialInputsModule Dependency!");
}

if (typeof TranslationModule === "undefined") {
  console.log("Missing TranslationModule Dependency!");
}

(function(window, document, undefined) {

  let accordions = [];

  let Accordion = function(accordion) {
    let This = this;
    this.accordionElement = accordion;
    this.accordionBars = this.accordionElement.querySelectorAll(".accordion-bar");

    // This boolean is true if the bar should stay open, e.g. when clicked on a tool
    this.stayOpen = false;

    this.categoryNames = [];
    this.accordionBars.forEach((bar) => {
      this.categoryNames.push(bar.querySelector("span.category-name").innerText.trim());
    });

    this.addAccordionBar = function (nextBarSibling, heading, content) {
      let newBar = GeneralModule.generateElementApi("DIV", ["accordion-bar", "clearfix"]);
      let newHeader = GeneralModule.generateElementApi("DIV", ["bar-header", "clearfix"]);
      let barIcon = GeneralModule.generateElementApi("I", ["material-icons", "open-indicator"], "keyboard_arrow_down");
      newHeader.appendChild(barIcon);
      if (typeof heading === "string") {
        let barHeaderContent = GeneralModule.generateElementApi("h4", ["heading"], heading);
      } else {
        newHeader.appendChild(heading);
      }

      newBar.appendChild(newHeader);
      let newContent = GeneralModule.generateElementApi("DIV", ["bar-content"]);
      newContent.appendChild(content);
      newBar.appendChild(newContent);
      This.accordionElement.insertBefore(newBar, nextBarSibling);
      This.accordionBars = This.accordionElement.querySelectorAll(".accordion-bar");
      return newBar;
    }

    this.addCategoryAccordionBar = function (nextBarSibling, categoryName, graduation, ageRange, sex, memberCount, content) {
      let categoryHeader = GeneralModule.generateElementApi("H4", ["heading"], "Kategorie: ");
      categoryHeader.appendChild(GeneralModule.generateElementApi("SPAN", ["category-name"], categoryName));
      categoryHeader.appendChild(document.createTextNode(" ("));
      categoryHeader.appendChild(GeneralModule.generateElementApi("SPAN", ["category-graduation"], graduation));
      categoryHeader.appendChild(document.createTextNode(" / "));
      categoryHeader.appendChild(GeneralModule.generateElementApi("SPAN", ["category-age"], ageRange));
      categoryHeader.appendChild(document.createTextNode(" / "));
      categoryHeader.appendChild(GeneralModule.generateElementApi("SPAN", ["category-sex"], sex));
      categoryHeader.appendChild(document.createTextNode(" / "));
      categoryHeader.appendChild(GeneralModule.generateElementApi("SPAN", ["count-members"], memberCount));
      categoryHeader.appendChild(document.createTextNode(")"));

      let newBar = this.addAccordionBar(nextBarSibling, categoryHeader, content);

      //Create <div class="tools">...</div>
      let tools = GeneralModule.generateElementApi("DIV", ["tools"]);
      let print = GeneralModule.generateElementApi("A", ["primary-button tool print"]);
      print.appendChild(GeneralModule.generateElementApi("I", ["material-icons"], "print"));
      print.appendChild(GeneralModule.generateElementApi("P", [], "Drucken"));
      tools.appendChild(print);
      let edit = GeneralModule.generateElementApi("A", ["primary-button tool edit"]);
      edit.appendChild(GeneralModule.generateElementApi("I", ["material-icons"], "create"));
      edit.appendChild(GeneralModule.generateElementApi("P", [], "Umbenennen"));
      tools.appendChild(edit);
      let split = GeneralModule.generateElementApi("A", ["primary-button tool split"]);
      split.appendChild(GeneralModule.generateElementApi("I", ["material-icons"], "call_split"));
      split.appendChild(GeneralModule.generateElementApi("P", [], "Splitten"));
      tools.appendChild(split);
      let merge = GeneralModule.generateElementApi("A", ["primary-button tool merge"]);
      merge.appendChild(GeneralModule.generateElementApi("I", ["material-icons"], "merge_type"));
      merge.appendChild(GeneralModule.generateElementApi("P", [], "Mergen"));
      tools.appendChild(merge);

      newBar.querySelector("div.bar-header").appendChild(tools);
    }

    this.accordionElement.addEventListener("click", function (e) {
      let target = e.target;
      e.preventDefault();
      while (target.nodeName !== "BODY" && !target.classList.contains("tool") && !target.classList.contains("bar-header")) {
        target = target.parentNode;
      }
      if (target.classList.contains("tool")) {
        This.handleToolClick(target);
        return;
      }
      if (target.classList.contains("bar-header")) {
        if (!target.parentElement.classList.contains("open") && !This.stayOpen) {
          This.hideAllExcept(This, target.parentElement);
          This.show(target.parentElement);
        } else {
          if (!This.stayOpen) {
            This.hide(target.parentElement);
          }
        }
        return;
      }
    });

    this.deleteAccordionBar = function (accordionBar) {
      if (accordionBar.classList.contains("accordion-bar")) {
        accordionBar.remove();
        This.accordionBars = This.accordionElement.querySelectorAll(".accordion-bar");
      }
    }

    this.handleToolClick = function(target) {
      let barHeader = target;
      while (!barHeader.classList.contains("bar-header")) {
        barHeader = barHeader.parentElement;
      }
      let categoryName = barHeader.querySelector("span.category-name").innerHTML.trim();
      let categoryGraduation = barHeader.querySelector("span.graduation").innerHTML.trim();
      let categoryAge = barHeader.querySelector("span.category-age").innerHTML.trim();
      let categorySex = barHeader.querySelector("span.category-sex").innerHTML.trim();
      let categoryMemberCount = barHeader.querySelector("span.count-members").innerHTML.trim();

      //Print category
      if (target.classList.contains("print")) {
        ModalModule.infoModalApi("DRUCKEN!", "DruckenDruckenDruckenDruckenDruckenDruckenDruckenDruckenDruckenDruckenDruckenDruckenDruckenDruckenDrucken");
        return;
      }

      // Change category name
      if (target.classList.contains("edit")) {
        This.renameCategory(barHeader, categoryName);
        return;
      }

      // split category
      if (target.classList.contains("split")) {

        return;
      }

      // Merge two categories into single one
      if (target.classList.contains("merge")) {
        if (This.accordionBars.length > 1) {
          let accordion = target;
          while (accordion.nodeName !== "BODY" && !accordion.classList.contains("accordion")) {
            accordion = accordion.parentElement;
          }
          This.initiateMerging(accordion, barHeader, categoryName, categoryGraduation, categoryAge, categorySex, categoryMemberCount);
        }
        return;
      }
    }

    this.initiateMerging = function (accordion, mergeInitiatorBarHeader, categoryName, categoryGraduation, categoryAge, categorySex, categoryMemberCount) {
      let otherCategories = [];
      let bars = accordion.querySelectorAll("div.bar-header");
      bars.forEach((bar) => {
        let cName = bar.querySelector("span.category-name").innerText.trim();
        if (cName !== categoryName) {
          let object = {};
          object["text"] = bar.querySelector("h4.heading").innerText.replace("Kategorie: ", "");
          object["value"] = bar.querySelector("span.category-name").innerText.trim();
          object["checked"] = false;
          otherCategories.push(object);
        }
      });
      let container = MaterialInputsModule.createInputApi(GeneralModule.generalVariables.inputTypes.RADIO, undefined, undefined, "mergeTarget", undefined, undefined, undefined, otherCategories);
      let categoryToBeMerged = categoryName + " (" + categoryGraduation + "/" + categoryAge + "/" + categorySex + "/" + categoryMemberCount + ")";
      ModalModule.confirmModalApi("Kategorie " + categoryToBeMerged + " vereinen mit:", container, function () {
        //TODO: call this after backend responded successfully
        This.mergeCategories(container, mergeInitiatorBarHeader);
      });
    }

    this.mergeCategories = function (container, mergeInitiatorBarHeader) {
      let translatedInput = TranslationModule.translateInputsToObjectApi(container);
      let mergeTargetCategoryName = translatedInput["mergeTarget"];
      if (mergeInitiatorBarHeader.nextElementSibling) {
        let rows = mergeInitiatorBarHeader.nextElementSibling.querySelectorAll("tr");
        let mergeTarget = This.getAccordionBarByCategoryName(mergeTargetCategoryName);
        let mergeTargetTable = mergeTarget.querySelector("table");
        rows.forEach((row) => {
          mergeTargetTable.appendChild(row);
        });
        This.deleteAccordionBar(mergeInitiatorBarHeader.parentElement);
        This.renumberContent(mergeTargetTable);
      }
    }

    this.renumberContent = function (table) {
      let rows = table.querySelectorAll("tr");
      let counter = 1;
      rows.forEach((row) => {
        row.querySelector("td.number").innerHTML = "" + counter++;
      });
    }

    this.renameCategory = function (barHeader, categoryName) {
      This.stayOpen = true;
      let categoryNameSpan = barHeader.querySelector("span.category-name");
      let graduationSpan = barHeader.querySelector("span.graduation");
      categoryNameSpan.style.display = "none";
      let cNameInput = GeneralModule.generateElementApi("INPUT", ["category-name"]);
      cNameInput.value = categoryName;
      barHeader.querySelector("h4").insertBefore(cNameInput, graduationSpan);
      cNameInput.style.width = (cNameInput.value.length + 2) * 13 + "px";
      cNameInput.focus();
      cNameInput.addEventListener("focusout", function() {
        This.endInput(cNameInput, categoryNameSpan);
      });
      cNameInput.addEventListener("keydown", function (e) {
        let keyCode = e.which || e.keyCode;
        if (keyCode === 13) {
          This.endInput(cNameInput, categoryNameSpan);
        } else {
          cNameInput.style.width = (cNameInput.value.length + 2) * 13 + "px";
        }
      });
    }

    // this variable keeps track if the error that a category name has to be unique has already been shown
    let errorShown = false;

    this.endInput = function (input, span) {
      let value = input.value.trim();
      if (value === "") {
        input.focus();
        return;
      }
      if (This.categoryNames.includes(value)) {
        if (!errorShown) {
          ModalModule.infoModalApi("Änderung Kategorie Name", "Kategorien müssen einen einzigartigen Namen haben.");
        }
        errorShown = true;
        input.focus();
        return;
      }
      input.remove();
      span.innerHTML = value;
      span.style.display = "inline";
      This.stayOpen = false;
    }

    this.getAccordionBarByCategoryName = function (categoryName) {
      let wantedBar = undefined;
      This.accordionBars.forEach((bar) => {
        let cName = bar.querySelector("span.category-name").innerText.trim();
        if (cName === categoryName) {
          wantedBar = bar;
        }
      });
      return wantedBar;
    }

  };

  Accordion.prototype.show = function (accordionBar) {
    accordionBar.classList.add("open");
    let content = accordionBar.querySelector("div.bar-content");
    let getHeight = function () {
      content.style.display = "block";
      return content.scrollHeight;
    };
    content.style.height = getHeight() + "px";
    document.getElementsByTagName("BODY")[0].classList.add("open-accordion");
  };

  Accordion.prototype.hide = function (accordionBar) {
    accordionBar.classList.remove("open");
    let content = accordionBar.querySelector("div.bar-content");
    content.style.height = "0";
    document.getElementsByTagName("BODY")[0].classList.remove("open-accordion");

    window.setTimeout(function () {
      content.style.display = "none";
    },500);
  };

  Accordion.prototype.hideAllExcept = function(accordion, accordionBar) {
    let openBars = document.querySelectorAll(".open");
    openBars.forEach(function (bar) {
      if (bar !== accordionBar) {
        bar.classList.remove("open");
        accordion.hide(bar);
      }
    });
  };

  if (document.getElementsByClassName("accordion")[0]) {
    let accordionElements = document.querySelectorAll("div.accordion");

    accordionElements.forEach(function (accordion) {
      accordions.push(new Accordion(accordion));
    });

  }

})(window, document);
