/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

    let dependencies = ["TheaterModule"];
    App.GeneralModule.checkDependencies(dependencies);

    let main = document.querySelector("main");
    let theater = App.TheaterModule.theater;
    let heading = document.querySelector(".heading");
    let headingContent = heading.innerHTML;
    heading.innerHTML = "";
    let ps = document.querySelectorAll("main p.written");
    let psContent = [];
    ps.forEach((p) => {
        psContent.push(p.innerHTML);
        p.innerHTML = "";
    });
    let image = document.querySelector("div.creator-pic-container");
    image.classList.add("hidden");
    let fadeWrapper = document.querySelector("div.fade-wrapper");
    fadeWrapper.classList.add("hidden");
    let bg = document.querySelector("span.creator-bg");

    theater.addActor("heading", {accuracy: 0.7}, ".heading");
    let counter = 0;
    ps.forEach((p) => {
        theater.addActor("p" + counter, {accuracy: 0.7}, ".p" + counter);
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
        ps[ps.length - 1].classList.remove("is-typing");
        fadeWrapper.classList.remove("hidden");
        image.classList.remove("hidden");
        bg.innerHTML = "!";
    }

})(window, document);
