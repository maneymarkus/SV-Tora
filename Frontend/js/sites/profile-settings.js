/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

  let dependencies = [];
  GeneralModule.checkDependenciesApi(dependencies);

  // TODO: Real behaviour

  // User toggles theme mode
  let darkmodeSwitch = document.querySelector("input#darkmode");
  darkmodeSwitch.addEventListener("change", function () {
    console.log("Toggle Dark Mode!");
    document.querySelector("body").classList.toggle("darkmode");
  });

  // User toggles table smartphone optimization
  let tableSwitch = document.querySelector("input#table-optimization");
  tableSwitch.addEventListener("change", function () {
    console.log("Toggle Table Smartphone Optimization!");
  });

  // User wants to change profile picture
  let profilePic = document.querySelector("a.pic-container");
  profilePic.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("Change Profile Picture!");
  });

})(window, document);
