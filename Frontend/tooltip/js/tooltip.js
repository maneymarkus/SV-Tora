function init(window, document, undefined) {

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

  TooltipModule.createTooltipApi(".tt-trigger", "My tooltip!")

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
