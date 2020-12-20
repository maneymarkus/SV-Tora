/*
  Dependencies: GeneralModule
 */

if (typeof GeneralModule === "undefined") {
  console.log("Missing GeneralModule Dependency!");
}

let LoaderModule = (function (window, document, undefined) {

  let loaderElement = undefined;

  /**
   * This function creates a loader DOM element and returns it
   * @return DOM loader element
   */
  function createLoader() {
    let container = GeneralModule.generateElementApi("div", ["loader-container"]);

    let fighterDiv = GeneralModule.generateElementApi("div", ["fighter"]);
    let image = GeneralModule.generateElementApi("img");
    image.setAttribute("src", "../images/fighter-symbol-white.png");
    image.setAttribute("alt", "fighter");
    fighterDiv.appendChild(image);
    container.appendChild(fighterDiv);
    return container;
  }

  function addLoader(parent) {
    if (!loaderElement) {
      loaderElement = createLoader();
    }
    parent.appendChild(loaderElement);
  }

  function removeLoader(parent) {
    let loader = parent.querySelector("div.loader-container");
    loader.remove();
  }

  return {
    addLoaderApi : function (parent) {
      addLoader(parent);
    },
    removeLoaderApi : function (parent) {
      removeLoader(parent);
    }
  }

})(window, document);

let body = document.querySelector("body");
LoaderModule.addLoaderApi(body);
