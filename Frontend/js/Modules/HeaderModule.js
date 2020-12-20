/*
  Dependencies: NavModule
 */

if (typeof NavModule === "undefined") {
  console.log("Missing HeaderModule Dependency!");
}

let HeaderModule = (function(window, document, undefined) {

  let header = document.querySelector("header");
  let userMenu = header.querySelector("div.user-profile");
  let navBtn = header.querySelector("a.menu");
  let userBtn = header.querySelector("a.profile");

  navBtn.addEventListener("click", function () {
    NavModule.openNavApi();
    header.classList.add("open-menu");
  });

  userBtn.addEventListener("click", function () {
    userMenu.classList.toggle("open");
    if (userMenu.classList.contains("open")) {
      header.classList.add("open-menu");
    } else {
      header.classList.remove("open-menu");
    }
  });

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

  return {
    closeHeaderApi : function (target) {
      closeHeader(target);
    }
  }

})(window, document);
