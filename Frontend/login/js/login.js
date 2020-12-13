function init(window, document, undefined) {

  let main = document.querySelector("main");
  let theaterOptions = {locale: "de", minSpeed: {erase: 10, type: 30}, maxSpeed: {erase: 100, type: 150}};
  let theater = theaterJS(theaterOptions);
  let info = document.querySelector("p.info");
  let infoContent = info.innerHTML;
  let info1 = infoContent.substring(0, infoContent.indexOf("?") + 1);
  let info2 = infoContent.substring(infoContent.indexOf("?") + 1);
  info.innerHTML = "";

  theater
      .on("type:start, erase:start", function() {
        // add a class to actor's dom element when he starts typing/erasing
        let actor = theater.getCurrentActor();
        actor.$element.classList.add("is-typing");
      })
      .on("type:end, erase:end", function() {
        // and then remove it when he's done
        let actor = theater.getCurrentActor();
        actor.$element.classList.remove("is-typing");
      });

  theater.addActor("info", {accuracy: 1}, ".info");

  theater
      .addScene(500, "info:" + info1)
      .addScene(1000)
      .addScene(info2)
      .addScene(500)
      .addScene(function () {
        main.classList.add("welcome-done");
      });


  let FormModule = (function(window, document, undefined) {



    return {

    }

  })(window, document);



  let LoginModule = (function(window, document, undefined) {

    if (document.querySelector(".login-container")) {
      let loginContainer = document.querySelector(".login-container");
      let registrationContainer = document.querySelector(".registration-container");
      let small = undefined;
      let loginButton = loginContainer.querySelector(".login-button");
      let registerButton = registrationContainer.querySelector(".register-button");

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

    }

  })(window, document);

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
