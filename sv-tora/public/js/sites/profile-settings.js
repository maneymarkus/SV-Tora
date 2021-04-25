/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

    let dependencies = [];
    App.GeneralModule.checkDependencies(dependencies);

    // TODO: Real behaviour

    // User toggles theme mode
    let darkmodeSwitch = document.querySelector("input#darkmode");
    darkmodeSwitch.addEventListener("change", function () {
        document.querySelector("body").classList.toggle("darkmode");
    });

    // User toggles table smartphone optimization
    let tableSwitch = document.querySelector("input#table-optimization");
    tableSwitch.addEventListener("change", function () {
        App.ModalModule.infoModal("Table Smartphone Optimization", "Toggle Table Smartphone Optimization!");
    });

    // User wants to change profile picture
    let profilePic = document.querySelector("a.pic-container");
    profilePic.addEventListener("click", function (e) {
        e.preventDefault();
        App.ModalModule.infoModal("Profile Picture", "Change Profile Picture!");
    });

})(window, document);
