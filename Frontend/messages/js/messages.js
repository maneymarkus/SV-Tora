function init(window, document, undefined) {

  let messageContainer = document.getElementsByClassName("message-container")[0];
  messageContainer.scrollTop = messageContainer.scrollHeight;

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
