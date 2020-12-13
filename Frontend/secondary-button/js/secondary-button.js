function init(window, document, undefined) {

  let ButtonModule = (function (window, document, undefined) {

    let secondaryButtons = document.querySelectorAll("a.secondary-button");

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

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
