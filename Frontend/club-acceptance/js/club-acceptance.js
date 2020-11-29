function init(window, document, undefined) {
    let main = document.getElementsByTagName("main")[0];
    let theaterOptions = {locale: "de", minSpeed: {erase: 10, type: 40}, maxSpeed: {erase: 100, type: 200}};
    let theater = theaterJS(theaterOptions);
    let heading = document.getElementsByClassName("heading")[0];
    let subText = document.getElementsByClassName("subtext")[0];
    heading.innerHTML = "";
    let subTextInnerHTML = subText.innerHTML;
    subText.innerHTML = "";
    let decisionDiv = document.getElementsByClassName("decision")[0];
    decisionDiv.classList.add("hidden");

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

    theater.addActor("heading", {accuracy: 1}, ".heading").addActor("subtext", {accuracy: 1}, ".subtext");

    theater
      .addScene(1000, "heading:" + "Vereinsanmeldung")
      .addScene(500)
      .addScene("subtext:" + subTextInnerHTML)
      .addScene(1000)
      .addScene(function () {
          decisionDiv.classList.remove("hidden");
      })

    let tiltOptions = {maxTilt: 15, scale: 1.15};
    const primaryButtonTilt = $(".primary-button").tilt(tiltOptions);

    $('.primary-button').click(function (e){
        e.preventDefault();
    });

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
