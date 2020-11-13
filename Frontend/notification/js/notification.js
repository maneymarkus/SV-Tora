function init(window, document, undefined) {
  let notification = document.getElementsByClassName("notification")[0];

  window.setTimeout(function () {
    notification.classList.add("hover");
  }, 1000);

  notification.addEventListener("mouseenter", function () {
    notification.style.animation = "none";
  });

  notification.getElementsByClassName("close")[0].addEventListener("click", function () {
    notification.classList.remove("hover");
  });

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
