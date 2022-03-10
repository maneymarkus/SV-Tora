/**
 * DEPENDENCIES
 */

import tippy, {sticky, roundArrow} from "tippy.js";

/**
 * This Module contains code responsible for managing tooltips
 */

tippy.setDefaultProps({
    arrow: roundArrow,
    delay: 50,
    duration: 100,
    hideOnClick: true,
    maxWidth: 500,
    offset: [0, 20],
    sticky: "reference",
    theme: "svtora",
    plugins: [sticky]
});

/**
 * This function creates a tooltip for a given element (element selector)
 * @param triggerElementQuerySelector {string} The element query selector to identify the parent of the tooltip
 * @param content {string} The content of the tooltip
 */
function createTooltip(triggerElementQuerySelector, content) {
    tippy(triggerElementQuerySelector, {
        content: content,
    });
}

tippy("[data-tippy-content]");

/**
 * API:
 */
export {
    createTooltip
}
