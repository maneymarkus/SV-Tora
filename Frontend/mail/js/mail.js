function init(window, document, undefined) {

  let envelope = document.getElementsByClassName("envelope")[0];
  let sendButton;
  if (sendButton = document.querySelector("a.send")) {
    sendButton.addEventListener("click", function (e) {
      e.preventDefault();
      document.getElementsByTagName("body")[0].classList.add("sent");
      window.setTimeout(function() {
        envelope.innerHTML = "mail";
      }, 1000);
    });
  }

  let tiltOptions = {maxTilt: 15, scale: 1.15};
  const primaryButtonTilt = $(".primary-button").tilt(tiltOptions);

  $('.primary-button').click(function (e){
    e.preventDefault();
  });

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
