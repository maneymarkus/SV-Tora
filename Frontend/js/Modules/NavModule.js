/**
 * This Module contains code responsible for managing the navigation element of the websites
 */
var NavModule = (function (window, document, undefined) {

  /**
   * DEPENDENCIES
   */
  let dependencies = [];
  GeneralModule.checkDependenciesApi(dependencies);

  let nav = document.querySelector("nav.nav");
  let closeBtn = document.querySelector("nav.nav .close");
  let navBgText = nav.querySelector(".bg-text");

  /**
   * This function listens for clicks on the close button to close the navigation
   */
  closeBtn.addEventListener("click", function() {
    nav.classList.remove("open");
    nav.removeEventListener("mousemove", showBGText);
  });

  /**
   * This function handles the display of the ambient background text
   * @param e {Event} The event object
   */
  function showBGText(e) {
    let target = e.target;
    while (target.nodeName !== "A" && target.nodeName !== "BODY") {
      target = target.parentNode;
    }
    if (target.nodeName === "BODY") {
      navBgText.innerHTML = "";
      return;
    }
    let text = target.innerText.trim();
    if (text.toLowerCase().indexOf("schließen") === -1) {
      navBgText.innerHTML = text;
    } else {
      navBgText.innerHTML = "";
    }
  }

  /**
   * This function opens the navigation
   */
  function openNav() {
    nav.classList.add("open");
    nav.addEventListener("mousemove", showBGText);
  }

  /**
   * API:
   */
  return {
    /**
     * This api function enables other modules to open the navigation
     */
    openNavApi : function () {
      openNav();
    }
  }

})(window, document);
