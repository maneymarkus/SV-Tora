function init(window, document, undefined) {

  tippy(".tt-trigger", {
    content: "My tooltip!",
    offset: [0, 20],
    arrow: tippy.roundArrow,
    theme: "svtora",
  });

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
