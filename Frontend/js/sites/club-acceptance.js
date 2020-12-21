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

    let main = document.getElementsByTagName("main")[0];
    let theater = TheaterModule.theater;
    let heading = document.getElementsByClassName("heading")[0];
    let subText = document.getElementsByClassName("subtext")[0];
    heading.innerHTML = "";
    let subTextInnerHTML = subText.innerHTML;
    subText.innerHTML = "";
    let decisionDiv = document.getElementsByClassName("decision")[0];
    decisionDiv.classList.add("hidden");

    theater.addActor("heading", {accuracy: 1}, ".heading").addActor("subtext", {accuracy: 1}, ".subtext");

    theater
        .addScene(1000, "heading:" + "Vereinsanmeldung")
        .addScene(500)
        .addScene("subtext:" + subTextInnerHTML)
        .addScene(1000)
        .addScene(function () {
            decisionDiv.classList.remove("hidden");
        });

})(window, document);