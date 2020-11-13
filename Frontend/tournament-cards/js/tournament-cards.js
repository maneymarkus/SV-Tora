function init(window, document, undefined) {

  let flipCards = document.querySelectorAll(".tournament-card");

  flipCards.forEach((fc) => {
    fc.addEventListener("click", function (e) {
      let target = e.target;
      while (!target.classList.contains("secondary-button") && !target.classList.contains("tournament-card")) {
        target = target.parentNode;
      }
      if (target.classList.contains("secondary-button")) {
        return;
      }
      fc.classList.toggle("flipped");
    });
  });

  let tiltOptions = {maxTilt: 15, scale: 1.15};
  const primaryButtonTilt = $(".primary-button").tilt(tiltOptions);

  $('.primary-button').click(function (e){
    e.preventDefault();
  });

  let flipper = document.querySelector(".flip-control .flip");

  flipper.addEventListener("click", function () {
    let alreadyToggled = false;
    flipCards.forEach((fc) => {
      if (fc.classList.contains("flipped")) {
        alreadyToggled = true;
      }
    });
    if (!alreadyToggled) {
      flipCards.forEach((fc) => {
        fc.classList.add("flipped");
      });
    } else {
      flipCards.forEach((fc) => {
        fc.classList.remove("flipped");
      });
    }
  });

  let secondaryButtons = document.querySelectorAll("a.secondary-button");

  secondaryButtons.forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      let btnRect = btn.getBoundingClientRect();
      let x = e.clientX - btnRect.left;
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
