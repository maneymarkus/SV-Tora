/**
 * This Module contains code responsible for tilting elements
 */
var TiltModule = (function(window, document, undefined) {

  /**
   * DEPENDENCIES
   */
  let dependencies = ["$"];
  GeneralModule.checkDependenciesApi(dependencies);

  let generalTiltOptions = {maxTilt: 15, scale: 1.15};

  let tiltElements = document.querySelectorAll(".tilt");
  tiltElements.forEach((tiltElement) => {
    $(tiltElement).tilt(generalTiltOptions);
  });

  function registerTiltElement(element) {
    $(element).tilt(generalTiltOptions);
  }

  /**
   * API:
   */
  return {
    /**
     * This api functions enables other modules to register tilt elements so that these get the tilt effect
     * @param element
     */
    registerTiltElementApi: function (element) {
      registerTiltElement(element);
    }
  }

})(window, document);
