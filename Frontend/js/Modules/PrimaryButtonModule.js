if (typeof $ === "undefined") {
  console.warn("Missing jQuery Dependency!");
}

/**
 * This Module contains code responsible for managing application specific primary buttons
 */
var PrimaryButtonModule = (function (window, document, undefined) {

  /**
   * DEPENDENCIES
   */
  let dependencies = ["TiltModule"];
  GeneralModule.checkDependenciesApi(dependencies);

  let primaryButtons = [];

  /**
   * This "class" represents a displayed HTML primary button element and enables a detailed control over primary buttons
   * @param button {HTMLElement} The respective HTML button element this object represents
   * @constructor
   */
  let PrimaryButton = function (button) {
    let This = this;
    this.primaryButtonElement = button;
    this.enabled = !this.primaryButtonElement.classList.contains("disabled");

    // enable the tilt effect on the primary button element
    TiltModule.registerTiltElementApi(this.primaryButtonElement);

    /**
     * This function disables a primary button (is not clickable anymore)
     */
    this.disablePrimaryButton = function () {
      this.enabled = false;
      this.primaryButtonElement.classList.add("disabled");
    }

    /**
     * This function enables a primary button (primary button can be clicked again)
     */
    this.enablePrimaryButton = function () {
      this.enabled = true;
      this.primaryButtonElement.classList.remove("disabled")
    }

    /**
     * This function manages click actions on the button. E.g. it prevents disabled buttons from being clicked.
     */
    this.primaryButtonElement.addEventListener("click", function (e) {
      if (!This.enabled) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    });

  }

  /**
   * This function creates a html element primary button with the application specific markup
   * @param classes {string[]} The classes which should be set on the anchor element
   * @param href {string} Optional - If given it sets the href attribute of the anchor element
   * @param iconName {string} This application mainly uses the Google Material Icons Font and this string determines which icon should be displayed
   * @param text {string} Sets the accompanying text of the primary button
   * @return {HTMLElement}
   */
  PrimaryButton.createPrimaryButton = function (classes, href, iconName, text) {
    let button = GeneralModule.generateElementApi("a", ["primary-button"].concat(classes));
    if (href) {
      button.setAttribute("href", href);
    }
    button.appendChild(GeneralModule.generateElementApi("i", ["material-icons"], iconName));
    button.appendChild(GeneralModule.generateElementApi("p", [], text));
    TiltModule.registerTiltElementApi(button);
    return button;
  }

  /**
   * This block initializes the static primary buttons on an application page
   */
  let primaryButtonElements = document.querySelectorAll(".primary-button");
  primaryButtonElements.forEach(function (primaryButton) {
    primaryButtons.push(new PrimaryButton(primaryButton));
  });

  /**
   * API:
   */
  return {
    /**
     * This api function enables a given primary button html element
     * @param element {HTMLElement} This given primary button html element will be enabled
     */
    enablePrimaryButtonApi : function (element) {
      if (element.classList.contains("primary-button")) {
        primaryButtons.forEach((primaryButton) => {
          if (primaryButton.primaryButtonElement === element) {
            primaryButton.enablePrimaryButton();
          }
        });
      }
    },
    /**
     * This api function disables a given primary button element
     * @param element {HTMLElement} This given primary button html element will be disabled
     */
    disablePrimaryButtonApi : function (element) {
      if (element.classList.contains("primary-button")) {
        primaryButtons.forEach((primaryButton) => {
          if (primaryButton.primaryButtonElement === element) {
            primaryButton.disablePrimaryButton();
          }
        });
      }
    },
    /**
     * This api function creates and returns an application specific primary button html element
     * @param classes {string[]} The classes which should be set on the anchor element
     * @param href {string} Optional - If given it sets the href attribute of the anchor element
     * @param iconName {string} This application mainly uses the Google Material Icons Font and this string determines which icon should be displayed
     * @param text {string} Sets the accompanying text of the primary button
     * @return {HTMLElement}
     */
    createPrimaryButtonApi : function (classes, href, iconName, text) {
      return PrimaryButton.createPrimaryButton(classes, href, iconName, text);
    }
  }

})(window, document);
