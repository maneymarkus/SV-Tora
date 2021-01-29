if (typeof $ === "undefined") {
  console.warn("Missing jQuery Dependency!");
}

/**
 * This Module contains code responsible for tilting elements
 */
var TiltModule = (function(window, document, undefined) {

  /**
   * DEPENDENCIES
   */
  let dependencies = [];
  GeneralModule.checkDependenciesApi(dependencies);

  let generalTiltOptions = {maxTilt: 15, scale: 1.15};

  let tiltElements = document.querySelectorAll(".tilt");
  tiltElements.forEach((tiltElement) => {
    $(tiltElement).tilt(generalTiltOptions);
  });

  /**
   * API:
   */
  return {

  }

})(window, document);
