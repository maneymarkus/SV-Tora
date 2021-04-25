/**
 * DEPENDENCIES
 */

import {generateElement } from "./GeneralModule";

/**
 * This Module contains code responsible for managing tags (a tag is a html element)
 */

/**
 * This function creates a tag and returns it
 * @param classes {string[]} The classes that should be added to the tag element
 * @param key {string} The key of the tag element
 * @param value {string} The optional value of the tag element
 * @return {HTMLElement}
 */
function createTag(classes, key, value) {
    let tag = generateElement("span", ["tag"].concat(classes));
    let tagDetails = generateElement("span", ["tag-details"]);
    let tagKey = generateElement("span", ["tag-key"], key);
    tagDetails.appendChild(tagKey);
    if (value) {
        tagDetails.appendChild(document.createTextNode(":"));
        let tagValue = generateElement("span", ["tag-value"], value);
        tagDetails.appendChild(tagValue);
    }
    tag.appendChild(tagDetails);
    let deleteBtn = generateElement("a", ["delete"]);
    let deleteIcon = generateElement("i", ["material-icons"], "close");
    deleteBtn.appendChild(deleteIcon);
    tag.appendChild(deleteBtn);
    return tag;
}

/**
 * API:
 */
export {
    createTag
}
