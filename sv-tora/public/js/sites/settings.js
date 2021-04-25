/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

  let dependencies = ["MaterialInputsModule"];
  App.GeneralModule.checkDependencies(dependencies);

  let fightTimeRangeInputContainer = document.querySelector(".range-input-container");
  let fightTimeRangeInput = fightTimeRangeInputContainer.querySelector("input");

  fightTimeRangeInput.addEventListener("input", function () {
    // TODO: update generic fight time in backend
  });

})(window, document);
