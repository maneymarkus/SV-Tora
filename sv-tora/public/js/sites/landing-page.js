/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

  let dependencies = ["TheaterModule"];
  App.GeneralModule.checkDependencies(dependencies);

  let theater = App.TheaterModule.theater;
  let heading = document.getElementById("heading");
  let subtext = document.getElementById("subtext");
  let link = document.querySelector("a.enroll");

  let headingText = heading.innerHTML;
  heading.innerHTML = "";
  let subtextContent = subtext.innerHTML;
  subtext.innerHTML = "";
  link.classList.add("hidden");

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
