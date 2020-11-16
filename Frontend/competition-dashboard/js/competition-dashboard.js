function init(window, document, undefined) {

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

  /* TODO: Activate
  let tiltOptions = {maxTilt: 15, scale: 1.15};
  const primaryButtonTilt = $(".primary-button").tilt(tiltOptions);

  $('.primary-button').click(function (e){
    e.preventDefault();
  });
   */
}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
