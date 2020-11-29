function init(window, document, undefined) {
  let theaterOptions = {locale: "de", minSpeed: {erase: 10, type: 40}, maxSpeed: {erase: 100, type: 200}};
  let theater = theaterJS(theaterOptions);
  let heading = document.getElementById("heading");
  let subtext = document.getElementById("subtext");
  let link = document.getElementsByClassName("enroll")[0];

  heading.innerHTML = "";
  subtext.innerHTML = "";
  link.classList.add("hidden");

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
      })
    .on("type:end", function () {
      let actor = theater.getCurrentActor();
      if (actor.$element.id === "subtext") {
        actor.$element.classList.add("typed");
        window.setTimeout(() => {
          document.getElementsByClassName("enroll")[0].classList.remove("hidden");
        }, 1500);
      }
    });

  theater.addActor("heading", {accuracy: 1}).addActor("subtext", {accuracy: 1});

  theater.addScene(1000, "heading:Willkommen auf der <span>Wettkampf</span>-Management Seite vom SV Tora.");

  theater.addScene(1500, "subtext:Hier können Sie Personen und Teams zum <span class=\"competition\">Tora-Pokal</span> am <span class=\"date\">03.03.2021</span> anmelden.");

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
