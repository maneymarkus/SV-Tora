/*
    Dependencies: TheaterModule, MaterialInputsModule
 */

if (typeof TheaterModule === "undefined") {
  console.log("Missing TheaterModule Dependency!");
}

if (typeof MaterialInputsModule === "undefined") {
  console.log("Missing MaterialInputsModule Dependency!");
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
      // TODO: check if inputs filled
      if (small === loginContainer) {
        return;
      }
      submitForm(loginContainer.querySelector("form"));
    });

    registerButton.addEventListener("click", function (e) {
      e.preventDefault();
      // TODO: check if inputs filled
      if (small === registrationContainer) {
        return;
      }
      submitForm(registrationContainer.querySelector("form"));
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
      // TODO: Create E-Mail Input Element with InputModule API -> Call Confirm Modal -> Send E-Mail to user
    });

  }

})(window, document);
