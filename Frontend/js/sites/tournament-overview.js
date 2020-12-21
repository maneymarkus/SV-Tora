/*
    Dependencies: None
 */

/*
    Encapsulate (not anywhere else needed) code in anonymous function
*/
(function (window, document, undefined) {

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

})(window, document);
