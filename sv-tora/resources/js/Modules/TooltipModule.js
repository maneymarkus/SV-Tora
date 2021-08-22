/**
 * DEPENDENCIES
 */

import tippy, {roundArrow} from "tippy.js";

/**
 * This Module contains code responsible for managing tooltips
 */

/**
 * This function creates a tooltip for a given element (element selector)
 * @param triggerElementQuerySelector {string} The element query selector to identify the parent of the tooltip
 * @param content {string} The content of the tooltip
 */
function createTooltip(triggerElementQuerySelector, content) {
    tippy(triggerElementQuerySelector, {
        content: content,
        offset: [0, 20],
        arrow: roundArrow,
        theme: "svtora",
    });
}

/**
 * API:
 */
export {
    createTooltip
}
