/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function(window, document, undefined) {

  let dependencies = ["MaterialInputsModule", "AccordionModule", "ModalModule", "TranslationModule"];
  GeneralModule.checkDependenciesApi(dependencies);

  let categoryAccordions = [];

  let CategoryAccordion = function(accordion) {
    let This = this;

    // This property contains the original accordion object with the general functionality
    this.inheritance = AccordionModule.getAccordionObjectApi(accordion);

    this.accordionElement = accordion;
    this.accordionBars = this.inheritance.accordionBars;

    this.categoryNames = [];
    this.accordionBars.forEach((bar) => {
      this.categoryNames.push(bar.querySelector("span.category-name").innerText.trim());
    });

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

      let newBar = This.inheritance.addAccordionBar(nextBarSibling, categoryHeader, content);

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
      while (target.nodeName !== "BODY" && !target.classList.contains("tool")) {
        target = target.parentNode;
      }
      if (target.classList.contains("tool")) {
        This.inheritance.stayOpen = true;
        This.handleToolClick(target);
        return;
      }
    });

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
        // TODO: Go to splitting page
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
      let radioInput = MaterialInputsModule.createInputApi(GeneralModule.generalVariables.inputTypes.RADIO, undefined, undefined, "mergeTarget", undefined, undefined, undefined, otherCategories);
      let categoryToBeMerged = categoryName + " (" + categoryGraduation + "/" + categoryAge + "/" + categorySex + "/" + categoryMemberCount + ")";
      ModalModule.confirmModalApi("Kategorie " + categoryToBeMerged + " vereinen mit:", radioInput.inputContainer, function () {
        //TODO: call this after backend responded successfully
        This.mergeCategories(radioInput.inputContainer, mergeInitiatorBarHeader);
      });
    }

    this.mergeCategories = function (inputContainer, mergeInitiatorBarHeader) {
      let translatedInput = TranslationModule.translateInputsToObjectApi(inputContainer);
      let mergeTargetCategoryName = translatedInput["mergeTarget"];
      if (mergeInitiatorBarHeader.nextElementSibling) {
        let rows = mergeInitiatorBarHeader.nextElementSibling.querySelectorAll("tr");
        let mergeTarget = This.getAccordionBarByCategoryName(mergeTargetCategoryName);
        let mergeTargetTable = mergeTarget.querySelector("table");
        rows.forEach((row) => {
          mergeTargetTable.appendChild(row);
        });
        This.inheritance.deleteAccordionBar(mergeInitiatorBarHeader.parentElement);
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
      let categoryNameSpan = barHeader.querySelector("span.category-name");
      let graduationSpan = barHeader.querySelector("span.graduation");
      categoryNameSpan.classList.add("no-display");
      let width = categoryNameSpan.offsetWidth;

      // this variable keeps track if the error that a category name has to be unique has already been shown
      let errorShown = false;

      function endInput(value) {
        categoryNameSpan.innerHTML = value;
        categoryNameSpan.classList.remove("no-display");
        This.inheritance.stayOpen = false;
        errorShown = false;
      }

      function quickInputValidation(value) {
        let categoryNames = This.categoryNames.slice();
        categoryNames.splice(categoryNames.indexOf(categoryName), 1);
        if (categoryNames.includes(value)) {
          if (!errorShown) {
            ModalModule.infoModalApi("Änderung Kategorie Name", "Kategorien müssen einen einzigartigen Namen haben.", function () {
              return false;
            });
          }
          errorShown = true;
        } else {
          return true;
        }
      }

      MaterialInputsModule.createQuickInputApi(width, categoryName, endInput, graduationSpan, quickInputValidation);

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

  let accordionElements = document.querySelectorAll("div.accordion");
  accordionElements.forEach(function (accordion) {
    categoryAccordions.push(new CategoryAccordion(accordion));
  });

})(window, document);
