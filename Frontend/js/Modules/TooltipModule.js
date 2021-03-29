if (typeof tippy === "undefined") {
  console.warn("Missing Tippy.js Dependency!");
}

/**
 * This Module contains code responsible for managing tooltips
 */
var TooltipModule = (function(window, document, undefined) {

  /**
   * DEPENDENCIES
   */
  let dependencies = [];
  GeneralModule.checkDependenciesApi(dependencies);

  /**
   * This function creates a tooltip for a given element (element selector)
   * @param triggerElementQuerySelector {string} The element query selector to identify the parent of the tooltip
   * @param content {string} The content of the tooltip
   */
  function createTooltip(triggerElementQuerySelector, content) {
    tippy(triggerElementQuerySelector, {
      content: content,
      offset: [0, 20],
      arrow: tippy.roundArrow,
      theme: "svtora",
    });
  }

  /**
   * API:
   */
  return {
    /**
     * This api function enables other modules to create tooltips
     * @param triggerElementQuerySelector {string} The element query selector to identify the parent of the tooltip
     * @param content {string} The content of the tooltip
     */
    createTooltipApi : function (triggerElementQuerySelector, content) {
      return createTooltip(triggerElementQuerySelector, content);
    }
  }

})(window, document);
