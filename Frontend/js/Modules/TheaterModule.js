/*
  Dependencies: theater.min.js
 */

if (typeof theaterJS === "undefined") {
    console.log("Missing Theater.js dependency!");
}

let TheaterModule = (function (window, document, undefined) {

  const theaterOptions = {locale: "de", minSpeed: {erase: 10, type: 40}, maxSpeed: {erase: 100, type: 150}};
  const theater = theaterJS(theaterOptions);

  theater
      .on("type:start, erase:start", function () {
        // add a class to actor's dom element when he starts typing/erasing
        let actor = theater.getCurrentActor();
        actor.$element.classList.add("is-typing");
      })
      .on("type:end, erase:end", function () {
        // and then remove it when he's done
        let actor = theater.getCurrentActor();
        actor.$element.classList.remove("is-typing");
      });

  return {
    theaterOptions,
    theater,
  }

})(window, document);
