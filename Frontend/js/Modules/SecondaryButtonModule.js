/**
 * This Module contains code responsible for managing application specific secondary buttons
 */
var SecondaryButtonModule = (function (window, document, undefined) {

  /**
   * DEPENDENCIES
   */
  let dependencies = [];
  GeneralModule.checkDependenciesApi(dependencies);

  let secondaryButtons = [];

  /**
   * This "class" represents a displayed HTML secondary button element and enables a detailed control over secondary buttons
   * @param button {HTMLElement} The respective HTML button element this object represents
   * @constructor
   */
  let SecondaryButton = function (button) {
    let This = this;
    this.secondaryButtonElement = button;
    this.enabled = !this.secondaryButtonElement.classList.contains("disabled");

    /**
     * This function disables a secondary button element (is not clickable anymore)
     */
    this.disableSecondaryButton = function () {
      this.enabled = false;
      this.secondaryButtonElement.classList.add("disabled");
    }

    /**
     * This function enables a secondary button element (button can be clicked again)
     */
    this.enableSecondaryButton = function () {
      this.enabled = true;
      this.secondaryButtonElement.classList.remove("disabled")
    }

    /**
     * This function manages click actions on the button. E.g. it prevents disables buttons from being clicked.
     */
    this.secondaryButtonElement.addEventListener("click", function (e) {
      if (!This.enabled) {
        e.preventDefault();
        e.stopImmediatePropagation();
      } else {
        This.secondaryButtonElement.classList.add("clicked");
        window.setTimeout(function () {
          This.secondaryButtonElement.classList.remove("clicked");
        }, 100);
      }
    });

  }

  /**
   * This function creates a html element secondary button with the application specific markup
   * @param classes
   * @param href
   * @param text
   * @return {HTMLElement}
   */
  SecondaryButton.createSecondaryButton = function (classes, href, text) {
    let button = GeneralModule.generateElementApi("a", ["secondary-button"].concat(classes));
    if (href) {
      button.setAttribute("href", href);
    }
    button.appendChild(GeneralModule.generateElementApi("span", ["text"], text));
    return button;
  }

  /**
   * This block initializes the static secondary buttons on an application page
   */
  let secondaryButtonElements = document.querySelectorAll(".secondary-button");
  secondaryButtonElements.forEach((secondaryButtonElement) => {
    secondaryButtons.push(new SecondaryButton(secondaryButtonElement));
  });

  /**
   * API:
   */
  return {
    /**
     * This api function enables a given secondary button html element
     * @param element {HTMLElement} This given secondary button html element will be enabled
     */
    enableSecondaryButtonApi : function (element) {
      if (element.classList.contains("secondary-button")) {
        secondaryButtons.forEach((secondaryButton) => {
          if (secondaryButton.secondaryButtonElement === element) {
            secondaryButton.enableSecondaryButton();
          }
        });
      }
    },
    /**
     * This api function disables a given secondary button element
     * @param element {HTMLElement} This given secondary button html element will be disabled
     */
    disableSecondaryButtonApi : function (element) {
      if (element.classList.contains("secondary-button")) {
        secondaryButtons.forEach((secondaryButton) => {
          if (secondaryButton.secondaryButtonElement === element) {
            secondaryButton.disableSecondaryButton();
          }
        });
      }
    },
    /**
     * This api function creates and returns an application specific secondary button html element
     * @param classes {string[]} The classes which should be set on the anchor element
     * @param href {string} Optional - If given it sets the href attribute of the anchor element
     * @param text {string} Sets the displayed text of the secondary button
     * @return {HTMLElement}
     */
    createSecondaryButtonApi : function (classes, href, text) {
      return SecondaryButton.createSecondaryButton(classes, href, text);
    }
  }

})(window, document);