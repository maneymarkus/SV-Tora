/*
    Dependencies: TheaterModule
 */

if (typeof TheaterModule === "undefined") {
    console.log("Missing TheaterModule Dependency!");
}

/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

  let theater = TheaterModule.theater;
  let heading = document.getElementById("heading");
  let subtext = document.getElementById("subtext");
  let link = document.getElementsByClassName("enroll")[0];

  let headingText = heading.innerHTML;
  heading.innerHTML = "";
  let subtextContent = subtext.innerHTML;
  subtext.innerHTML = "";
  link.classList.add("hidden");

  theater
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

  theater.addScene(1000, "heading:" + headingText);

  theater.addScene(1500, "subtext:" + subtextContent);

})(window, document);
