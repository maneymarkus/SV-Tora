function init(window, document, undefined) {

  let secondaryButtons = document.querySelectorAll("a.secondary-button .text");

  secondaryButtons.forEach(btn => {
    btn.addEventListener("click", function(e) {
      let x = e.clientX - btn.parentNode.offsetLeft;
      let y = e.clientY - btn.parentNode.offsetTop;

      let ripple = document.createElement("span");
      ripple.classList.add("ripple");
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";

      btn.appendChild(ripple);

      window.setTimeout(() => {
        ripple.remove();
      }, 1000);

    });
  });

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
