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

  let main = document.querySelector("main");
  let theaterOptions = TheaterModule.theaterOptions;
  let theater = TheaterModule.theater;
  let heading = document.querySelector(".heading");
  let headingContent = heading.innerHTML;
  heading.innerHTML = "";
  heading.classList.add("is-typing");
  let ps = document.querySelectorAll("main p.written");
  let psContent = [];
  ps.forEach((p) => {
      psContent.push(p.innerHTML);
      p.innerHTML = "";
  });
  let image = document.querySelector("div.pic-container");
  image.classList.add("hidden");
  let fadeWrapper = document.querySelector("div.fade-wrapper");
  fadeWrapper.classList.add("hidden");
  let bg = document.querySelector(".bg");

  theater.addActor("heading", {accuracy: 0.8}, ".heading");
  let counter = 0;
  ps.forEach((p) => {
      theater.addActor("p" + counter, {accuracy: 0.8}, ".p" + counter);
      counter++;
  });

  theater
      .addScene(3000)
      .addScene("heading:" + headingContent)
      .addScene(1000)
      .addScene("p0:" + psContent[0])
      .addScene(1000)
      .addScene("p1:" + "Das war", 1000, "...", 500, " ich.")
      .addScene(1000)
      .addScene(function () {
         writingDone();
      });

  function writingDone() {
      fadeWrapper.classList.remove("hidden");
      image.classList.remove("hidden");
      bg.innerHTML = "!";
  }

})(window, document);
