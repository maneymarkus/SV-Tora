/*
  Dependencies: GeneralModule, MaterialInputsModule, FormModule, TheaterModule
 */

if (typeof GeneralModule === "undefined") {
  console.log("Missing GeneralModule Dependency!");
}

if (typeof MaterialInputsModule === "undefined") {
  console.log("Missing MaterialInputsModule Dependency!");
}

if (typeof FormModule === "undefined") {
  console.log("Missing FormModule Dependency!");
}

if (typeof TheaterModule === "undefined") {
  console.log("Missing TheaterModule Dependency!");
}

/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function(window, document, undefined) {

  let main = document.querySelector("main");
  let theaterOptions = TheaterModule.theaterOptions;
  let theater = TheaterModule.theater;
  let introduction = document.querySelector("h1.introduction");
  let registrationContainer = document.querySelector(".registration-container");
  let registerButton = registrationContainer.querySelector(".register-button");

  let introductionPart1 = introduction.querySelector("span.part1").innerHTML;
  let introductionPart2 = introduction.querySelector("span.part2").innerHTML;
  let sentences = introductionPart2.split(". ");
  console.log(sentences);

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

  registerButton.addEventListener("click", function (e) {
    e.preventDefault();
    let form = registrationContainer.querySelector("form");
    if (FormModule.checkFormApi(form, true)) {
      form.submit();
    }
  });

  registrationContainer.addEventListener("input", function () {
    let form = registrationContainer.querySelector("form");
    if (FormModule.checkFormApi(form, false)) {
      registerButton.classList.remove("disabled");
    } else {
      registerButton.classList.add("disabled");
    }
  });

  let password1 = document.querySelector(".repeat-1");
  let password2 = document.querySelector(".repeat-2");

  FormModule.checkRepetitionApi(password1, password2);

})(window, document);
