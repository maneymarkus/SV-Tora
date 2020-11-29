function init(window, document, undefined) {

  let main = document.querySelector("main");
  let theaterOptions = {locale: "de", minSpeed: {erase: 10, type: 40}, maxSpeed: {erase: 100, type: 200}};
  let theater = theaterJS(theaterOptions);
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
  image.style.opacity = 0;
  let fadeWrapper = document.querySelector("div.fade-wrapper");
  fadeWrapper.classList.add("hidden");
  let bg = document.querySelector(".bg");

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
         image.style.opacity = 1;
         writingDone();
      });

  function writingDone() {
      fadeWrapper.classList.remove("hidden");
      bg.innerHTML = "!";
  }

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
