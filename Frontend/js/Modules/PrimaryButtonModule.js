/*
  Dependencies: None
 */

let PrimaryButtonModule = (function (window, document, undefined) {

  let tiltOptions = {maxTilt: 15, scale: 1.15};
  const primaryButtonTilt = $(".primary-button").tilt(tiltOptions);

})(window, document);
