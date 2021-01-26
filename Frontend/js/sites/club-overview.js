/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

  let dependencies = [];
  GeneralModule.checkDependenciesApi(dependencies);

  let options = {maxTilt: 15, scale: 1.15};
  const tiltedCards = $(".card").tilt(options);
  const tiltedNewCard = $(".last-card").tilt(options);

  $('.card').click(function (e){
    e.preventDefault();
  });

})(window, document);
