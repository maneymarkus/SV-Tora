/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

  let dependencies = ["TheaterModule"];
  GeneralModule.checkDependenciesApi(dependencies);

  let theater = TheaterModule.theater;
  let heading = document.getElementById("heading");
  let subtext = document.getElementById("subtext");
  let link = document.getElementsByClassName("enroll")[0];

  let headingText = heading.innerHTML;
  heading.innerHTML = "";
  let subtextContent = subtext.innerHTML;
  subtext.innerHTML = "";
  link.classList.add("hidden");

  heading.classList.add("is-typing");

  theater
    .on("type:start", function () {
      let actor = theater.getCurrentActor();
      if (actor.$element.id === "subtext") {
        let currentActor = actor.$element;
        if (!currentActor.classList.contains("is-typing")) {
          currentActor.classList.add("is-typing");
          heading.classList.remove("is-typing");
        }
      }
    });

  theater.addActor("heading", {accuracy: 1}).addActor("subtext", {accuracy: 1});

  theater
      .addScene(1000, "heading:" + headingText)
      .addScene(1500, "subtext:" + subtextContent)
      .addScene(function () {
        window.setTimeout(() => {
          document.getElementsByClassName("enroll")[0].classList.remove("hidden");
          subtext.classList.remove("is-typing");
        }, 1500);
      });


})(window, document);
