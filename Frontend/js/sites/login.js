/*
    Dependencies: TheaterModule, MaterialInputsModule, ModalModule, FormModule
 */

if (typeof TheaterModule === "undefined") {
  console.log("Missing TheaterModule Dependency!");
}

if (typeof MaterialInputsModule === "undefined") {
  console.log("Missing MaterialInputsModule Dependency!");
}

if (typeof ModalModule === "undefined") {
  console.log("Missing ModalModule Dependency!");
}

if (typeof FormModule === "undefined") {
  console.log("Missing FormModule Dependency!");
}

/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

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
      .addScene(1000)
      .addScene(info2)
      .addScene(500)
      .addScene(function () {
        main.classList.add("welcome-done");
      });

  if (document.querySelector(".login-container")) {
    let loginContainer = document.querySelector(".login-container");
    let registrationContainer = document.querySelector(".registration-container");
    let small = undefined;
    let loginButton = loginContainer.querySelector(".login-button");
    let registerButton = registrationContainer.querySelector(".register-button");
    let passwordForgottenButton = loginContainer.querySelector(".password-forgotten")

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

    loginButton.addEventListener("click", function (e) {
      e.preventDefault();
      if (small === loginContainer) {
        return;
      }
      let form = loginContainer.querySelector("form")
      if (FormModule.checkFormApi(form)) {
        submitForm(form);
      }
    });

    loginContainer.addEventListener("input", function () {
      let form = loginContainer.querySelector("form");
      if (FormModule.checkFormApi(form)) {
        loginContainer.querySelector(".secondary-button").classList.remove("disabled");
      } else {
        loginButton.classList.add("disabled");
      }
    });

    registerButton.addEventListener("click", function (e) {
      e.preventDefault();
      if (small === registrationContainer) {
        return;
      }
      let form = registrationContainer.querySelector("form");
      if (FormModule.checkFormApi(form)) {
        submitForm(form);
      }
    });

    registrationContainer.addEventListener("input", function () {
      let form = registrationContainer.querySelector("form");
      if (FormModule.checkFormApi(form)) {
        registerButton.classList.remove("disabled");
      } else {
        registerButton.classList.add("disabled");
      }
    });

    function submitForm(form) {
      loginContainer.classList.add("sent");
      registrationContainer.classList.add("sent");
      document.querySelector("body").classList.add("sent");
      window.setTimeout(function () {
        form.submit();
      }, 2500);
    }

    passwordForgottenButton.addEventListener("click", function () {
      let emailInput = MaterialInputsModule.createInputApi(GeneralModule.generalVariables.inputTypes.TEXT, ["email"], undefined, "email", "E-Mail-Adresse", undefined, undefined, undefined);
      ModalModule.confirmModalApi("E-Mail Adresse eingeben", emailInput, function () {
        let input = MaterialInputsModule.getInputObjectApi(emailInput);
        passwordForgotten(input.getValue());
      });
    });

    function passwordForgotten(eMail) {
      // TODO: Finish
      console.log(eMail);
    }

    let password1 = document.querySelector(".repeat-1");
    let password2 = document.querySelector(".repeat-2");

    FormModule.checkRepetitionApi(password1, password2);

  }

})(window, document);
