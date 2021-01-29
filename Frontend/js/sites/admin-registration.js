/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function(window, document, undefined) {

  let dependencies = ["MaterialInputsModule", "FormModule", "TheaterModule"];
  GeneralModule.checkDependenciesApi(dependencies);

  let main = document.querySelector("main");
  let theater = TheaterModule.theater;
  let introduction = document.querySelector("h1.introduction");
  let registrationContainer = document.querySelector(".registration-container");
  let registerButton = registrationContainer.querySelector(".register-button");

  let introductionPart1 = introduction.querySelector("span.part1").innerHTML;
  let introductionPart2 = introduction.querySelector("span.part2").innerHTML;
  let sentences = introductionPart2.split(". ");

  introduction.innerHTML = "";
  registrationContainer.style.display = "none";

  theater.addActor("introduction", {accuracy: 1}, ".introduction");

  introduction.classList.add("is-typing");
  theater
      .addScene(1000, "introduction:" + introductionPart1)
      .addScene(1000)
  sentences.forEach((sentence) => {
    theater
        .addScene("<span class='small'>" + sentence.replace(".", "") + ". </span>")
        .addScene(750);
  });
  theater
      .addScene(500)
      .addScene(function () {
        registrationContainer.style.removeProperty("display");
        theater.getCurrentActor().$element.classList.remove("is-typing");
        window.setTimeout(function () {
          main.classList.add("welcome-done");
        }, 100);
      });


  LoginRegistrationModule.setRegistrationSubmitFormFunctionApi(function () {
    let form = registrationContainer.querySelector("form");
    LoaderModule.addSmallLoaderApi(form);
  });

})(window, document);
