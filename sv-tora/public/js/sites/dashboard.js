/*
    Encapsulate (not anywhere else needed) code in anonymous function
*/
(function (window, document, undefined) {

    let dependencies = ["TheaterModule"];
    App.GeneralModule.checkDependencies(dependencies);

    let user = document.querySelector("span.username").innerText;
    let main = document.getElementsByClassName("dashboard")[0];
    let theater = App.TheaterModule.theater;
    let greeting = document.getElementsByClassName("greeting")[0];

    if (App.GeneralModule.getCookie("visitedDashboard") !== "") {
        main.classList.add("welcome-done");
    } else {
        greeting.innerHTML = "";
        greeting.classList.add("greet");
        main.classList.add("greet");

        theater.addActor("greeting", {accuracy: 1}, ".greeting");

        let welcomeMessage1 = "Hallo <span class='highlighted-span'>" + user + "</span>!";

        greeting.classList.add("is-typing");

        theater
            .addScene(1000, "greeting:" + welcomeMessage1)
            .addScene(500)
            .addScene(" Willkommen zurück.")
            .addScene(1000)
            .addScene(-(welcomeMessage1.length + " Willkommen zurück".length))
            .addScene("Dashboard")
            .addScene(function () {
                greeting.classList.remove("is-typing");
                greeting.classList.remove("greet");
                main.classList.add("welcome-done");
                window.setTimeout(function () {
                    greeting.style.position = "absolute";
                }, 2000);
            });

        App.GeneralModule.setCookie("visitedDashboard", true);
    }

})(window, document);
