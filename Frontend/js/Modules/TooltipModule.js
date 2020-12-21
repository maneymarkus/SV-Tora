/*
  Dependencies: Popper.js, Tippy.js
 */

if (typeof tippy === "undefined") {
  console.log("Missing Tippy.js Dependency!");
}

let TooltipModule = (function(window, document, undefined) {

  function createTooltip(triggerElementQuerySelector, content) {
    tippy(triggerElementQuerySelector, {
      content: content,
      offset: [0, 20],
      arrow: tippy.roundArrow,
      theme: "svtora",
    });
  }

  return {
    createTooltipApi : function (triggerElementQuerySelector, content) {
      return createTooltip(triggerElementQuerySelector, content);
    }
  }

})(window, document);

TooltipModule.createTooltipApi(".tt-trigger", "My tooltip extra extra extra extra extra extra extra long!");
