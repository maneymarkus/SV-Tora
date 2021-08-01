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
        main.classList.add("welcome-done", "greet");
    } else {

        App.GeneralModule.setCookie("visitedDashboard", true);

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

    }

    let inviteButton = main.querySelector(".primary-button.invite");

    inviteButton.addEventListener("click", function (e) {
        e.preventDefault();
        let emailInput = App.MaterialInputsModule.createInput(App.GeneralModule.generalVariables.inputTypes.TEXT, ["required", "email"], undefined, "email", "E-Mail-Adresse", undefined, undefined, undefined);
        let content = App.GeneralModule.generateElement("div");
        content.appendChild(emailInput.inputContainer);
        if (App.GeneralModule.isAdmin()) {
            let clubSelect = App.MaterialInputsModule.createInput(App.GeneralModule.generalVariables.inputTypes.SELECT, ["required", "club"], undefined, "club", "Zugeordnet zu Verein: ", undefined, undefined, ["Verein 1", "Verein 2", "Verein 3"]);
            content.appendChild(clubSelect.inputContainer);
        }
        let ModalWindow = App.ModalModule.confirmModal("Neuen User einladen", content, undefined, undefined, function () {
            if (!App.FormModule.checkForm(content, true)) {
                return false;
            } else {
                let data = {email: emailInput.getValue()}
                if (App.GeneralModule.isAdmin()) {
                    data["club"] = clubSelect.getValue();
                }

                App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.POST, "/registration/invitation", () => {ModalWindow.closeModal()}, data, true);
            }
        });
    });

})(window, document);
