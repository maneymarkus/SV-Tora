/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

    let dependencies = ["TheaterModule", "LoginRegistrationModule"];
    App.GeneralModule.checkDependencies(dependencies);

    let theater = App.TheaterModule.theater;

    let main = document.querySelector("main");
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

    let loginContainer = main.querySelector(".login-container");

    function submitForm(form) {
        document.querySelector("body").classList.add("sent");
        window.setTimeout(function () {
            form.submit();
        }, 2500);
    }

    App.LoginRegistrationModule.setLoginSubmitFormFunction(submitForm);

})(window, document);
