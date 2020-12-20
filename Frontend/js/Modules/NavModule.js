/*
  Dependencies: None
 */

let NavModule = (function (window, document, undefined) {
  // TODO: Revise what is necessary

  let nav = document.querySelector("nav.nav");
  let closer = document.querySelector("nav.nav .close");
  let navBgText = nav.querySelector(".bg-text");

  closer.addEventListener("click", function() {
    nav.classList.remove("open");
    nav.removeEventListener("mousemove", showBGText);
  });

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
    navBgText.innerHTML = text;
  }

  function openNav() {
    nav.classList.add("open");
  }

  return {
    openNavApi : function () {
      openNav();
    }
  }

})(window, document);
