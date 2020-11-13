function init(window, document, undefined) {
  let profile;
  if (profile = document.getElementsByClassName("user-profile")[0]) {

    let opener = document.getElementsByClassName("open-profile")[0];

    opener.addEventListener("click", function (e) {
      profile.classList.toggle("open");
      e.stopPropagation();
    });

    document.getElementsByTagName("body")[0].addEventListener("click", function (e) {
      let target = e.target;
      while (target.nodeName !== "BODY" && !target.classList.contains("user-profile")) {
        target = target.parentNode;
      }
      if (target.nodeName === "BODY") {
        profile.classList.remove("open");
      }
    });

    let buttons = document.querySelectorAll("a.secondary-button");

    buttons.forEach(btn => {
      btn.addEventListener("click", function (e) {
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

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
