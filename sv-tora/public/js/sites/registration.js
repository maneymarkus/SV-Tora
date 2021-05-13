/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

    let dependencies = ["TheaterModule"];
    App.GeneralModule.checkDependencies(dependencies);

    let main = document.querySelector("main");

    if (App.GeneralModule.getCookie("visitedRegistration") !== "") {

        main.classList.add("welcome-done");

    } else {

        App.GeneralModule.setCookie("visitedRegistration", true);

        let theater = App.TheaterModule.theater;

        let info = main.querySelector("p.info");
        let infoContent = info.innerHTML;
        let sentences = infoContent.split(". ");
        info.innerHTML = "";

        theater.addActor("info", {accuracy: 1}, ".info");

        theater
            .addScene(1000, "info:");
        sentences.forEach((sentence) => {
            theater
                .addScene(sentence + ".  ")
                .addScene(750);
        });
        theater
            .addScene(500)
            .addScene(function () {
                main.classList.add("welcome-done");
                info.classList.remove("is-typing");
            });

    }

})(window, document);
