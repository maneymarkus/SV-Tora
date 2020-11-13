function init(window, document, undefined) {
    let user = "Marcus";
    let main = document.getElementsByClassName("dashboard")[0];
    let theaterOptions = {locale: "de", minSpeed: {erase: 10, type: 40}, maxSpeed: {erase: 100, type: 300}};
    let theater = theaterJS(theaterOptions);
    let greeting = document.getElementsByClassName("greeting")[0];
    greeting.innerHTML = "";

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

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
