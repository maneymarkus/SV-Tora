/*
    Dependencies: None
 */

/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

  if (document.querySelector("main.tournament")) {
    let progressSlider = document.querySelectorAll("div.progress-container");
    progressSlider.forEach((ps) => {
      let currentProgress = ps.getAttribute("data-progress");
      ps.querySelector(".progress").style.width = currentProgress + "%";
      ps.querySelector(".handle").style.left = currentProgress + "%";
    });

    let progressSteps = document.querySelectorAll("div.step-container");
    progressSteps.forEach((pStep) => {
      let currentProgress = parseInt(pStep.getAttribute("data-step"));
      let steps = pStep.querySelectorAll("p.step");
      let counter = 0;
      steps.forEach((step) => {
        if (counter === currentProgress) {
          step.classList.add("current");
        } else if (counter < currentProgress) {
          step.classList.add("done");
        }
        counter++;
      });
    });
  }

  if (document.querySelector("main.no-tournament")) {
    const tournamentTilt = $('.host-tournament').tilt({maxTilt: 15, scale: 1.1});
  }

})(window, document);
