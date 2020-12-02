function init(window, document, undefined) {

  let secondaryButtons = document.querySelectorAll("a.secondary-button .text");

  secondaryButtons.forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      let btnRect = btn.getBoundingClientRect();
      let x = e.clientX - btnRect.left * 1.025;
      let y = e.clientY - btnRect.top;

      let ripple = document.createElement("span");
      ripple.classList.add("ripple");
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";

      btn.querySelector("span").appendChild(ripple);

      window.setTimeout(() => {
        ripple.remove();
      }, 1000);

    });
  });

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
