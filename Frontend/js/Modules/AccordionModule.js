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
    this.accordionBars = this.accordionElement.querySelectorAll(".accordion-bar");

    // This boolean is true if the bar should stay open, e.g. when clicked on a tool
    this.stayOpen = false;

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

    this.accordionElement.addEventListener("click", function (e) {
      let target = e.target;
      e.preventDefault();
      while (target.nodeName !== "BODY" && !target.classList.contains("bar-header")) {
        target = target.parentNode;
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

  function getOpenBar() {
    let openBar = document.querySelector("div.accordion-bar.open");
    return openBar;
  }

  if (document.getElementsByClassName("accordion")[0]) {
    let accordionElements = document.querySelectorAll("div.accordion");

    accordionElements.forEach(function (accordion) {
      accordions.push(new Accordion(accordion));
    });

  }

  return {
    getAccordionObjectApi : function (accordionElement) {
      accordions.forEach((accordion) => {
        if (accordion.accordionElement === accordionElement) {
          return accordion;
        }
      });
    },
    getAccordionObjectsApi : function () {
      return accordions;
    },
    getOpenBarApi : function () {
      return getOpenBar();
    },
    insertNewCategoryBarApi : function (accordion, nextBarSibling, heading, content) {
      accordions.forEach(function (acc) {
        if (acc.accordionElement === accordion) {
          acc.addAccordionBar(nextBarSibling, heading, content);
        }
      });
    },
    deleteCategoryBarApi : function (accordion, accordionBar) {
      accordions.forEach((acc) => {
        if (acc.accordionElement === accordion) {
          acc.deleteAccordionBar(accordionBar);
        }
      });
    },
    getAccordionFunctionApi : function () {
      return Accordion;
    }
  }

})(window, document);
