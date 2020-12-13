function init(window, document, undefined) {

  let ButtonModule = (function (window, document, undefined) {

    let tiltOptions = {maxTilt: 15, scale: 1.15};
    const primaryButtonTilt = $(".primary-button").tilt(tiltOptions);

    $('.primary-button').click(function (e){
      e.preventDefault();
      // TODO
    });

  })(window, document);

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
