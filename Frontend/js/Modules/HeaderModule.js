/**
 * This Module contains code responsible for managing the application header on each page
 */
var HeaderModule = (function(window, document, undefined) {

  /**
   * DEPENDENCIES
   */
  let dependencies = ["NavModule"];
  GeneralModule.checkDependenciesApi(dependencies);

  let header = document.querySelector("header");
  let userMenu = header.querySelector("div.user-profile");
  let navBtn = header.querySelector("a.menu");
  let userBtn = header.querySelector("a.profile");

  /**
   * This function handles clicks on the navigation button (mainly opening the navigation)
   */
  navBtn.addEventListener("click", function () {
    NavModule.openNavApi();
    header.classList.add("open-menu");
  });

  /**
   * This function handles clicks on the user profile button (mainly opening the user profile)
   */
  userBtn.addEventListener("click", function () {
    userMenu.classList.toggle("open");
    if (userMenu.classList.contains("open")) {
      header.classList.add("open-menu");
    } else {
      header.classList.remove("open-menu");
    }
  });

  /**
   * This function handles the closing of header elements like the navigation and the user profile
   * @param target {HTMLElement} The target element of a click happened on the application page
   */
  function closeHeader(target) {
    let t = target;
    if (t && t.nodeName !== "HEADER") {
      while (t && t.nodeName !== "HEADER") {
        t = t.parentNode;
      }
    }
    if (!t || t.nodeName === "BODY") {
      userMenu.classList.remove("open");
      header.classList.remove("open-menu");
    }
  }

  /**
   * API:
   */
  return {
    /**
     * This api function handles the possible closing of the header
     * @param target {HTMLElement} The target element of a click happened on the application page
     */
    closeHeaderApi : function (target) {
      closeHeader(target);
    }
  }

})(window, document);
