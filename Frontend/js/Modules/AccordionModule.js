/*
  Dependencies: GeneralModule
 */

if (typeof GeneralModule === "undefined") {
  console.log("Missing GeneralModule Dependency!");
}

let AccordionModule = (function(window, document, undefined) {

  let accordions = [];

  let Accordion = function(accordion) {
    let This = this;
    this.accordionElement = accordion;
    this.accordionHeaders = this.accordionElement.querySelectorAll(".bar-header");
    this.stayOpen = false;

    this.addAccordionBar = function (nextBarSibling, categoryName, graduation, ageRange, sex, content) {
      let newBar = GeneralModule.generateElementApi("DIV", ["accordion-bar", "clearfix"]);
      let newHeader = GeneralModule.generateElementApi("DIV", ["bar-header", "clearfix"]);
      let barIcon = GeneralModule.generateElementApi("I", ["material-icons", "open-indicator"], "keyboard_arrow_down");
      newHeader.appendChild(barIcon);
      let categoryHeader = GeneralModule.generateElementApi("H4", ["category"], "Kategorie: ");
      let categoryNameSpan = GeneralModule.generateElementApi("SPAN", ["category-name"], categoryName);
      categoryHeader.appendChild(categoryNameSpan);
      newHeader.appendChild(categoryHeader);
      let categoryProperties = GeneralModule.generateElementApi("H4", ["category-properties"]);
      let graduationSpan = GeneralModule.generateElementApi("SPAN", ["category-graduation"], graduation);
      categoryProperties.appendChild(graduationSpan);
      categoryProperties.appendChild(document.createTextNode(" / "));
      let ageSpan = GeneralModule.generateElementApi("SPAN", ["category-age"], ageRange);
      categoryProperties.appendChild(ageSpan);
      categoryProperties.appendChild(document.createTextNode(" / "));
      let sexSpan = GeneralModule.generateElementApi("SPAN", ["category-sex"], sex);
      categoryProperties.appendChild(sexSpan);
      categoryProperties.appendChild(document.createTextNode(" / "));
      newHeader.appendChild(categoryProperties);

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

      newHeader.appendChild(tools);
      newBar.appendChild(newHeader);
      let newContent = GeneralModule.generateElementApi("DIV", ["bar-content"]);
      newContent.appendChild(content);
      newBar.appendChild(newContent);
      This.accordionElement.insertBefore(newBar, nextBarSibling);
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

    this.deleteCategoryBar = function (accordionBar) {
      accordionBar.remove();
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
      if (target.classList.contains("print")) {
        //Print category
        alert("print");
        return;
      }
      if (target.classList.contains("edit")) {
        This.renameCategory(barHeader, categoryName);
        return;
      }
      if (target.classList.contains("split")) {
        //Split existing category into two new ones

        return;
      }
      if (target.classList.contains("merge")) {
        //Merge two existing categories into one

        return;
      }
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

    this.endInput = function (input, span) {
      let value = input.value.trim();
      if (value === "") {
        input.focus();
        return;
      }
      input.remove();
      span.innerHTML = value;
      span.style.display = "inline";
      This.stayOpen = false;
    }

  };

  if (document.getElementsByClassName("accordion")[0]) {
    let accordionElements = document.querySelectorAll("div.accordion");

    accordionElements.forEach(function (accordion) {
      accordions.push(new Accordion(accordion));
    });

  }

  function insertNewCategoryBar (accordion, nextBarSibling, categoryName, graduation, ageRange, sex, content) {
    accordions.forEach(function (acc) {
      if (acc.accordionElement === accordion) {
        acc.addAccordionBar(nextBarSibling, categoryName, graduation, ageRange, sex, content);
      }
    });
  }

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

  function getOpenBar() {
    let openBar = document.querySelector("div.accordion-bar.open");
    return openBar;
  }

  return {
    getOpenBarApi : function () {
      return getOpenBar();
    },
    insertNewCategoryBarApi : function (accordion, nextBarSibling, categoryName, graduation, ageRange, sex, content) {
      insertNewCategoryBar(accordion, nextBarSibling, categoryName, graduation, ageRange, sex, content);
    },
    deleteCategoryBarApi : function (accordion, accordionBar) {
      accordions.forEach((acc) => {
        if (acc.accordionElement === accordion) {
          acc.deleteCategoryBar(accordionBar);
        }
      });
    }
  }

})(window, document);
