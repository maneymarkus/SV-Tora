function init(window, document, undefined) {

  let Module = (function(window, document, undefined) {

    function generateElement(element, classNames = undefined, value = undefined) {
      let el = document.createElement(element);
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




  let AccordionModule = (function(window, document, undefined) {

    let accordions = [];

    let Accordion = function(accordion) {
      let This = this;
      this.accordionElement = accordion;
      this.accordionHeaders = this.accordionElement.querySelectorAll(".bar-header");
      this.stayOpen = false;

      this.addAccordionBar = function (nextBarSibling, categoryName, graduation, ageRange, sex, content) {
        let newBar = Module.generateElementApi("DIV", ["accordion-bar", "clearfix"]);
        let newHeader = Module.generateElementApi("DIV", ["bar-header", "clearfix"]);
        let barIcon = Module.generateElementApi("I", ["material-icons", "open-indicator"], "keyboard_arrow_down");
        newHeader.appendChild(barIcon);
        let categoryHeader = Module.generateElementApi("H4", ["category"], "Kategorie: ");
        let categoryNameSpan = Module.generateElementApi("SPAN", ["category-name"], categoryName);
        categoryHeader.appendChild(categoryNameSpan);
        newHeader.appendChild(categoryHeader);
        let categoryProperties = Module.generateElementApi("H4", ["category-properties"]);
        let graduationSpan = Module.generateElementApi("SPAN", ["category-graduation"], graduation);
        categoryProperties.appendChild(graduationSpan);
        categoryProperties.appendChild(document.createTextNode(" / "));
        let ageSpan = Module.generateElementApi("SPAN", ["category-age"], ageRange);
        categoryProperties.appendChild(ageSpan);
        categoryProperties.appendChild(document.createTextNode(" / "));
        let sexSpan = Module.generateElementApi("SPAN", ["category-sex"], sex);
        categoryProperties.appendChild(sexSpan);
        categoryProperties.appendChild(document.createTextNode(" / "));
        newHeader.appendChild(categoryProperties);

        //Create <div class="tools">...</div>
        let tools = Module.generateElementApi("DIV", ["tools"]);
        let print = Module.generateElementApi("A", ["primary-button tool print"]);
        print.appendChild(Module.generateElementApi("I", ["material-icons"], "print"));
        print.appendChild(Module.generateElementApi("P", [], "Drucken"));
        tools.appendChild(print);
        let edit = Module.generateElementApi("A", ["primary-button tool edit"]);
        edit.appendChild(Module.generateElementApi("I", ["material-icons"], "create"));
        edit.appendChild(Module.generateElementApi("P", [], "Umbenennen"));
        tools.appendChild(edit);
        let split = Module.generateElementApi("A", ["primary-button tool split"]);
        split.appendChild(Module.generateElementApi("I", ["material-icons"], "call_split"));
        split.appendChild(Module.generateElementApi("P", [], "Splitten"));
        tools.appendChild(split);
        let merge = Module.generateElementApi("A", ["primary-button tool merge"]);
        merge.appendChild(Module.generateElementApi("I", ["material-icons"], "merge_type"));
        merge.appendChild(Module.generateElementApi("P", [], "Mergen"));
        tools.appendChild(merge);

        newHeader.appendChild(tools);
        newBar.appendChild(newHeader);
        let newContent = Module.generateElementApi("DIV", ["bar-content"]);
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
        let cNameInput = Module.generateElementApi("INPUT", ["category-name"]);
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

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
