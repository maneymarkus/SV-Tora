/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

    let dependencies = ["TheaterModule"];
    App.GeneralModule.checkDependencies(dependencies);

    let main = document.querySelector("main");

    if (App.GeneralModule.getCookie("visitedLogin") !== "") {

        main.classList.add("welcome-done");

    } else {

        App.GeneralModule.setCookie("visitedLogin", true);

        let theater = App.TheaterModule.theater;

        let intro = main.querySelector("h1.intro");
        let introContent = intro.innerHTML;
        intro.innerHTML = "";

        theater.addActor("intro", {accuracy: 1}, ".intro");

        theater
            .addScene(1000, "intro:" + introContent)
            .addScene(500)
            .addScene(function () {
                main.classList.add("welcome-done");
                intro.classList.remove("is-typing");
            });

    }

    function submitForm(form) {
        document.querySelector("body").classList.add("sent");
        window.setTimeout(function () {
            form.submit();
        }, 2500);
    }

    let loginContainer = main.querySelector(".login-container");
    let form = loginContainer.querySelector("form");
    let loginButton = loginContainer.querySelector(".secondary-button.login-button");
    let passwordForgottenButton = loginContainer.querySelector(".link.password-forgotten");

    App.SecondaryButtonModule.disableSecondaryButton(loginButton);

    loginButton.addEventListener("click", function (e) {
        e.preventDefault();
        if (App.FormModule.checkForm(form, true)) {
            submitForm(form, true);
        }
    });

    loginContainer.addEventListener("input", function () {
        if (App.FormModule.checkForm(form, false)) {
            App.SecondaryButtonModule.enableSecondaryButton(loginButton);
        } else {
            App.SecondaryButtonModule.disableSecondaryButton(loginButton);
        }
    });

    passwordForgottenButton.addEventListener("click", function (e) {
        e.preventDefault();
        let emailInput = App.MaterialInputsModule.createInput(App.GeneralModule.generalVariables.inputTypes.TEXT, ["required", "email"], undefined, "email", "E-Mail-Adresse", undefined, undefined, undefined);
        App.ModalModule.confirmModal("E-Mail Adresse eingeben", emailInput.inputContainer, function () {
            passwordForgotten(emailInput.getValue());
        }, undefined, function () {
            return App.FormModule.checkInput(emailInput.inputContainer, true);
        });
    });

    function passwordForgotten(email) {
        let data = {email: email};
        App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.POST, "/password/email", undefined, undefined, data);
    }

})(window, document);
