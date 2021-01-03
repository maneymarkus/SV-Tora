/*
  Dependencies: None
 */

let SecondaryButtonModule = (function (window, document, undefined) {

  let secondaryButtons = document.querySelectorAll(".secondary-button");

  secondaryButtons.forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      if (btn.classList.contains("disabled")) {
        return;
      }
      btn.classList.add("clicked");
      window.setTimeout(function () {
        btn.classList.remove("clicked");
      }, 100);
    });
  });

})(window, document);