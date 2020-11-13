function init(window, document, undefined) {
  let AccordionModule = (function(window, document, undefined) {

    let accordions = [];

    let Accordion = function(accordion) {
      let This = this;
      this.accordionContainer = accordion;
      this.accordionHeaders = this.accordionContainer.querySelectorAll(".accordion-header");
      accordions.push(this);
      this.accordionHeaders.forEach(function (item) {
        item.addEventListener("click", function (e) {
          handleBarClick(This, item, e);
        });
      });

      this.addAccordionBar = function (nextBarSibling, categoryName, graduation, ageRange, sex, content) {
        let newBar = Module.generateElementApi("DIV", ["accordion-bar", "clearfix"]);
        let newHeader = Module.generateElementApi("DIV", ["accordion-header", "clearfix"]);
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
        let tools = Module.generateElementApi("DIV", ["tools"]);
        let print = Module.generateElementApi("A", ["print"]);
        print.appendChild(Module.generateElementApi("I", ["material-icons"], "print"));
        tools.appendChild(print);
        let edit = Module.generateElementApi("A", ["edit"]);
        edit.appendChild(Module.generateElementApi("I", ["material-icons"], "create"));
        tools.appendChild(edit);
        let split = Module.generateElementApi("A", ["split"]);
        split.appendChild(Module.generateElementApi("I", ["material-icons"], "call_split"));
        tools.appendChild(split);
        let merge = Module.generateElementApi("A", ["merge"]);
        merge.appendChild(Module.generateElementApi("I", ["material-icons"], "merge_type"));
        tools.appendChild(merge);
        newHeader.appendChild(tools);
        newBar.appendChild(newHeader);
        let newContent = Module.generateElementApi("DIV", ["accordion-content"]);
        newContent.appendChild(content);
        newBar.appendChild(newContent);
        This.accordionContainer.insertBefore(newBar, nextBarSibling);
        newHeader.addEventListener("click", function (e) {
          handleBarClick(This, this, e);
        });
      }
    };

    function handleBarClick (This, item, e) {
      let ev = e || window.event;
      let target = ev.target || window.target;
      ev.preventDefault();
      while (target && target.nodeName !== "BODY" && !target.classList.contains("tools")) {
        target = target.parentNode;
      }
      if (target.classList.contains("tools")) {
        return;
      }
      let condition = item.parentElement.classList.contains("open");
      if (!condition) {
        This.hideAllExcept(This, item.parentElement);
        This.show(item.parentElement);
        document.getElementsByTagName("BODY")[0].classList.add("open-accordion");
      } else {
        This.hide(item.parentElement);
        document.getElementsByTagName("BODY")[0].classList.remove("open-accordion");
      }
    }

    function deleteCategoryBar (accordion, accordionBar) {
      accordionBar.remove();
    }

    function insertNewCategoryBar (accordion, nextBarSibling, categoryName, graduation, ageRange, sex, content) {
      accordions.forEach(function (item) {
        if (item.accordionContainer === accordion) {
          item.addAccordionBar(nextBarSibling, categoryName, graduation, ageRange, sex, content);
        }
      });
    }

    Accordion.prototype.show = function (accordionBar) {
      accordionBar.classList.add("open");
      let content = accordionBar.querySelector("div.accordion-content");
      let getHeight = function () {
        content.style.display = "block";
        return content.scrollHeight;
      };
      content.style.height = getHeight() + "px";
    };

    Accordion.prototype.hide = function (accordionBar) {
      accordionBar.classList.remove("open");
      let content = accordionBar.querySelector("div.accordion-content");
      content.style.height = "0";

      window.setTimeout(function () {
        content.style.display = "none";
      },500);
    };

    Accordion.prototype.hideAllExcept = function(accordion, accordionBar) {
      let openBars = document.querySelectorAll(".open");
      openBars.forEach(function (item) {
        if (item !== accordionBar) {
          item.classList.remove("open");
          accordion.hide(item);
        }
      });
    };

    function getOpenBar() {
      let openBar = document.querySelector("div.accordion-bar.open");
      return openBar;
    }

    return {
      createAccordionApi : function (accordionElement) {
        return new Accordion(accordionElement);
      },
      getOpenBarApi : function () {
        return getOpenBar();
      },
      insertNewCategoryBarApi : function (accordion, nextBarSibling, categoryName, graduation, ageRange, sex, content) {
        insertNewCategoryBar(accordion, nextBarSibling, categoryName, graduation, ageRange, sex, content);
      },
      deleteCategoryBarApi : function (accordion, accordionBar) {
        deleteCategoryBar(accordion, accordionBar);
      }
    }

  })(window, document);




  if (document.getElementsByClassName("accordion")[0]) {
    let accordionContainers = document.getElementsByClassName("accordion");
    accordionContainers = Array.prototype.slice.call(accordionContainers);

    accordionContainers.forEach(function (item) {
      AccordionModule.createAccordionApi(item);
    });

  }

  const emblaNode = document.getElementsByClassName('embla')[0];
  const emblaOptions = {loop: true, startIndex: 2, align: "end"};

  const embla = EmblaCarousel(emblaNode, emblaOptions);

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
