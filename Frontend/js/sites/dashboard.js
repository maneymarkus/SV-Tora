/*
    Dependencies: TheaterModule
 */

if (typeof TheaterModule === "undefined") {
    console.log("Missing TheaterModule Dependency!");
}

(function (window, document, undefined) {

    let user = "Marcus";
    let main = document.getElementsByClassName("dashboard")[0];
    let theaterOptions = TheaterModule.theaterOptions;
    let theater = TheaterModule.theater;
    let greeting = document.getElementsByClassName("greeting")[0];
    greeting.innerHTML = "";

    theater.addActor("greeting", {accuracy: 1}, ".greeting");

    let welcomeMessage1 = "Hallo <span class='blue'>" + user + "</span>!";

    theater
      .addScene(1000, "greeting:" + welcomeMessage1)
      .addScene(500)
      .addScene(" Willkommen zurück.")
      .addScene(1000)
      .addScene(- (welcomeMessage1.length + " Willkommen zurück".length))
      .addScene("Dashboard")
      .addScene(function () {
          main.classList.add("welcome-done");
      });

})(window, document);
