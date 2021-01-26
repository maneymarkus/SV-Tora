/**
 * This Module contains code responsible for managing tags (a tag is a html element)
 */
var TagModule = (function(window, document, undefined) {

  /**
   * DEPENDENCIES
   */
  let dependencies = [];
  GeneralModule.checkDependenciesApi(dependencies);

  /**
   * This function creates a tag and returns it
   * @param classes {string[]} The classes that should be added to the tag element
   * @param key {string} The key of the tag element
   * @param value {string} The optional value of the tag element
   * @return {HTMLElement}
   */
  function createTag(classes, key, value) {
    let tag = GeneralModule.generateElementApi("span", ["tag"].concat(classes));
    let tagDetails = GeneralModule.generateElementApi("span", ["tag-details"]);
    let tagKey = GeneralModule.generateElementApi("span", ["tag-key"], key);
    tagDetails.appendChild(tagKey);
    if (value) {
      tagDetails.appendChild(document.createTextNode(":"));
      let tagValue = GeneralModule.generateElementApi("span", ["tag-value"], value);
      tagDetails.appendChild(tagValue);
    }
    tag.appendChild(tagDetails);
    let deleteBtn = GeneralModule.generateElementApi("a", ["delete"]);
    let deleteIcon = GeneralModule.generateElementApi("i", ["material-icons"], "close");
    deleteBtn.appendChild(deleteIcon);
    tag.appendChild(deleteBtn);
    return tag;
  }

  /**
   * API:
   */
  return {
    /**
     * This api function enables other modules to create tags
     * @param classes {string[]} The classes that should be added to the tag element
     * @param key {string} The key of the tag element
     * @param value {string} The optional value of the tag element
     * @return {HTMLElement}
     */
    createTagApi : function (classes, key, value) {
      return createTag(classes, key, value);
    }
  }

})(window, document);
