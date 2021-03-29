/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

  let dependencies = ["MaterialInputsModule", "ModalModule", "FormModule", "TheaterModule", "LoginRegistrationModule"];
  GeneralModule.checkDependenciesApi(dependencies);

  let theater = TheaterModule.theater;

  let main = document.querySelector("main");
  let info = document.querySelector("p.info");
  let infoContent = info.innerHTML;
  let info1 = infoContent.substring(0, infoContent.indexOf("?") + 1);
  let info2 = infoContent.substring(infoContent.indexOf("?") + 1);
  info.innerHTML = "";

  theater.addActor("info", {accuracy: 1}, ".info");

  theater
      .addScene(500, "info:" + info1)
      .addScene(500)
      .addScene(info2)
      .addScene(500)
      .addScene(function () {
        main.classList.add("welcome-done");
      });

  if (document.querySelector(".login-change-container")) {
    let loginChangeContainer = document.querySelector(".login-change-container");
    let loginContainer = loginChangeContainer.querySelector(".login-container");
    let registrationContainer = loginChangeContainer.querySelector(".registration-container");
    let small = undefined;

    if (registrationContainer.classList.contains("small")) {
      small = registrationContainer;
    } else {
      small = loginContainer;
    }

    small.addEventListener("click", handleClickSmall);
    let ready = false;

    window.setTimeout(function () {
      ready = true;
    }, 6000);

    function handleClickSmall(e) {
      e.preventDefault();
      if (!ready) {
        return
      }
      registrationContainer.classList.add("transition");
      loginContainer.classList.add("transition");
      small.classList.remove("small");
      small.removeEventListener("click", handleClickSmall);
      window.setTimeout(function () {
        loginContainer.classList.remove("transition");
        registrationContainer.classList.remove("transition");
      }, 500);
      if (small === registrationContainer) {
        window.setTimeout(function () {
          loginContainer.classList.add("small");
          small = loginContainer;
          small.addEventListener("click", handleClickSmall);
        }, 500);
      } else {
        window.setTimeout(function () {
          registrationContainer.classList.add("small");
          small = registrationContainer;
          small.addEventListener("click", handleClickSmall);
        }, 500);
      }
    }

    function submitForm(form) {
      loginChangeContainer.classList.add("sent");
      document.querySelector("body").classList.add("sent");
      window.setTimeout(function () {
        form.submit();
      }, 2500);
    }

    LoginRegistrationModule.setLoginSubmitFormFunctionApi(submitForm);
    LoginRegistrationModule.setRegistrationSubmitFormFunctionApi(submitForm);

  }

})(window, document);
