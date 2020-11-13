function init(window, document, undefined) {
  let opener = document.getElementsByClassName("open-nav")[0];
  let nav = document.getElementsByClassName("nav")[0];
  let closer = document.querySelector("nav.nav .close");
  let navBgText = nav.getElementsByClassName("bg-text")[0];

  opener.addEventListener("click", function() {
    nav.classList.add("open");
  });

  closer.addEventListener("click", function() {
    nav.classList.remove("open");
  });

  nav.addEventListener("mousemove", function(e) {
    let a = e.target;
    while (a.nodeName !== "A" && a.nodeName !== "BODY") {
      a = a.parentNode;
    }
    if (a.nodeName === "BODY") {
      navBgText.innerHTML = "";
      return;
    };
    let text = a.innerText.trim();
    navBgText.innerHTML = text;
  });

  let tiltOptions = {maxTilt: 15, scale: 1.15};
  const primaryButtonTilt = $(".primary-button").tilt(tiltOptions);

  $('.primary-button').click(function (e){
    e.preventDefault();
  });

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
