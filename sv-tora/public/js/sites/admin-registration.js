/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function(window, document, undefined) {

    let dependencies = ["MaterialInputsModule", "FormModule", "TheaterModule"];
    App.GeneralModule.checkDependencies(dependencies);

    let main = document.querySelector("main");
    let theater = App.TheaterModule.theater;
    let h1 = document.querySelector("h1.greeting");
    let p = document.querySelector("p.introduction")
    let registrationContainer = document.querySelector(".registration-container");

    if (App.GeneralModule.getCookie("visitedAdminRegistration") !== "") {

        main.classList.add("welcome-done");

    } else {

        App.GeneralModule.setCookie("visitedAdminRegistration", true);

        let sentences = p.innerHTML.split(". ");

        let greeting = h1.innerHTML;

        h1.innerHTML = "";
        p.innerHTML = "";
        registrationContainer.classList.add("hidden");

        theater.addActor("h1", {accuracy: 1}, ".greeting").addActor("p", {accuracy: 1}, ".introduction");

        theater
            .addScene(1000, "h1:" + greeting)
            .addScene(1000)
            .addScene("p:")
        sentences.forEach((sentence) => {
            theater
                .addScene(sentence + ". ")
                .addScene(750);
        });
        theater
            .addScene(500)
            .addScene(function () {
                registrationContainer.classList.remove("hidden");
                window.setTimeout(function () {
                    main.classList.add("welcome-done");
                    p.classList.remove("is-typing");
                }, 100);
            });

    }

})(window, document);
